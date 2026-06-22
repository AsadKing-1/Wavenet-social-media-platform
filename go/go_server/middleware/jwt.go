package middleware

import (
	"net/http"
	"strings"

	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/models"
	"github.com/IGMA-IGMA/WaveNet-socialmedia/go_server/security"
	"github.com/labstack/echo/v4"
)

// JWTMiddleware проверяет наличие и валидность JWT токена в заголовке Authorization
func JWTMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader == "" {
			response := models.FormingResponse(
				int32(http.StatusUnauthorized),
				struct{}{},
				"Отсутствует токен авторизации",
				"missing authorization header",
			)
			return c.JSON(http.StatusUnauthorized, response)
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			response := models.FormingResponse(
				int32(http.StatusUnauthorized),
				struct{}{},
				"Неверный формат токена. Ожидается: Bearer <token>",
				"invalid authorization header format",
			)
			return c.JSON(http.StatusUnauthorized, response)
		}

		tokenString := parts[1]
		token, err := security.ValidateToken(tokenString)
		if err != nil || !token.Valid {
			response := models.FormingResponse(
				int32(http.StatusUnauthorized),
				struct{}{},
				"Недействительный или истекший токен",
				"invalid or expired token",
			)
			return c.JSON(http.StatusUnauthorized, response)
		}

		claims, ok := token.Claims.(*security.JWTClaims)
		if !ok {
			response := models.FormingResponse(
				int32(http.StatusUnauthorized),
				struct{}{},
				"Неверный формат данных токена",
				"invalid token claims",
			)
			return c.JSON(http.StatusUnauthorized, response)
		}

		// Сохраняем данные пользователя в контексте запроса для последующего использования в обработчиках
		c.Set("userID", claims.UserID)
		c.Set("email", claims.Email)

		return next(c)
	}
}
