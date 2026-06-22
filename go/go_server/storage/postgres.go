package storage

import (
	"fmt"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/configs"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// ===========================================================
// PostgresStorage — основная реализация хранилища данных.
// Использует GORM ORM для работы с PostgreSQL.
// Один экземпляр используется на всё приложение (singleton).
// ===========================================================
type PostgresStorage struct {
	db *gorm.DB // внутреннее подключение к PostgreSQL через GORM
}

// RollBack — вспомогательный метод для использования с defer.
// Если в функции произошла паника — откатывает транзакцию.
// Если всё ок — коммитит изменения.
// Использование: defer s.RollBack(tx)
func (s *PostgresStorage) RollBack(tx *gorm.DB) {
	if r := recover(); r != nil {
		tx.Rollback()
	} else {
		tx.Commit()
	}
}

// NewPostgresStorage — конструктор хранилища.
// Принимает конфиг БД, формирует DSN строку подключения,
// открывает соединение и запускает AutoMigrate (создаёт таблицы если их нет).
//
// DSN (Data Source Name) — строка формата:
//
//	"host=... user=... password=... dbname=... port=... sslmode=disable"
//
// sslmode=disable — отключаем SSL (для локальной разработки, в продакшне включить!)
func NewPostgresStorage(config *configs.DatabaseConfig) (*PostgresStorage, error) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%d sslmode=disable",
		config.Host,
		config.Username,
		config.Password,
		config.DBname,
		config.Port,
	)

	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		// Возвращаем ошибку наверх — main.go должен обработать её
		return nil, fmt.Errorf("не удалось подключиться к PostgreSQL: %w", err)
	}

	// AutoMigrate — автоматически создаёт/обновляет таблицы по моделям.
	// ВНИМАНИЕ: не удаляет столбцы, только добавляет новые!
	err = DB.AutoMigrate(&models.User{}, &models.Publication{}, &models.Photo{})
	if err != nil {
		return nil, fmt.Errorf("ошибка миграции БД: %w", err)
	}

	return &PostgresStorage{db: DB}, nil
}
