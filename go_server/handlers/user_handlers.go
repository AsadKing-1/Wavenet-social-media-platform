package handlers

import (
	"net/http"
	"github.com/labstack/echo/v4"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
)

// GetUsers - возвращает список всех пользователей (GET запрос)
func GetUsers(c echo.Context) error {
    // Для GET запроса не нужно парсить тело запроса
    // Здесь будет логика получения пользователей из БД
    
    // Временные тестовые данные
    users := []models.User{
        {Name: "Alice", Email: "alice@example.com", Password: "***"},
        {Name: "Bob", Email: "bob@example.com", Password: "***"},
    }
    
    return c.JSON(http.StatusOK, users)
}

// CreateUser - создает нового пользователя (POST запрос)
func CreateUser(c echo.Context) error {
    var user models.User

    // Преобразуем JSON в структуру User
    if err := c.Bind(&user); err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
    }

    // Здесь будет логика сохранения в БД
    
    // Возвращаем созданного пользователя
    return c.JSON(http.StatusCreated, map[string]interface{}{
        "message": "Пользователь создан",
        "user":    user,
    })
}

// GetUserByID - возвращает пользователя по ID (GET запрос)
func GetUserByID(c echo.Context) error {
    id := c.Param("id")
    
    // Здесь будет логика получения пользователя из БД по id
    
    user := models.User{
        Name:  "User " + id,
        Email: "user" + id + "@example.com",
        Password: "***",
    }
    
    return c.JSON(http.StatusOK, user)
}