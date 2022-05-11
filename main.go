package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/EduardoZepeda/goRestWebSocketExample/handlers"
	"github.com/EduardoZepeda/goRestWebSocketExample/middleware"
	"github.com/EduardoZepeda/goRestWebSocketExample/server"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	PORT := os.Getenv("PORT")
	JWT_SECRET := os.Getenv("JWT_SECRET")
	DATABASE_CONNECTION := os.Getenv("DATABASE_CONNECTION")

	s, err := server.NewServer(context.Background(), &server.Config{
		JWTSecret:          JWT_SECRET,
		Port:               PORT,
		DatabaseConnection: DATABASE_CONNECTION,
	})

	if err != nil {
		log.Fatal("ListenAndServe", err)
	}

	s.Start(BindRoutes)
}

func BindRoutes(s server.Server, r *mux.Router) {
	r.Use(middleware.CheckAuthMiddleware(s))
	r.HandleFunc("/", handlers.HomeHandler(s)).Methods(http.MethodGet)
	r.HandleFunc("/signup", handlers.SignUpHandler(s)).Methods(http.MethodPost)
	r.HandleFunc("/login", handlers.LoginHandler(s)).Methods(http.MethodPost)
	r.HandleFunc("/me", handlers.MeHandler(s)).Methods(http.MethodGet)
}
