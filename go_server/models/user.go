package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID string `json:"id"`
	Name string `json:"name" validate:"required"`
	Email string `json:"email" validate:"required, email"`
	Password string `json:"password"`
}

