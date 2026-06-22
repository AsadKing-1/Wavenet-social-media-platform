package models

import "gorm.io/gorm"

// Publication — модель публикации (пост в ленте).
//
// gorm.Model даёт автоматически: ID, CreatedAt, UpdatedAt, DeletedAt.
// Связи: один пользователь (User) → много публикаций (Publication).
type Publication struct {
	gorm.Model

	// AuthorID — внешний ключ, ссылается на User.ID.
	// gorm:"not null" — каждая публикация обязана иметь автора.
	// При удалении пользователя GORM не удаляет его публикации автоматически —
	// нужно делать вручную или настроить CASCADE в БД.
	AuthorID uint `json:"author_id" validate:"required" gorm:"not null"`

	// Text — текст публикации.
	// gorm:"size:500" → VARCHAR(500) в PostgreSQL.
	// Если текст превышает 500 символов — БД вернёт ошибку.
	Text string `json:"text" validate:"required" gorm:"size:500;not null"`

	// Photos — список фотографий, прикреплённых к публикации.
	// gorm автоматически подгружает их при Preload("Photos").
	// Хранятся как отдельные записи в таблице photos.
	Photos []Photo `json:"photos,omitempty"`

	// LikeCount — счётчик лайков.
	// gorm:"default:0" → начальное значение 0 при создании.
	// Обновляется атомарно через UpdateLikePublication.
	LikeCount int `json:"like_count" gorm:"default:0"`
}

// Photo — модель фотографии, прикреплённой к публикации.
//
// Фото хранится как base64-строка в поле PhotoData.
// Это простой подход для начала; в продакшне лучше
// хранить файлы в S3/MinIO и в БД держать только URL.
type Photo struct {
	gorm.Model

	// PublicationID — внешний ключ на Publication.ID.
	PublicationID uint `json:"publication_id" validate:"required" gorm:"not null"`

	// PhotoData — содержимое фото в base64 (или URL если используешь S3).
	// gorm:"type:text" → TEXT в PostgreSQL (без ограничения длины).
	PhotoData string `json:"photo_data" gorm:"type:text;not null"`

	// Order — порядок отображения фото в карусели.
	// 0 = первое фото, 1 = второе и т.д.
	Order int `json:"order" gorm:"default:0"`
}