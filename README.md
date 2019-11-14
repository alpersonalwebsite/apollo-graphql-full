# Title

Overview...

## Sub title


### Examples 

#### Query > All users

Query:
```
query {
  getUsers {
    name
  }
}
```

Result:
```
{
  "data": {
    "getUsers": [
      {
        "name": "Peter"
      },
      {
        "name": "Bill"
      },
      {
        "name": "Alf"
      },
      {
        "name": "Canary"
      }
    ]
  }
}
```

#### Query > User by id

Query:
```
query($id: ID!) {
  getUser(id: $id) {
    name
  }
}
```

Query variables:
```
{
  "id": "2"
}
```

Result:
```
{
  "data": {
    "getUser": {
      "name": "Bill"
    }
  }
}
```

#### Mutation > Add user

Mutation:
```
mutation($id: ID!, $name: String!) {
  postUser(id: $id, name: $name) {
    name
  }
}
```

Query variables:
```
{
  "id": "11",
  "name": "Al"
}
```

Result:
```
{
  "data": {
    "postUser": {
      "name": "Al"
    }
  }
}
```

#### Mutation > Delete user

Mutation:
```
mutation($id: ID!) {
  deleteUser(id: $id) {
    name
    lastName
    id
  }
}
```

Query variables:
```
{
  "id": "1"
}
```

Result:
```
{
  "data": {
    "deleteUser": {
      "name": "Peter",
      "lastName": "Pan",
      "id": "1"
    }
  }
}
```