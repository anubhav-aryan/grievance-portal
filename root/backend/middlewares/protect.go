package middlewares

import (
	"strings"
	"sw-feedback/config"
	"sw-feedback/handlers"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func JwtMiddleware(c *fiber.Ctx) error {
	tokenHeader := c.Get("Authorization")
	if tokenHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}
	splitToken := strings.Split(tokenHeader, " ")
	if len(splitToken) != 2 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid token format"})
	}
	tokenString := splitToken[1]

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		secretKey := []byte(config.SECRET_KEY)
		return secretKey, nil
	})

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
	}

	if !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token claims"})
	}

	role, ok := claims["role"].(string)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid role"})
	}

	if role != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
	}

	// Set the JWT token as an HTTP-only cookie with the expiration time
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		HTTPOnly: true,
		Expires:  handlers.EXPIRATION,
		Path:     "/",
	}
	c.Cookie(&cookie)

	return c.Next()
}

func PostMiddleware(c *fiber.Ctx) error {
	tokenHeader := c.Get("Authorization")
	if tokenHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}
	splitToken := strings.Split(tokenHeader, " ")
	if len(splitToken) != 2 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid token format"})
	}
	tokenString := splitToken[1]

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		secretKey := []byte(config.SECRET_KEY)
		return secretKey, nil
	})

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
	}

	if !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token claims"})
	}

	role, ok := claims["role"].(string)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid role"})
	}
	if role == "user" || role == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
	}
	role = strings.TrimSpace(role)

	// Set the expiration time for the cookie

	// Set the JWT token as an HTTP-only cookie with the expiration time
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		HTTPOnly: true,
		Expires:  handlers.EXPIRATION,
		Path:     "/",
	}
	c.Cookie(&cookie)

	c.Context().SetUserValue("role", role)

	return c.Next()
}
