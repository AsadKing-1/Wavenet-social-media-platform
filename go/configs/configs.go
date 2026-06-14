package configs

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

func ReadConfig() Config {
	data, err := os.ReadFile("configs/config.yaml")
	if err != nil {
		fmt.Println("Error reading config file:", err)
	}
	var config Config
	err = yaml.Unmarshal(data, &config)
	if err != nil {
		fmt.Println("Error parsing config file:", err)
	}
	return config

}
