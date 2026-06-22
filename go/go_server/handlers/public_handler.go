package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/storage"
)

// ===========================================================
// Хэндлеры публикаций.
// ===========================================================

// GetPublications — GET /api/publics
// Возвращает все публикации из БД (общая лента).
//
// В будущем стоит добавить пагинацию через query params:
//   - ?page=1&limit=20
func GetPublications(c echo.Context, db *storage.PostgresStorage) error {
	publications, err := db.GetPublications()
	if err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.Publication{},
			"Ошибка получения публикаций",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	response := models.FormingResponse(
		int32(http.StatusOK),
		publications,
		"Успешно получено",
		"",
	)
	return c.JSON(http.StatusOK, response)
}

// CreatePublication — POST /api/public
// Создаёт новую публикацию.
//
// Ожидаемый JSON body:
//
//	{
//	  "author_id": 1,
//	  "text": "Текст публикации (до 500 символов)",
//	  "photos": []   // опционально: массив фото в base64
//	}
//
// Возвращает 201 Created при успехе.
func CreatePublication(c echo.Context, db *storage.PostgresStorage) error {
	var publ models.Publication

	// c.Bind() десериализует JSON тело запроса в структуру Publication
	if err := c.Bind(&publ); err != nil {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.Publication{},
			"Ошибка чтения данных запроса",
			err.Error(),
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	// Базовая валидация: текст и автор обязательны
	if publ.Text == "" {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.Publication{},
			"Текст публикации не может быть пустым",
			"missing field: text",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	// Если AuthorID не указан, берем его из авторизационного контекста (JWT)
	if publ.AuthorID == 0 {
		if userIDVal := c.Get("userID"); userIDVal != nil {
			if uID, ok := userIDVal.(uint); ok {
				publ.AuthorID = uID
			}
		}
	}

	if publ.AuthorID == 0 {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.Publication{},
			"Не указан автор публикации",
			"missing field: author_id",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	if err := db.CreatePublication(publ); err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.Publication{},
			"Ошибка создания публикации",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	response := models.FormingResponse(
		int32(http.StatusCreated),
		publ,
		"Публикация успешно создана",
		"",
	)
	return c.JSON(http.StatusCreated, response)
}
