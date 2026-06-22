package configs

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

// ReadConfig — читает конфигурацию из YAML файла и возвращает структуру Config.
//
// Путь к файлу: configs/config.yaml (относительно рабочей директории при запуске).
// При запуске через `go run .` или `go build` из папки go_server/ — путь корректный.
//
// ВАЖНО: конфиг содержит чувствительные данные (пароли БД).
// Не коммить config.yaml в git! Добавь его в .gitignore.
// В продакшне используй переменные окружения или секреты (например, Vault/Docker secrets).
func ReadConfig() Config {
	data, err := os.ReadFile("configs/config.yaml")
	if err != nil {
		// os.Exit(1) вместо паники — более чистое завершение при отсутствии конфига
		fmt.Println("КРИТИЧЕСКАЯ ОШИБКА: не удалось прочитать конфиг:", err)
		os.Exit(1)
	}

	var config Config
	err = yaml.Unmarshal(data, &config)
	if err != nil {
		fmt.Println("КРИТИЧЕСКАЯ ОШИБКА: не удалось распарсить конфиг:", err)
		os.Exit(1)
	}

	return config
}
