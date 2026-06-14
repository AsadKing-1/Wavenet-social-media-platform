package storage

import (
	"fmt"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/configs"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type PostgresStorage struct {
	db *gorm.DB
}

func (s *PostgresStorage) RollBack(tx *gorm.DB) {
	if r := recover(); r != nil {
		tx.Rollback()
	} else {
		tx.Commit()
	}
}

func NewPostgresStorage(config *configs.DatabaseConfig) (*PostgresStorage, error) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable", config.Host, config.Username, config.Password, config.DBname, config.Port)
	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	err = DB.AutoMigrate(&models.User{}, &models.Publication{}, &models.Photo{})
	return &PostgresStorage{db: DB}, nil
}
