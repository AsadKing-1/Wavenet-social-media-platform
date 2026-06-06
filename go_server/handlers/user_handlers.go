package handlers

import (
	"net/http"
	"github.com/labstack/echo/v4"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
    "github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/storage"
)

func GetUsers(c echo.Context, db *storage.PostgresStorage) error {
    users, err := db.GetUsers()

    if err != nil {
        response := models.FormingResponse(
            int32(http.StatusInternalServerError), 
            []models.User{},                       
            "Ошибка получения пользователей",      
            err.Error(),                           
        )
        return c.JSON(http.StatusInternalServerError, response)
    }
    
    response := models.FormingResponse(
        int32(http.StatusOK),  
        users,                 
        "Успешно получено",    
        "",                    
    )
    return c.JSON(http.StatusOK, response)
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