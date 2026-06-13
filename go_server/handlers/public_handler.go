package handlers

import (
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/storage"

)

func GetPublications(c echo.Context, db *storage.PostgresStorage) error {
	publications, err := db.GetPublications()
	
		if err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.Publication{},
			"Ошибка получения пользователей",
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


func CreatePublication(c echo.Context, db *storage.PostgresStorage) error {
	var publ models.Publication
	if err := c.Bind(&publ); err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.Publication{},
			"Ошибка получения пользователей",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	err := db.Create
}