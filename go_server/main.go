package main

import (
	"fmt"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/configs"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/handlers"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/storage"
	"github.com/labstack/echo/v4"
)

func main() {
	config := configs.ReadConfig()
	db, _ := storage.NewPostgresStorage(&config.Database)
	db.GetUsers()
	HTTPServerConnfig := config.HTTPServer
	fmt.Printf("Loaded config: %+v\n", config)
	e := echo.New()
	api := e.Group("/api")
	{
		api.GET("/users", handlers.GetUsers)        // Получить всех пользователей
		api.POST("/users", handlers.CreateUser)     // Создать пользователя
		api.GET("/users/:id", handlers.GetUserByID) // Получить пользователя по ID
	}
	e.Start(fmt.Sprintf("%s:%d", HTTPServerConnfig.Host, HTTPServerConnfig.Port))
}
