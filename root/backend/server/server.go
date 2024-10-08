package server

import (
	"os"
	"os/signal"
	"sw-feedback/config"
	"sw-feedback/handlers"
	"sw-feedback/middlewares"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func StartServer() {
	handlers.ConnectToDB()
	defer handlers.DisconnectFromDB()
	adminjwt, postjwt := middlewares.JwtMiddleware, middlewares.PostMiddleware

	// Fiber instance
	app := fiber.New()
	corsConfig := cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "POST, GET, OPTIONS, PUT, DELETE",
		AllowHeaders:     "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Ngrok-Skip-Browser-Warning",
		AllowCredentials: true,
		ExposeHeaders:    "Set-Cookie", // Include "Set-Cookie" in Access-Control-Expose-Headers
	}

	app.Use(cors.New(corsConfig))
	// Routes
	app.Use(logger.New())
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Hello, World!",
		})
	})
	// Get Requests
	app.Get("/admin/panel", adminjwt, handlers.GetUsers)
	app.Get("/posts/get", postjwt, handlers.GetPosts)

	// Post Requests
	app.Post("/login", handlers.LoginHandler)
	app.Post("/posts/create", handlers.CreatePost)
	app.Post("/signup", handlers.SignupHandler)

	// Patch Requests
	app.Patch("/admin/panel/update/:_id", adminjwt, handlers.UpdateUser)

	// Server Port
	err := app.Listen(":" + config.PORT)
	if err != nil {
		os.Exit(1)
	}

	// Check for termination signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	// Db disconnection Request
	handlers.DisconnectFromDB()

}
