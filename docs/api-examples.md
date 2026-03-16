# API Request Examples

Base URL:

`http://localhost:3000/api`

## Authentication

Fixed seed users:

- admin: `admin@sctec.local` / `admin1234`
- editor: `editor@sctec.local` / `edit1234`
- viewer: `viewer@sctec.local` / `view1234`

All routes below require header:

`Authorization: Bearer <accessToken>`

### Login

`POST /auth/login`

```json
{
  "email": "admin@sctec.local",
  "password": "admin1234"
}
```

### Profile

`GET /auth/me`

## Users

### Create user (admin)

`POST /users`

```json
{
  "name": "Novo Editor",
  "email": "novo.editor@sctec.local",
  "password": "edit1234",
  "role": "editor"
}
```

### List users

`GET /users?page=1&limit=10&sort=id&order=ASC`

Optional filter:

`GET /users?role=viewer`

### Get user by id

`GET /users/:id`

### Update user (admin)

`PATCH /users/:id`

```json
{
  "name": "Editor Atualizado",
  "email": "editor@sctec.local",
  "password": "edit1234",
  "role": "editor"
}
```

### Delete user (admin)

`DELETE /users/:id`

## Cities

### Create city

`POST /cities`

```json
{
  "name": "São Bento do Sul"
}
```

### List cities

`GET /cities?page=1&limit=10&sort=name&order=ASC`

Optional search:

`GET /cities?name=flor`

### Get city by id

`GET /cities/:id`

### Update city

`PATCH /cities/:id`

```json
{
  "name": "São Bento"
}
```

### Delete city

`DELETE /cities/:id`

Business rule:

- returns `409 Conflict` when city has linked enterprises.

## Segments

### Create segment

`POST /segments`

```json
{
  "name": "Economia Criativa"
}
```

### List segments

`GET /segments?page=1&limit=10&sort=name&order=ASC`

Optional search:

`GET /segments?name=tec`

### Get segment by id

`GET /segments/:id`

### Update segment

`PATCH /segments/:id`

```json
{
  "name": "Tecnologia da Informacao"
}
```

### Delete segment

`DELETE /segments/:id`

Business rule:

- returns `409 Conflict` when segment has linked enterprises.

## Enterprises

### Create enterprise

`POST /enterprises`

```json
{
  "name": "Startup Ilha Digital",
  "ownerName": "Ana Silva",
  "cityId": "<cityId>",
  "segmentId": "<segmentId>",
  "active": true,
  "contacts": [
    {
      "emails": ["contato@ilhadigital.com.br"],
      "phones": ["(48) 99999-0000"]
    }
  ]
}
```

Note:

- enterprise contact payload supports only `emails` and `phones`.
- for contact identity (`name` and `department`), use `/contacts`.

### List enterprises

`GET /enterprises?page=1&limit=10&sort=name&order=ASC`

With filters:

`GET /enterprises?cityId=<cityId>&segmentId=<segmentId>&sort=cityName&order=ASC`

### Get enterprise by id

`GET /enterprises/:id`

### Update enterprise

`PATCH /enterprises/:id`

```json
{
  "name": "Startup Ilha Digital",
  "ownerName": "Ana Silva",
  "cityId": "<cityId>",
  "segmentId": "<segmentId>",
  "active": false
}
```

### Delete enterprise

`DELETE /enterprises/:id`

## Contacts

Contact identity is managed here (`name` and `department`).

### Create contact

`POST /contacts`

```json
{
  "enterpriseId": "<enterpriseId>",
  "name": "Paulo Mendes",
  "department": "Comercial"
}
```

### List contacts

`GET /contacts?page=1&limit=10&enterpriseId=<enterpriseId>`

### Get contact by id

`GET /contacts/:id`

### Update contact

`PATCH /contacts/:id`

```json
{
  "enterpriseId": "<enterpriseId>",
  "name": "Paulo Mendes",
  "department": "Relacionamento"
}
```

### Delete contact

`DELETE /contacts/:id`

## Contact Emails

Email list sorting supports only `sort=address`.

### Create email

`POST /contact-emails`

```json
{
  "contactId": "<contactId>",
  "address": "paulo@empresa.com.br"
}
```

### List emails

`GET /contact-emails?page=1&limit=10&contactId=<contactId>&sort=address&order=ASC`

### Get email by id

`GET /contact-emails/:id`

### Update email

`PATCH /contact-emails/:id`

```json
{
  "contactId": "<contactId>",
  "address": "paulo.mendes@empresa.com.br"
}
```

### Delete email

`DELETE /contact-emails/:id`

## Contact Phones

Phone list sorting supports only `sort=number`.

### Create phone

`POST /contact-phones`

```json
{
  "contactId": "<contactId>",
  "number": "(48) 98888-7777"
}
```

### List phones

`GET /contact-phones?page=1&limit=10&contactId=<contactId>&sort=number&order=ASC`

### Get phone by id

`GET /contact-phones/:id`

### Update phone

`PATCH /contact-phones/:id`

```json
{
  "contactId": "<contactId>",
  "number": "(48) 97777-6666"
}
```

### Delete phone

`DELETE /contact-phones/:id`

## Notes

- All routes except `POST /auth/login` require JWT token.
- Pagination metadata is exposed via headers:
  - `x-total`
  - `x-page`
  - `x-limit`
  - `x-total-pages`
