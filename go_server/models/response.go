package models

type Response[T any] struct {
	StatusCode int32  `json:"statusCode"`
	Message    string `json:"message"`
	Data       T      `json:"data,omitempty"`
	Error      string `json:"error,omitempty"`
}

func FormingResponse[T any](statusCode int32, data T, message string, errorMsg string) Response[T]{
	return Response[T]{
		StatusCode: statusCode,
		Message: message,
		Data: data,
		Error: errorMsg,
	}
}
