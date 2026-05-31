package main

import (
	"github.com/labstack/echo/v4"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/handlers"
)

func main() {
	e := echo.New()
	api := e.Group("/api")
	{
		api.GET("/users", handlers.GetUsers)       // Получить всех пользователей
		api.POST("/users", handlers.CreateUser)    // Создать пользователя
		api.GET("/users/:id", handlers.GetUserByID) // Получить пользователя по ID
	}
	e.Start(":8000")
}