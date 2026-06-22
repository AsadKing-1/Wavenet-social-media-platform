package handlers

import (
	"net/http"
	"strconv"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/security"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/storage"
	"github.com/labstack/echo/v4"
)

// ===========================================================
// Хэндлеры пользователей и системные хэндлеры.
//
// Хэндлер — функция, которая обрабатывает HTTP запрос:
//  1. Читает входные данные (query params, JSON body)
//  2. Вызывает бизнес-логику / слой хранилища
//  3. Возвращает JSON ответ
//
// Все ответы формируются через models.FormingResponse
// для единообразного формата API.
// ===========================================================

// Health — GET /api/health
// Проверка работоспособности сервера (health check).
// Возвращает список всех зарегистрированных маршрутов.
// Используется системами мониторинга (uptime robots, Docker HEALTHCHECK).
func Health(c echo.Context, e *echo.Echo) error {
	var routeList []map[string]string
	for _, route := range e.Routes() {
		routeList = append(routeList, map[string]string{
			"method": route.Method,
			"path":   route.Path,
		})
	}
	response := models.FormingResponse(
		int32(http.StatusOK),
		routeList,
		"Сервер работает",
		"",
	)
	return c.JSON(http.StatusOK, response)
}

// GetUsers — GET /api/users
// Возвращает список всех пользователей из БД.
// В ответе: массив объектов User.
//
// БЕЗОПАСНОСТЬ: пароли не возвращаются т.к. User.Password
// помечен json:"password" — в будущем стоит добавить
// отдельный DTO без поля password.
func GetUsers(c echo.Context, db *storage.PostgresStorage) error {
	users, err := db.GetUsers()
	if err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.User{},
			"Ошибка получения пользователей",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	response := models.FormingResponse(
		int32(http.StatusOK),
		users,
		"Успешно получено",
		"",
	)
	return c.JSON(http.StatusOK, response)
}

// CreateUser — POST /api/user
// Создаёт нового пользователя.
//
// Ожидаемый JSON body:
//
//	{
//	  "name": "username",
//	  "email": "user@example.com",
//	  "password": "plaintext_password"
//	}
//
// Пароль хэшируется на уровне storage (bcrypt) — сюда приходит открытый текст.
// В ответе возвращаем только имя и email, не пароль (даже хэшированный).
func CreateUser(c echo.Context, db *storage.PostgresStorage) error {
	var user models.User

	// c.Bind() читает JSON из тела запроса и заполняет структуру user
	if err := c.Bind(&user); err != nil {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.User{},
			"Ошибка чтения данных запроса",
			err.Error(),
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	// Базовая валидация обязательных полей
	if user.Name == "" || user.Email == "" || user.Password == "" {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.User{},
			"Заполните все обязательные поля: name, email, password",
			"missing required fields",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	if err := db.CreateUser(&user); err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.User{},
			"Ошибка создания пользователя",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	// Возвращаем только публичные данные, без пароля
	response := models.FormingResponse(
		int32(http.StatusCreated),
		&models.User{Name: user.Name, Email: user.Email},
		"Пользователь успешно создан",
		"",
	)
	return c.JSON(http.StatusCreated, response)
}

// DeleteUser — DELETE /api/user?id=123
// Удаляет пользователя по числовому ID (мягкое удаление).
//
// Query параметр:
//   - id (обязательный) — числовой ID пользователя
func DeleteUser(c echo.Context, db *storage.PostgresStorage) error {
	// Читаем query параметр ?id=...
	idStr := c.QueryParam("id")
	if idStr == "" {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.User{},
			"Неверный запрос",
			"параметр id обязателен",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	// Конвертируем строку в число; обрабатываем ошибку!
	idInt, err := strconv.Atoi(idStr)
	if err != nil {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.User{},
			"Неверный формат ID",
			"id должен быть целым числом",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	if err := db.DeleteUser(idInt); err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.User{},
			"Ошибка удаления пользователя",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	response := models.FormingResponse(
		int32(http.StatusOK),
		[]models.User{},
		"Пользователь успешно удалён",
		"",
	)
	return c.JSON(http.StatusOK, response)
}

// UpdateUser — PUT /api/user?id=123&password=newpass
// Обновляет пароль пользователя по ID.
//
// Query параметры:
//   - id       (обязательный) — числовой ID пользователя
//   - password (обязательный) — новый пароль в открытом виде
//
// Хэширование происходит в storage.UpdateUser() автоматически.
func UpdateUser(c echo.Context, db *storage.PostgresStorage) error {
	idStr := c.QueryParam("id")
	password := c.QueryParam("password")

	if idStr == "" {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.User{},
			"Неверный запрос",
			"параметр id обязателен",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	if password == "" {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.User{},
			"Неверный запрос",
			"параметр password обязателен",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	idInt, err := strconv.Atoi(idStr)
	if err != nil {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			[]models.User{},
			"Неверный формат ID",
			"id должен быть целым числом",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	if err = db.UpdateUser(int32(idInt), password); err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			[]models.User{},
			"Ошибка обновления пароля",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	response := models.FormingResponse(
		int32(http.StatusOK),
		[]models.User{},
		"Пароль успешно обновлён",
		"",
	)
	return c.JSON(http.StatusOK, response)
}

// Login — POST /api/login
// Авторизация пользователя по имени и паролю.
//
// Ожидаемый JSON body:
//
//	{
//	  "email": "user@example.com",
//	  "password": "plaintext_password"
//	}
//
// Возвращает 200 с токеном и данными пользователя при успехе, 401 если нет.
func Login(c echo.Context, db *storage.PostgresStorage) error {
	var creds struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.Bind(&creds); err != nil {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			struct{}{},
			"Ошибка чтения данных",
			err.Error(),
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	if creds.Email == "" || creds.Password == "" {
		response := models.FormingResponse(
			int32(http.StatusBadRequest),
			struct{}{},
			"Заполните email и password",
			"missing credentials",
		)
		return c.JSON(http.StatusBadRequest, response)
	}

	// Ищем пользователя по email
	user, err := db.GetUserByEmail(creds.Email)
	if err != nil {
		// Ошибка БД или пользователь не найден — возвращаем 401
		response := models.FormingResponse(
			int32(http.StatusUnauthorized),
			struct{}{},
			"Неверный email или пароль",
			"invalid credentials",
		)
		return c.JSON(http.StatusUnauthorized, response)
	}

	// Сравниваем пароль с хэшем
	if !security.CheckPassword(user.Password, creds.Password) {
		response := models.FormingResponse(
			int32(http.StatusUnauthorized),
			struct{}{},
			"Неверный email или пароль",
			"invalid credentials",
		)
		return c.JSON(http.StatusUnauthorized, response)
	}

	// Генерируем JWT токен
	token, err := security.GenerateToken(user.ID, user.Email)
	if err != nil {
		response := models.FormingResponse(
			int32(http.StatusInternalServerError),
			struct{}{},
			"Ошибка генерации сессии",
			err.Error(),
		)
		return c.JSON(http.StatusInternalServerError, response)
	}

	// Возвращаем токен и данные пользователя
	type LoginResponse struct {
		Token string      `json:"token"`
		User  models.User `json:"user"`
	}

	// Очищаем пароль для безопасности
	user.Password = ""

	response := models.FormingResponse(
		int32(http.StatusOK),
		LoginResponse{
			Token: token,
			User:  user,
		},
		"Авторизация успешна",
		"",
	)
	return c.JSON(http.StatusOK, response)
}
