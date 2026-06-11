package storage

import (
	"errors"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/security"
	"gorm.io/gorm"
)

func (s *PostgresStorage) GetUsers() ([]models.User, error) {
	var users []models.User
	result := s.db.Find(&users)
	return users, result.Error
}

func (s *PostgresStorage) CreateUser(user *models.User) error {
	tx := s.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	user.Password, _ = security.HashPassword(user.Password)

	if err := tx.Create(user).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit().Error; err != nil {
		return err
	}

	return nil
}

func (s *PostgresStorage) GetUserByID(id int) (models.User, error) {
	var user models.User
	err := s.db.Where("id = ?", id).First(&user).Error
	return user, err
}
func (s *PostgresStorage) DeleteUser(id int) error {
	return s.db.Delete(&models.User{}, id).Error
}

func (s *PostgresStorage) AuthenticateUser(name string, password string) (bool, error) {
	var user models.User
	err := s.db.Where("name = ?", name).First(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}
		return false, err
	}

	return security.CheckPassword(user.Password, password), nil
}

func (s *PostgresStorage) DeleteUserByID(id int) error {
	return s.db.Delete(&models.User{}, id).Error
}

func (s *PostgresStorage) UpdateUser(id int32, new_password string) error {
	password, _ := security.HashPassword(new_password)
	s.db.Model(&models.User{}).Where("id = ?", id).Update("password", password)
	return nil
}
