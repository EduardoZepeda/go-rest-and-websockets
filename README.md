# Golang web sockets and REST

A golang web socket and REST project using basic JWT auth and a POST model. This project updates new posts whenever are created. This project is an improved version of  Platzi's [Go REST web sockets course](https://platzi.com/cursos/go-rest-websockets/).

## Installation

Just clone the project and switch to the newly created directory.

```bash
git clone https://github.com/EduardoZepeda/go-rest-and-websockets
cd go-rest-and-websockets
```

## Configuration

An .env file is required for this project to work, the .env file must be at the root of the project, it requires a 

```bash
PORT=<:PORT_NUMBER>
JWT_SECRET=<JWT_SECRET>
DATABASE_CONNECTION=<DATABASE_CONNECTION_URL>
```

For example:

```bash
PORT=:5050
JWT_SECRET=abcdefghijklmnopqrstuvwxyz
DATABASE_CONNECTION=postgres://postgres:postgres@localhost:54321/postgres?sslmode=disable
```

### Optional database database

An optional database is required for this project to work. You can create one using the *Dockerfile* inside *database* directory.

```bash
cd database
docker build . -t ws-golang-database
docker run -p 54321:5432 ws-golang-database
```

This will create a database receiving connections at port 54321.

## Building and running instructions

```bash
go build main.go
./main
```

If you run it

```bash
./main
Starting server on port :5050
```

## Endpoints 

The following endpoints are available

```bash
GET "/"
POST "/signup"
POST "/login"
GET "/posts"
GET "/posts/{id}"

// AUTH REQUIRED VIEWS
GET "/api/v1/me"
POST "/api/v1/posts"
PUT "/api/v1/posts/{id}"
DELETE "/api/v1/posts/{id}"

// WEB SOCKET
GET "/ws"
```


