# TODO App

## Command

```bash
yarn start
yarn test:cov
```

## Get all

```curl
curl --location --request GET 'localhost:3000/todo'
```

## Get by ID

```curl
curl --location --request GET 'localhost:3000/todo/0'
```

## Create Todo

```curl
curl --location --request POST 'localhost:3000/todo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Test Title 1",
    "description": "Test Desc"
}'
```

## Update Todo by ID

```curl
curl --location --request PATCH 'localhost:3000/todo/0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Test Test Title 0",
    "description": "Test Desc 00"
}'
```

## Delete Todo by ID

```curl
curl --location --request DELETE 'localhost:3000/todo/0'
```
