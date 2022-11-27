# TODO App

## Table of Contents

- [Commands](#commands)
- [Plans](#plans)
- [Usages](#usages)

---

## Commands

```bash
yarn
yarn start
yarn start:dev

yarn test
yarn test:cov
```

---

## Plans

### v1.0.0: Features

- [x] Todo
  - Create
  - Get List
  - Get by ID
  - Update by ID
  - Delete by ID

### v1.1.0: Features

- [x] Status
  - TODO
  - DOING
  - DONE
- [x] Improve README

### v1.2.0: Features

- [ ] Dates
  - createdDate: string
  - startDate?: string
  - dueDate?: string
  - updatedDate: string
  - deletedDate?: string
- [ ] Todo Archive Status

### v2.0.0: Features

- [ ] API Versioning
- [ ] Improve Response
- [ ] Pagination
- [ ] Filter in Get List
- [ ] Rename into Task

---

## Usages

### Get all

```bash
curl --location --request GET 'localhost:3000/todo'
```

Response

```json
[
  {
    "id": 0,
    "name": "Test Title 1",
    "description": "Test Desc 001",
    "status": "TODO"
  },
  {
    "id": 1,
    "name": "Test Title 2",
    "description": "Test Desc 002",
    "status": "TODO"
  }
]
```

### Get by ID

```bash
curl --location --request GET 'localhost:3000/todo/0'
```

Response

```json
{
  "id": 0,
  "name": "Test Title 1",
  "description": "Test Desc 001",
  "status": "TODO"
}
```

### Create Todo

```bash
curl --location --request POST 'localhost:3000/todo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Test Title 1",
    "description": "Test Desc 001"
}'
```

Request

```json
{
  "name": "Test Title 1",
  "description": "Test Desc 001"
}
```

Response

```json
{
  "id": 0,
  "name": "Test Title 1",
  "description": "Test Desc 001",
  "status": "TODO"
}
```

### Update Todo by ID

```bash
curl --location --request PATCH 'localhost:3000/todo/0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "status": "DOING"
}'
```

Request

```json
{
  // "name": "Test Title 99",
  // "description": "Test Desc 099",
  "status": "DOING" // TODO, DOING, DONE
}
```

Response

```json
{
  "id": 0,
  "name": "Test Title 1",
  "description": "Test Desc 001",
  "status": "DOING"
}
```

### Delete Todo by ID

```bash
curl --location --request DELETE 'localhost:3000/todo/0'
```

Response

```json
Deleted Todo ID: 0 success
```

---
