package logger

import (
	"os"
	"go.uber.org/zap/zapcore"
	"go.uber.org/zap"
)

type StorageLog interface {
	Info(msg string, fields ...zap.Field)
	Error(msg string, fields ...zap.Field)
	Fatal(msg string, fields ...zap.Field)
	Debug(msg string, fields ...zap.Field)
}