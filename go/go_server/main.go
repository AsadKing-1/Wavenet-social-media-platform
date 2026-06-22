package main

import (
	"fmt"
	"log"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/configs"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/handlers"
	customMiddleware "github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/middleware"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/storage"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// -------------------------------------------------------
	// 1. Загружаем конфигурацию из configs/config.yaml
	// -------------------------------------------------------
	config := configs.ReadConfig()
	fmt.Printf("Загружен конфиг: DB=%s:%d, HTTP=%s:%d\n",
		config.Database.Host, config.Database.Port,
		config.HTTPServer.Host, config.HTTPServer.Port,
	)

	// -------------------------------------------------------
	// 2. Подключаемся к PostgreSQL и запускаем AutoMigrate
	// AutoMigrate создаёт таблицы автоматически по моделям.
	// -------------------------------------------------------
	db, err := storage.NewPostgresStorage(&config.Database)
	if err != nil {
		// Без БД сервер бессмысленен — завершаем с ошибкой
		log.Fatalf("Не удалось подключиться к БД: %v", err)
	}
	fmt.Println("Успешно подключились к PostgreSQL")

	// -------------------------------------------------------
	// 3. Создаём Echo-сервер
	// Echo — лёгкий и быстрый HTTP фреймворк для Go.
	// -------------------------------------------------------
	e := echo.New()
	e.HideBanner = true // убираем ASCII баннер при старте

	// -------------------------------------------------------
	// 4. CORS (Cross-Origin Resource Sharing)
	// Без этого браузер будет блокировать запросы с фронтенда
	// к бэкенду, если они на разных портах/доменах.
	//
	// AllowOrigins — список разрешённых источников запросов.
	// "http://localhost:3000" — фронтенд Next.js при локальной разработке.
	//
	// ВАЖНО: "192.168.100.x" — это локальный IP в твоей домашней сети (LAN),
	// НЕ публичный IP. Нужен если фронтенд запускается на другом устройстве
	// в той же Wi-Fi сети (например, телефон или другой ПК).
	// В продакшне замени на реальный домен: "https://wavenet.app"
	//
	// AllowCredentials: true — разрешаем отправку cookies/токенов
	// -------------------------------------------------------
	allowedOrigins := []string{
		"http://localhost:3000",        // фронтенд на локальной машине
		"http://127.0.0.1:3000",        // альтернатива localhost
	}

	// Если в конфиге задан отдельный CORS Origin — добавляем его
	// (пока читаем из HTTP-конфига хоста, можно расширить)
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: allowedOrigins,
		AllowMethods: []string{
			echo.GET,
			echo.POST,
			echo.PUT,
			echo.PATCH,
			echo.DELETE,
			echo.OPTIONS, // обязательно для preflight-запросов браузера
		},
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderAuthorization,
		},
		AllowCredentials: true,
	}))

	// -------------------------------------------------------
	// 5. Логирование запросов — выводит метод, путь, статус, время
	// -------------------------------------------------------
	e.Use(middleware.Logger())

	// -------------------------------------------------------
	// 6. Recovery — перехватывает паники и возвращает 500
	// вместо падения всего сервера
	// -------------------------------------------------------
	e.Use(middleware.Recover())

	// -------------------------------------------------------
	// 7. Маршруты (Routes) — группа /api
	//
	// Все API эндпоинты собраны здесь.
	// Структура: METHOD /api/path → handler функция
	// -------------------------------------------------------
	api := e.Group("/api")
	{
		// GET /api/health — проверка работоспособности сервера.
		// Возвращает список всех зарегистрированных маршрутов.
		// Используется для мониторинга (uptime checks, Docker healthcheck).
		api.GET("/health", func(c echo.Context) error {
			return handlers.Health(c, e)
		})

		// --- Пользователи ---

		// GET /api/users — получить всех пользователей
		api.GET("/users", func(c echo.Context) error {
			return handlers.GetUsers(c, db)
		})

		// POST /api/user — создать нового пользователя
		// Body (JSON): { "name": "...", "email": "...", "password": "..." }
		api.POST("/user", func(c echo.Context) error {
			return handlers.CreateUser(c, db)
		})

		// DELETE /api/user?id=123 — удалить пользователя по ID (требуется авторизация)
		api.DELETE("/user", func(c echo.Context) error {
			return handlers.DeleteUser(c, db)
		}, customMiddleware.JWTMiddleware)

		// PUT /api/user?id=123&password=newpass — обновить пароль пользователя (требуется авторизация)
		api.PUT("/user", func(c echo.Context) error {
			return handlers.UpdateUser(c, db)
		}, customMiddleware.JWTMiddleware)

		// POST /api/login — авторизация (проверка логина и пароля)
		api.POST("/login", func(c echo.Context) error {
			return handlers.Login(c, db)
		})

		// --- Публикации ---

		// GET /api/publics — получить все публикации (лента)
		api.GET("/publics", func(c echo.Context) error {
			return handlers.GetPublications(c, db)
		})

		// POST /api/public — создать новую публикацию (требуется авторизация)
		api.POST("/public", func(c echo.Context) error {
			return handlers.CreatePublication(c, db)
		}, customMiddleware.JWTMiddleware)
	}

	// -------------------------------------------------------
	// 8. Запуск HTTP сервера
	// Адрес берётся из конфига: host:port (например, "127.0.0.1:8000")
	//
	// "127.0.0.1" — сервер принимает запросы только с локальной машины.
	// "0.0.0.0"   — принимает запросы со всех сетевых интерфейсов
	//               (нужно для Docker или доступа из локальной сети).
	// -------------------------------------------------------
	addr := fmt.Sprintf("%s:%d", config.HTTPServer.Host, config.HTTPServer.Port)
	fmt.Printf("Сервер запущен на http://%s\n", addr)

	if err := e.Start(addr); err != nil {
		log.Fatalf("Ошибка запуска сервера: %v", err)
	}
}
