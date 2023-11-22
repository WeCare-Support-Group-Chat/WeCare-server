# WeCare-server API Documentation

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /loginToPostgres`

Routes below need authentication:

- `PATCH /user`
- `POST /usergroup`
- `GET /usergroup`
- `PUT /usergroup/:id`

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
  "message": "User id ${response.id} successfully created!"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Username is required"
}
OR
{
  "message": "username must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password must be at least 5 characters long"
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
  "message": "Invalid username/password"
}
```

## 3. PATCH /user

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
{
  "message": "User id ${id} firstTime column successfully updated!"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

## 4. POST /usergroup

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- body:

```json
[
  { "id": "integer", "title": "string" },
  { "id": "integer", "title": "string" },
  { "id": "integer", "title": "string" }
]
```

Response (201 - Created)

```json
{ "message": "success" }
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

## 5. GET /usergroup

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "GroupId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Group": {
      "id": "integer",
      "title": "string",
      "information": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
]
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (404 - Not Found)

```json
{
  "message": "Data not found"
}
```

## 6. PUT /usergroup/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "person": {
    "username": "string",
    "first_name": "",
    "last_name": "",
    "avatar": null,
    "custom_json": "{}",
    "is_online": "boolean"
  },
  "chat_updated": "string",
  "last_read": null
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
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
