package logger

import "go.uber.org/zap"

// StorageLog — интерфейс логгера.
// Позволяет подменить реализацию логгера в любом месте приложения
// (например, использовать mock-логгер в тестах).
//
// Реализуется структурой Logger из logger.go через zap.Logger.
type StorageLog interface {
	Info(msg string, fields ...zap.Field)
	Error(msg string, fields ...zap.Field)
	Fatal(msg string, fields ...zap.Field)
	Debug(msg string, fields ...zap.Field)
}