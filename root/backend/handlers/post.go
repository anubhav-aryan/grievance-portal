package handlers

import (
	"context"
	"regexp"

	"sw-feedback/config"
	"sw-feedback/models"
	"sync/atomic"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func CreatePost(c *fiber.Ctx) error {
	var post models.Post
	err := c.BodyParser(&post)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if grad := post.Gradyr; grad < 2024 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid graduation year",
		})
	}

	// Email Check and Registration Number Check
	if post.Anymtype != 0 {
		emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$`)
		if !emailRegex.MatchString(post.Email) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid email domain",
			})
		}
		if reg := len(post.RegNo); reg != 9 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid registration number",
			})
		}
	}

	ticketNumber := generateTicketNumber()
	if post.Anymtype != 0 {
		newPost := bson.M{
			"anymtype":    post.Anymtype,
			"name":        post.Name,
			"regno":       post.RegNo,
			"email":       post.Email,
			"gradyr":      post.Gradyr,
			"issuetype":   post.IssueType,
			"subject":     post.Subject,
			"description": post.Description,
		}
		_, err = postcollection.InsertOne(c.Context(), newPost)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to create post",
			})
		}
	} else {
		newPost := bson.M{
			"anymtype":    post.Anymtype,
			"gradyr":      post.Gradyr,
			"issuetype":   post.IssueType,
			"subject":     post.Subject,
			"description": post.Description,
		}

		_, err = postcollection.InsertOne(c.Context(), newPost)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to create post",
			})
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":      "Post created successfully",
		"ticketNumber": ticketNumber,
	})

}

func GetPosts(c *fiber.Ctx) error {
	role, err := c.Locals("role").(string)
	if !err {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Invalid request",
		})
	}
	if role == "admin" {
		posts, err := getAllPosts()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to retrieve posts",
			})
		}
		return c.Status(fiber.StatusOK).JSON(posts)
	} else if role != "admin" {
		filter := bson.M{"issuetype": role}
		posts, err := getPostsByFilter(filter)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to retrieve posts",
			})
		}
		return c.Status(fiber.StatusOK).JSON(posts)
	}
	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
		"error": "Failed to retrieve posts",
	})

}

func getPostsByFilter(filter bson.M) ([]models.Post, error) {

	cursor, err := postcollection.Find(context.Background(), filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var posts []models.Post
	if err := cursor.All(context.Background(), &posts); err != nil {
		return nil, err
	}

	return posts, nil
}
func getAllPosts() ([]models.Post, error) {

	var posts []models.Post

	cursor, err := postcollection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {
		var order models.Post
		if err := cursor.Decode(&order); err != nil {
			return nil, err
		}
		posts = append(posts, order)
	}

	return posts, nil
}

func generateTicketNumber() int64 {
	return atomic.AddInt64(&config.COUNTER_POST, 1)
}
