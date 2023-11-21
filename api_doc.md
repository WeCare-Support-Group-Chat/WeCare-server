# WeCare-server API Documentation

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /loginToPostgres`

Routes below need authentication:

- `PATCH /user`
- `POST /loginToCE`

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "User id ${response.id} successfully created!"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Username must be unique"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /loginToPostgres

Request:

- body:

```json
{
  "username": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string",
  "username": "string",
  "firstTime": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
