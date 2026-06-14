package models

import (
	"gorm.io/gorm"
)

type Publication struct {
	gorm.Model
	
	AuthorID uint `json:"author_id" validate:"required" gorm:"not null"`
	Text     string `json:"text" validate:"required" gorm:"size:500;not null"`
	Photos []Photo `json:"photos"`
	LikeCount int `json:"like_count" gorm:"default:0"`
}

type Photo struct{
	gorm.Model

	PublicationID uint `json:"publication_id" validate:"required" gorm:"not null"`
	PhotoData     string `json:"photo_data" gorm:"type:text;not null"`
	Order int `json:"order" gorm:"default:0"`
}