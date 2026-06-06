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
		api.GET("/users", func(c echo.Context) error { return handlers.GetUsers(c, db) }) // Получить всех пользователей
	}
	e.Start(fmt.Sprintf("%s:%d", HTTPServerConnfig.Host, HTTPServerConnfig.Port))
}
