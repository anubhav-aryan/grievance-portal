package handlers

import (
	"context"
	"regexp"

	"sw-feedback/models"

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

	if grad := post.Gradyr; grad < 2023 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid graduation year",
		})
	}

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
		newPost := bson.M{
			"anymtype":    post.Anymtype,
			"name":        post.Name,
			"regno":       post.RegNo,
			"email":       post.Email,
			"gradyr":      post.Gradyr,
			"issuetype":   post.IssueType,
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
		"message": "Post created successfully",
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
		cursor, err := postcollection.Find(context.Background(), bson.M{})
		if err != nil {
			return nil
		}
		defer cursor.Close(context.Background())

		var posts []models.Post
		for cursor.Next(context.Background()) {
			var post models.Post
			if err := cursor.Decode(&post); err != nil {
				return nil
			}
			posts = append(posts, post)
		}

		if err := cursor.Err(); err != nil {
			return nil
		}
		return c.Status(fiber.StatusOK).JSON(posts)
	} else if role != "admin" {
		cursor, err := postcollection.Find(context.Background(), bson.M{"issuetype": role})
		if err != nil {
			return nil
		}
		defer cursor.Close(context.Background())

		var posts []models.Post
		for cursor.Next(context.Background()) {
			var post models.Post
			if err := cursor.Decode(&post); err != nil {
				return nil
			}
			posts = append(posts, post)
		}

		if err := cursor.Err(); err != nil {
			return nil
		}

		return c.Status(fiber.StatusOK).JSON(posts)
	}
	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
		"error": "Failed to retrieve posts",
	})

}
