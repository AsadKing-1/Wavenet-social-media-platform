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
		api.GET("/health", func(c echo.Context) error { return handlers.Health(c, e) })

		api.GET("/users", func(c echo.Context) error { return handlers.GetUsers(c, db) })   // Получить всех пользователей
		api.POST("/user", func(c echo.Context) error { return handlers.CreateUser(c, db) }) // Создать нового пользователя
		api.DELETE("/user", func(c echo.Context) error { return handlers.DeleteUser(c, db) })
		api.PUT("/user", func(c echo.Context) error { return handlers.UpdateUser(c, db)})

		api.GET("/publics", func (c echo.Context) error { return handlers.Getpublications(c, db)})
		api.POST("public", func (c echo.Context) error { return handlers.CreatePublication(c, db)})
	}
	e.Start(fmt.Sprintf("%s:%d", HTTPServerConnfig.Host, HTTPServerConnfig.Port))
}
