package handlers

import (
	"context"
	"log"
	"regexp" // Import the regex package
	"sw-feedback/config"
	"sw-feedback/models"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var EXPIRATION time.Time

func SignupHandler(c *fiber.Ctx) error {
	var user models.SignupUser
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$`)
	if !emailRegex.MatchString(user.Email) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid email domain",
		})
	}

	existingUser := bson.M{"email": user.Email}
	count, err := usercollection.CountDocuments(context.Background(), existingUser)
	if err != nil {
		log.Fatal(err)
	}

	if count > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User with this email already exists",
		})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "internal server error",
		})
	}
	newUser := bson.M{
		"first_name": user.Firstname,
		"last_name":  user.Lastname,
		"email":      user.Email,
		"password":   string(hashedPassword),
		"role":       config.DEFAULT_ROLE,
	}

	_, err = usercollection.InsertOne(context.Background(), newUser)
	if err != nil {
		log.Fatal(err)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Signed Up successfully!",
	})
}

func LoginHandler(c *fiber.Ctx) error {
	// Retrieve the user's login credentials
	var loginCredentials models.LoginUser
	if err := c.BodyParser(&loginCredentials); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	var result bson.M
	filter := bson.M{"email": loginCredentials.Email}
	err := usercollection.FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "User with this email does not exist",
			})
		}
		log.Fatal(err)
	}
	storedPassword := result["password"].(string)
	userRole := result["role"].(string)

	err = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(loginCredentials.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid credentials",
		})
	}

	token, err := generateToken(userRole)
	if err != nil {
		// Handle error
		log.Fatal(err)
	}
	cookie := new(fiber.Cookie)
	cookie.Name = "accessToken"
	cookie.Value = token
	cookie.Expires = EXPIRATION
	cookie.Secure = false
	cookie.HTTPOnly = true
	cookie.Path = "/"

	c.Cookie(cookie)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Login successful!",
		"token":   token,
	})

}

func generateToken(userRole string) (string, error) {
	// Set the expiration time
	expiration := time.Now().Add(15 * time.Minute)

	// Create a new token with the desired signing method
	token := jwt.New(jwt.SigningMethodHS256)

	// Set the claims for the token
	claims := token.Claims.(jwt.MapClaims)
	claims["role"] = userRole
	claims["exp"] = expiration.Unix() // Set the expiration claim

	// Sign the token with the secret key
	tokenString, err := token.SignedString([]byte(config.SECRET_KEY))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
