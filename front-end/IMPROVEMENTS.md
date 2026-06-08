# 🎯 Plan улучшений Front-End

## 🔴 Приоритет 1: Критическое (Безопасность & Функциональность)

### 1️⃣ Добавить Axios Interceptors для токена
- [ \/ ] Создать файл `lib/api/axiosInstance.ts` с базовой конфигурацией
- [ ] Добавить request interceptor для автоматического добавления `Authorization` заголовка
- [ ] Добавить response interceptor для обработки 401 ошибок
- [ ] Обновить `userAPI.ts` использовать новый axiosInstance вместо обычного axios
- [ ] Тестировать на реальных запросах

### 2️⃣ Добавить Environment переменные
- [ ] Создать файл `.env.local` с `NEXT_PUBLIC_API_URL`
- [ ] Обновить `userAPI.ts` использовать переменную вместо hardcoded URL
- [ ] Обновить `axiosInstance.ts` использовать переменную
- [ ] Добавить `.env.local` в `.gitignore`
- [ ] Создать `.env.example` для примера++.cod

### 3️⃣ Реализовать Refresh Token логику
- [ ] Добавить поле `refreshToken` в `authToken.ts`
- [ ] Обновить response interceptor для обработки истечения токена
- [ ] Добавить endpoint вызов для получения нового токена
- [ ] Автоматически обновлять токен при 401
- [ ] Логировать refresh attempts для дебага

---

## 🟠 Приоритет 2: Важное (Качество & Удобство)

### 4️⃣ Добавить User Context
- [ ] Создать файл `lib/context/AuthContext.tsx`
- [ ] Добавить Provider в `app/layout.tsx`
- [ ] Переместить useAuth логику в Context
- [ ] Добавить юзер данные (name, email, avatar)
- [ ] Использовать контекст вместо прямых вызовов useAuth

### 5️⃣ Добавить Error Boundary
- [ ] Создать компонент `components/ErrorBoundary.tsx`
- [ ] Обернуть основное содержимое в `app/layout.tsx`
- [ ] Добавить fallback UI с кнопкой "Перезагрузить"
- [ ] Логировать ошибки в консоль

### 6️⃣ Улучшить обработку ошибок API
- [ ] Дополнить `lib/api/errors.ts` всеми кодами ошибок
- [ ] Добавить типы для Error Response
- [ ] Улучшить обработку network ошибок
- [ ] Добавить retry логику для failed запросов

### 7️⃣ Заполнить `lib/api/auth.ts`
- [ ] Добавить методы: `login()`, `logout()`, `register()`, `refreshToken()`
- [ ] Интегрировать с `userAPI`
- [ ] Добавить типизацию для request/response
- [ ] Использовать axiosInstance

---

## 🟡 Приоритет 3: Улучшения (Performance & DX)

### 8️⃣ Добавить типы для API
- [ ] Создать `types/api.types.ts`
- [ ] Добавить типы для User, LoginResponse, ErrorResponse
- [ ] Обновить `userAPI.ts` использовать типы
- [ ] Обновить компоненты для строгой типизации

### 9️⃣ Улучшить Loading состояния
- [ ] Добавить Skeleton компоненты для контента
- [ ] Использовать React Query для управления loading состояниями
- [ ] Добавить isLoading, isFetching флаги в API вызовах
- [ ] Показывать Loading spinner вместо простого текста

### 🔟 Добавить Logging систему
- [ ] Создать `lib/logger.ts` с методами log, warn, error
- [ ] Добавить логирование в API слой
- [ ] Логировать auth события
- [ ] Логировать ошибки

---

## 📝 Приоритет 4: Testing (Для дальнейшей разработки)

### 1️⃣1️⃣ Добавить Unit тесты
- [ ] Установить Jest + React Testing Library
- [ ] Написать тесты для `useAuth` hook
- [ ] Написать тесты для `authToken` утилит
- [ ] Написать тесты для ProtectedRoute компонента
- [ ] Добавить CI/CD для запуска тестов

### 1️⃣2️⃣ Добавить E2E тесты
- [ ] Установить Cypress или Playwright
- [ ] Написать тесты для login flow
- [ ] Написать тесты для navigation
- [ ] Написать тесты для protected pages

---

## 📊 Quick Start (Рекомендуемый порядок)

**День 1:**
1. Приоритет 1, задача 1️⃣ (Interceptors)
2. Приоритет 1, задача 2️⃣ (Env переменные)

**День 2:**
3. Приоритет 1, задача 3️⃣ (Refresh Token)
4. Приоритет 2, задача 4️⃣ (User Context)

**День 3:**
5. Приоритет 2, задача 5️⃣ (Error Boundary)
6. Приоритет 2, задача 6️⃣ (Error handling)

**Потом:**
- Остальное по необходимости

---

## 🚀 Команды для старта

```bash
# Перейти в папку фронта
cd front-end

# Установить доп зависимости (если нужны)
npm install

# Запустить dev сервер
npm run dev

# Запустить ESLint
npm run lint
```

---

**Последнее обновление:** 2026-06-07
