package storage

import (
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"gorm.io/driver/postgres"
)

type PostgresStorage struct {
	db *gorm.DB
	port string
	host string
	user string
	password string
	dbname string
}

func (storage PostgresStorage) GetUsers() ([]models.User, error){
	
}


