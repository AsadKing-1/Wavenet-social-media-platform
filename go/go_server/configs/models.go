package configs

// ===========================================================
// Структуры конфигурации — соответствуют полям в config.yaml
// Теги yaml:"..." указывают GORM/yaml парсеру какое поле YAML
// соответствует какому полю структуры Go.
// ===========================================================

// DatabaseConfig — настройки подключения к PostgreSQL.
type DatabaseConfig struct {
	// Host — адрес сервера БД. Локально: "127.0.0.1" или "localhost".
	// В Docker: имя сервиса из docker-compose (например, "db").
	// НЕ является публичным IP — это адрес внутри сети.
	Host string `yaml:"host"`

	// Port — порт PostgreSQL. Стандартный: 5432.
	Port int `yaml:"port"`

	// DBname — имя базы данных (должна существовать до запуска).
	DBname string `yaml:"dbname"`

	// Username — имя пользователя PostgreSQL.
	Username string `yaml:"username"`

	// Password — пароль пользователя PostgreSQL.
	// БЕЗОПАСНОСТЬ: не храни в git! Используй .gitignore или env-переменные.
	Password string `yaml:"password"`

	// LogLevel — уровень логирования для БД ("DEBUG", "INFO", "WARN", "ERROR").
	LogLevel string `yaml:"log_level"`

	// LogFile — имя файла лога для операций с БД (пишется в папку logs/).
	LogFile string `yaml:"log_file"`
}

// HTTPServerConfig — настройки HTTP сервера (Echo).
type HTTPServerConfig struct {
	// Host — адрес для прослушивания входящих соединений.
	// "127.0.0.1" = только локальные подключения.
	// "0.0.0.0"   = принимать подключения с любого интерфейса (нужно для Docker/сети).
	// Это НЕ IP клиентов — это адрес, на котором сервер слушает порт.
	Host string `yaml:"host"`

	// Port — порт HTTP сервера. По умолчанию: 8000.
	Port int `yaml:"port"`

	// LogLevel — уровень логирования HTTP запросов.
	LogLevel string `yaml:"log_level"`

	// LogFile — имя файла лога для HTTP запросов.
	LogFile string `yaml:"log_file"`
}

// SMTPServerConfig — настройки встроенного SMTP сервера для отправки почты.
type SMTPServerConfig struct {
	// Host — адрес SMTP сервера.
	// "127.0.0.1" = локальный тестовый SMTP (например, MailHog, Mailtrap).
	Host string `yaml:"host"`

	// Port — порт SMTP. 2525 = нестандартный (используется для тестовых SMTP серверов).
	// Стандартные: 25 (незащищённый), 465 (SSL), 587 (STARTTLS).
	Port int `yaml:"port"`

	// LogLevel — уровень логирования SMTP операций.
	LogLevel string `yaml:"log_level"`

	// LogFile — имя файла лога SMTP.
	LogFile string `yaml:"log_file"`
}

// Config — корневая структура конфигурации.
// Объединяет все настройки приложения в один объект.
type Config struct {
	Database   DatabaseConfig   `yaml:"database"`
	HTTPServer HTTPServerConfig `yaml:"http_server"`
	SMTPServer SMTPServerConfig `yaml:"smtp_server"`
}
