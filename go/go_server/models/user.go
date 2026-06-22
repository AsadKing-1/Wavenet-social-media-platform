package models

import "gorm.io/gorm"

// User — модель пользователя в БД.
//
// gorm.Model встраивает поля: ID (uint), CreatedAt, UpdatedAt, DeletedAt.
// DeletedAt используется для мягкого удаления (soft delete):
// запись не удаляется физически, а помечается временем удаления.
//
// Теги структуры:
//   - json:"..."   — имя поля в JSON при сериализации/десериализации
//   - validate:"..." — правила валидации (можно использовать с go-playground/validator)
//   - gorm:"..."   — настройки столбца в БД
type User struct {
	gorm.Model

	// Name — уникальное имя пользователя (логин).
	// gorm:"uniqueIndex" → в БД создаётся уникальный индекс,
	// попытка создать второго пользователя с тем же именем вернёт ошибку.
	Name string `json:"name" validate:"required" gorm:"uniqueIndex;not null"`

	// Email — уникальный email пользователя.
	// validate:"email" — проверяет формат email (если используется validator).
	Email string `json:"email" validate:"required,email" gorm:"uniqueIndex;not null"`

	// Password — хэш пароля (bcrypt, cost=14).
	// НИКОГДА не хранится в открытом виде.
	// При получении User через API пароль также приходит в ответе —
	// в будущем стоит добавить json:"-" чтобы скрыть поле из ответов.
	Password string `json:"password,omitempty" validate:"required" gorm:"not null"`

	// Publications — список публикаций пользователя.
	// gorm:"foreignKey:AuthorID" — связь один-ко-многим:
	// Publication.AuthorID ссылается на User.ID.
	// Загружается через Preload("Publications"), не автоматически.
	Publications []Publication `json:"publications,omitempty" gorm:"foreignKey:AuthorID"`
}
