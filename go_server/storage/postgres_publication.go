package storage

import (
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"gorm.io/gorm"
)

func (s *PostgresStorage) CreatePublication(publication models.Publication) error {
	tx := s.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	if err := s.db.Create(publication).Error; err != nil {
		tx.Rollback()
		return err
	}
	if err := tx.Commit().Error; err != nil {
		return err
	}

	return nil
}

func (s *PostgresStorage) GetPublications() ([]models.Publication, error) {
	var publications []models.Publication
	result := s.db.Find(&publications)
	return publications, result.Error
}

func (s *PostgresStorage) GetAllPublicationsByUserID(userID int) ([]models.Publication, error) {
	var publications []models.Publication
	result := s.db.Where("user_id = ?", userID).Find(&publications)
	return publications, result.Error
}

func (s *PostgresStorage) DeletePublication(publicationID int) error {
	return s.db.Delete(&models.Publication{}, publicationID).Error
}

func (s *PostgresStorage) UpdateLikePublication(publicationID int, delta int) error {
	return s.db.Model(&models.Publication{}).Where("publicationID = ?", publicationID).Update("like_count", gorm.Expr("like_count + ?", delta)).Error
}
