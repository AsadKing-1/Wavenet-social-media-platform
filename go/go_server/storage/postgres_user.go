package storage

import (
	"errors"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/security"
	"gorm.io/gorm"
)

// ===========================================================
// Операции с пользователями в PostgreSQL через GORM.
// ===========================================================

// GetUsers — возвращает всех пользователей из таблицы.
// GORM: s.db.Find(&users) → SELECT * FROM users WHERE deleted_at IS NULL
// (мягкое удаление: GORM не показывает записи с deleted_at != NULL)
func (s *PostgresStorage) GetUsers() ([]models.User, error) {
	var users []models.User
	result := s.db.Find(&users)
	return users, result.Error
}

// CreateUser — создаёт нового пользователя в БД.
// Принимает указатель *models.User чтобы GORM мог записать
// обратно сгенерированный ID после вставки.
//
// Перед сохранением хэшируем пароль через bcrypt —
// в БД никогда не хранится пароль в открытом виде!
//
// Используем транзакцию: если что-то пойдёт не так —
// данные не сохранятся частично.
func (s *PostgresStorage) CreateUser(user *models.User) error {
	tx := s.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	// Хэшируем пароль перед сохранением
	hashedPassword, err := security.HashPassword(user.Password)
	if err != nil {
		tx.Rollback()
		return err
	}
	user.Password = hashedPassword

	// Создаём запись; GORM заполнит user.ID после вставки
	if err := tx.Create(user).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

// GetUserByID — ищет пользователя по числовому ID.
// GORM: SELECT * FROM users WHERE id = ? AND deleted_at IS NULL LIMIT 1
// Возвращает gorm.ErrRecordNotFound если пользователь не найден.
func (s *PostgresStorage) GetUserByID(id int) (models.User, error) {
	var user models.User
	err := s.db.Where("id = ?", id).First(&user).Error
	return user, err
}

// GetUserByEmail — ищет пользователя по email.
// GORM: SELECT * FROM users WHERE email = ? AND deleted_at IS NULL LIMIT 1
// Возвращает gorm.ErrRecordNotFound если пользователь не найден.
func (s *PostgresStorage) GetUserByEmail(email string) (models.User, error) {
	var user models.User
	err := s.db.Where("email = ?", email).First(&user).Error
	return user, err
}

// DeleteUser — мягко удаляет пользователя по ID.
// GORM устанавливает deleted_at = NOW(), запись остаётся в БД
// но не возвращается в обычных запросах.
func (s *PostgresStorage) DeleteUser(id int) error {
	return s.db.Delete(&models.User{}, id).Error
}

// AuthenticateUser — проверяет логин и пароль пользователя.
// Используется при входе в аккаунт (логин).
//
// 1. Ищем пользователя по email
// 2. Если не найден → возвращаем false (не ошибку!)
// 3. Сравниваем введённый пароль с bcrypt-хэшем из БД
func (s *PostgresStorage) AuthenticateUser(email string, password string) (bool, error) {
	var user models.User
	err := s.db.Where("email = ?", email).First(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Пользователь не найден — это не ошибка сервера, просто "нет такого"
			return false, nil
		}
		return false, err
	}

	// Сравниваем пароль с хэшем (bcrypt.CompareHashAndPassword внутри)
	return security.CheckPassword(user.Password, password), nil
}

// UpdateUser — обновляет пароль пользователя по ID.
// Новый пароль хэшируется перед сохранением.
//
// GORM: UPDATE users SET password = ? WHERE id = ?
func (s *PostgresStorage) UpdateUser(id int32, newPassword string) error {
	hashedPassword, err := security.HashPassword(newPassword)
	if err != nil {
		return err
	}

	result := s.db.Model(&models.User{}).Where("id = ?", id).Update("password", hashedPassword)
	if result.Error != nil {
		return result.Error
	}

	// Проверяем что запись действительно была найдена и обновлена
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}

	return nil
}
