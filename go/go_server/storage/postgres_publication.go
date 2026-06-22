package storage

import (
	"fmt"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"gorm.io/gorm"
)

// ===========================================================
// Операции с публикациями в PostgreSQL через GORM.
// ===========================================================

// CreatePublication — создаёт новую публикацию.
//
// Используем транзакцию правильно: вставляем через tx (не через s.db!).
// Ошибка в оригинальном коде: tx открывался, но s.db.Create(...) использовал
// основное соединение, а не транзакцию → откат tx ничего не откатывал.
func (s *PostgresStorage) CreatePublication(publication models.Publication) error {
	tx := s.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	// ВАЖНО: вставляем через tx, а не через s.db
	// Иначе транзакция не имеет смысла — данные пишутся в обход неё
	if err := tx.Create(&publication).Error; err != nil {
		tx.Rollback()
		return fmt.Errorf("ошибка создания публикации: %w", err)
	}

	if err := tx.Commit().Error; err != nil {
		return fmt.Errorf("ошибка коммита транзакции: %w", err)
	}

	return nil
}

// GetPublications — возвращает все публикации (общая лента).
// GORM: SELECT * FROM publications WHERE deleted_at IS NULL
// Для больших проектов стоит добавить пагинацию (LIMIT/OFFSET).
func (s *PostgresStorage) GetPublications() ([]models.Publication, error) {
	var publications []models.Publication
	result := s.db.Find(&publications)
	return publications, result.Error
}

// GetAllPublicationsByUserID — возвращает публикации конкретного пользователя.
// GORM: SELECT * FROM publications WHERE author_id = ? AND deleted_at IS NULL
func (s *PostgresStorage) GetAllPublicationsByUserID(userID int) ([]models.Publication, error) {
	var publications []models.Publication
	result := s.db.Where("author_id = ?", userID).Find(&publications)
	return publications, result.Error
}

// DeletePublication — мягко удаляет публикацию по ID.
// GORM устанавливает deleted_at = NOW().
func (s *PostgresStorage) DeletePublication(publicationID int) error {
	return s.db.Delete(&models.Publication{}, publicationID).Error
}

// UpdateLikePublication — изменяет счётчик лайков у публикации.
// delta = +1 → добавляем лайк
// delta = -1 → убираем лайк
//
// Используем gorm.Expr для атомарного UPDATE (безопасно для конкурентных запросов):
// UPDATE publications SET like_count = like_count + ? WHERE id = ?
//
// Исправлена ошибка оригинала: было WHERE publicationID = ? (имя колонки неверное)
// Правильно: WHERE id = ? (GORM использует поле id из gorm.Model)
func (s *PostgresStorage) UpdateLikePublication(publicationID int, delta int) error {
	result := s.db.Model(&models.Publication{}).
		Where("id = ?", publicationID).
		Update("like_count", gorm.Expr("like_count + ?", delta))

	if result.Error != nil {
		return fmt.Errorf("ошибка обновления лайков: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("публикация с id=%d не найдена", publicationID)
	}

	return nil
}
