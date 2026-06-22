package storage

import "github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"

// ===========================================================
// UserStorage — интерфейс для работы с пользователями в БД.
// Позволяет заменить PostgresStorage на любую другую реализацию
// (например, in-memory для тестов) без изменения кода хэндлеров.
// ===========================================================
type UserStorage interface {
	// GetUsers возвращает список всех пользователей
	GetUsers() ([]models.User, error)

	// CreateUser создаёт нового пользователя (принимает указатель,
	// чтобы вернуть ID после вставки в БД через GORM)
	CreateUser(user *models.User) error

	// GetUserByID возвращает пользователя по его числовому ID
	GetUserByID(id int) (models.User, error)

	// UpdateUser обновляет пароль пользователя по ID.
	// Принимает id int32 (совместимо с GORM Model) и новый пароль строкой.
	UpdateUser(id int32, newPassword string) error

	// DeleteUser удаляет пользователя по ID (мягкое удаление через GORM)
	DeleteUser(id int) error

	// AuthenticateUser проверяет пару имя/пароль и возвращает true если совпадает.
	// Используется при входе в аккаунт.
	AuthenticateUser(name string, password string) (bool, error)
}

// ===========================================================
// PublicationStorage — интерфейс для работы с публикациями.
// ===========================================================
type PublicationStorage interface {
	// CreatePublication создаёт новую публикацию
	CreatePublication(publication models.Publication) error

	// GetPublications возвращает все публикации (лента)
	GetPublications() ([]models.Publication, error)

	// GetAllPublicationsByUserID возвращает все публикации конкретного пользователя
	GetAllPublicationsByUserID(userID int) ([]models.Publication, error)

	// UpdateLikePublication изменяет счётчик лайков:
	// delta = +1 (лайк) или -1 (дизлайк/снятие лайка)
	UpdateLikePublication(publicationID int, delta int) error

	// DeletePublication удаляет публикацию по ID
	DeletePublication(publicationID int) error
}
