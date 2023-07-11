package server

import (
	"log"
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

	// Db connection Request
	handlers.ConnectToDB()
	defer handlers.DisconnectFromDB()

	adminjwt := middlewares.JwtMiddleware
	postjwt := middlewares.PostMiddleware

	// Fiber instance
	app := fiber.New()
	app.Use(cors.New())
	// Routes
	app.Use(logger.New())
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Hello, World!",
		})
	})
	// Get Requests
	app.Get("/login", handlers.LoginHandler)
	app.Get("/admin/panel", adminjwt, handlers.GetUsers)	
	app.Get("/posts/get", postjwt, handlers.GetPosts)

	// Post Requests
	app.Post("/posts/create", handlers.CreatePost)
	app.Post("/signup", handlers.SignupHandler)

	// Patch Requests
	app.Patch("/admin/panel/update/:id", adminjwt, handlers.UpdateUser)

	// Server Port
	err := app.Listen(":" + config.PORT)
	if err != nil {
		log.Fatal(err)
	}

	// Check for termination signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	// Db disconnection Request
	handlers.DisconnectFromDB()

}
