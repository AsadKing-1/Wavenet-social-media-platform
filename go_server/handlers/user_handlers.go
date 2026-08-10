package handlers

import (
	"net/http"
	"strconv"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/storage"
	"github.com/labstack/echo/v4"
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

func CreateUser(c echo.Context, db *storage.PostgresStorage) error {
	var user models.User

	if err := c.Bind(&user); err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.User{},
			"Ошибка получения пользователей",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	err := db.CreateUser(&user)
	if err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.User{},
			"Ошибка создания пользователя",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	response := models.FormingResponse(
		int32(http.StatusOK),
		&models.User{Name: user.Name, Email: user.Email},
		"Пользователь успешно создан",
		"",
	)
	return c.JSON(http.StatusOK, response)
}

func DeleteUser(c echo.Context, db *storage.PostgresStorage) error {
	id := c.QueryParam("id")
	if id == "" {
		response := models.FormingResponse(int32(http.StatusBadRequest), []models.User{}, "Неверный запрос", "")
		return c.JSON(http.StatusBadRequest, response)
	}
	idInt, _ := strconv.Atoi(id)

	err := db.DeleteUser(idInt)

	if err != nil {
		response := models.FormingResponse(int32(http.StatusInternalServerError), []models.User{}, "Ошибка удаления пользователя", err.Error())
		return c.JSON(http.StatusInternalServerError, response)
	}
	response := models.FormingResponse(int32(http.StatusOK), []models.User{}, "Пользователь успешно удален", "")
	return c.JSON(http.StatusOK, response)
}

func UpdateUser(c echo.Context, db *storage.PostgresStorage) error {
	id := c.QueryParam("id")
	password := c.QueryParam("password")

	if id == "" {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.User{},
			"Неверный запрос",
			"ID is required",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	if password == "" {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.User{},
			"Неверный запрос",
			"Password is required",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	idInt, err := strconv.Atoi(id)
	if err != nil {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.User{},
			"Неверный формат ID",
			err.Error(),
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	err = db.UpdateUser(int32(idInt), password)
	if err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.User{},
			"Ошибка обновления пароля",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	response := models.FormingResponse(
		int32(http.StatusOK),
		[]models.User{},
		"Пароль успешно обновлен",
		"",
	)
	return c.JSON(http.StatusOK, response)
}

func Health(c echo.Context, e *echo.Echo) error {
	var routelist []map[string]string
	for _, route := range e.Routes() {
		routelist = append(routelist, map[string]string{
			"method": route.Method,
			"path":   route.Path,
		})
	}
	response := models.FormingResponse(
		int32(http.StatusOK),
		routelist,
		"Успешно",
		"",
	)
	return c.JSON(http.StatusOK, response)
}
