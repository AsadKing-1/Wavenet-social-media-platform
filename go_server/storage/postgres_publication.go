package storage

import (
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
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


