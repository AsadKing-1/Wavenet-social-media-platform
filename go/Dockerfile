FROM golang:1.26.3

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o go_server .

EXPOSE 8000

CMD ["/app/go_server"]
