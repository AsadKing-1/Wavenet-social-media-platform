package configs

type DatabaseConfig struct {
	Host      string `yaml:"host"`
	Port      int    `yaml:"port"`
	DBname   string `yaml:"dbname"`
	Username  string `yaml:"username"`
	Password  string `yaml:"password"`
	LogLevel  string `yaml:"log_level"`
	LogFile   string `yaml:"log_file"`
}

type HTTPServerConfig struct {
	Host     string `yaml:"host"`
	Port     int    `yaml:"port"`
	LogLevel string `yaml:"log_level"`
	LogFile  string `yaml:"log_file"`
}

type SMTPServerConfig struct {
	Host     string `yaml:"host"`
	Port     int    `yaml:"port"`
	LogLevel string `yaml:"log_level"`
	LogFile  string `yaml:"log_file"`
}

type Config struct {
	Database   DatabaseConfig   `yaml:"database"`
	HTTPServer HTTPServerConfig `yaml:"http_server"`
	SMTPServer SMTPServerConfig `yaml:"smtp_server"`
}
