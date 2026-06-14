package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Name         string        `json:"name" validate:"required" gorm:"uniqueIndex;not null"`
	Email        string        `json:"email" validate:"required,email" gorm:"uniqueIndex;not null"`
	Password     string        `json:"password" validate:"required"`
	Publications []Publication `json:"publication"  gorm:"foreignKey:AuthorID"`
}
