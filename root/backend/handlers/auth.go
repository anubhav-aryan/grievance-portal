package handlers

import (
	"context"
	"log"
	"regexp" // Import the regex package
	"sw-feedback/config"
	"sw-feedback/models"
	"sync/atomic"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func generateID() int64 {
	return atomic.AddInt64(&config.COUNTER_USER, 1)
}
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
			"error": "Failed to encrypt password",
		})
	}
	newID := generateID()
	newUser := bson.M{
		"first_name": user.Firstname,
		"last_name":  user.Lastname,
		"email":      user.Email,
		"password":   string(hashedPassword),
		"role":       config.DEFAULT_ROLE,
		"id":         newID,
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

	storedPassword, userRole := getPasswordAndIDFromDatabase(loginCredentials.Email)

	err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(loginCredentials.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid credentials",
		})
	}

	token := generateToken(userRole)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Login successful!",
		"token":   token,
	})
}

func getPasswordAndIDFromDatabase(email string) (string, string) {
	var result bson.M
	filter := bson.M{"email": email}
	err := usercollection.FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}

	hashedPassword := result["password"].(string)
	userRole := result["role"].(string)

	return hashedPassword, userRole
}

func generateToken(userRole string) string {

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["role"] = userRole

	tokenString, err := token.SignedString([]byte(config.SECRET_KEY))
	if err != nil {
		log.Fatal(err)
	}

	return tokenString
}
