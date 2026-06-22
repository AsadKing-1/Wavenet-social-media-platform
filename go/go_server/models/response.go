package models

// Response — универсальная обёртка для всех ответов API.
//
// Все эндпоинты возвращают JSON в едином формате:
//
//	{
//	  "statusCode": 200,
//	  "message":    "Успешно получено",
//	  "data":       [...],
//	  "error":      ""
//	}
//
// Использование дженерика [T any] позволяет хранить в Data
// любой тип: []User, []Publication, map[string]string и т.д.
// При этом компилятор Go проверяет типы на этапе компиляции.
//
// Теги json:
//   - "omitempty" — поле не включается в JSON если оно пустое/нулевое.
//     Это значит: если Error == "" → в ответе не будет поля "error" вообще.
type Response[T any] struct {
	// StatusCode — HTTP статус код дублируется в теле ответа
	// для удобства клиента (не нужно читать заголовки).
	StatusCode int32 `json:"statusCode"`

	// Message — человекочитаемое сообщение о результате операции.
	Message string `json:"message"`

	// Data — полезная нагрузка ответа. Тип определяется при вызове FormingResponse.
	// omitempty: не включается в JSON если nil/пустой массив.
	Data T `json:"data,omitempty"`

	// Error — описание ошибки (пустая строка если ошибки нет).
	// omitempty: поле исчезает из JSON при успешном ответе.
	Error string `json:"error,omitempty"`
}

// FormingResponse — конструктор ответа.
// Принимает все поля и возвращает заполненную структуру Response[T].
//
// Пример использования:
//
//	response := models.FormingResponse(
//	    int32(http.StatusOK),
//	    users,              // тип []User выводится автоматически
//	    "Успешно",
//	    "",
//	)
//	return c.JSON(http.StatusOK, response)
func FormingResponse[T any](statusCode int32, data T, message string, errorMsg string) Response[T] {
	return Response[T]{
		StatusCode: statusCode,
		Message:    message,
		Data:       data,
		Error:      errorMsg,
	}
}
