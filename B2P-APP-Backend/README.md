# B2P-APP-Backend

BASE URL: https://b2p-app-backend.herokuapp.com/
## Register Admin User 
POST https://b2p-app-backend.herokuapp.com/user/add/admin
```
Content-Type: application/json

{
    "name": "devAdmin",
    "password": "devAdmin"
}
```
## Register worker User 
POST https://b2p-app-backend.herokuapp.com/user/add/worker
```
Content-Type: application/json

{
    "name": "worker1",
    "password": "worker1"
}
```
## Register Client User 
POST https://b2p-app-backend.herokuapp.com/user/add/client
```
Content-Type: application/json

{
    "name": "client",
    "password": "client"
}
```


## Login Admin User
POST https://b2p-app-backend.herokuapp.com/user/login/admin
```
Content-Type: application/json

{
    "name": "devAdmin",
    "password": "devAdmin"
}
```
## Login Worker User
POST https://b2p-app-backend.herokuapp.com/user/login/worker
```
Content-Type: application/json

{
    "name": "worker1",
    "password": "worker1"
}
```
## Login Client User
POST https://b2p-app-backend.herokuapp.com/user/login/client
```
Content-Type: application/json

{
    "name": "client",
    "password": "client"
}
```

## Get All types of Users
GET  https://b2p-app-backend.herokuapp.com/user
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmUyMzJmYzlkYTRmMjFhODg2ZDcwYyIsImlhdCI6MTYzOTkwNjk2MCwiZXhwIjoxNjQyNDk4OTYwfQ.I_xGr6cXIwClisxOsVkRX9i0S-XUfTIndSN-u1CobKo

(Restricted to Admin user token)
```

## Search user
POST https://b2p-app-backend.herokuapp.com/user/search/:userType
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmUyMzJmYzlkYTRmMjFhODg2ZDcwYyIsImlhdCI6MTYzOTkwNjk2MCwiZXhwIjoxNjQyNDk4OTYwfQ.I_xGr6cXIwClisxOsVkRX9i0S-XUfTIndSN-u1CobKo

(Restricted to Admin user token)

userType:  "admin" || "client" || "worker"

{
    name: "cli"
}
```

## Search Question Set
POST https://b2p-app-backend.herokuapp.com/question-set/search
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmUyMzJmYzlkYTRmMjFhODg2ZDcwYyIsImlhdCI6MTYzOTkwNjk2MCwiZXhwIjoxNjQyNDk4OTYwfQ.I_xGr6cXIwClisxOsVkRX9i0S-XUfTIndSN-u1CobKo

(Restricted to Admin user token)

{
    setName: "cli"
}
```

## Delete user with their ids
DELETE https://b2p-app-backend.herokuapp.com/user/61bb083aa51574f430c886c4
```
DELETE https://b2p-app-backend.herokuapp.com/user/:userId

Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmIwODNhYTUxNTc0ZjQzMGM4ODZjNCIsImlhdCI6MTYzOTY0NzMyMCwiZXhwIjoxNjQyMjM5MzIwfQ.eAirkGPy_ttXEOmVBKkKWPSostyHjv2XplfvcZjFC1M

(Restricted to Admin user token)
```

## Change user password with their ids
POST https://b2p-app-backend.herokuapp.com/user/61bb083aa51574f430c886c4
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmIwODNhYTUxNTc0ZjQzMGM4ODZjNCIsImlhdCI6MTYzOTY0NzMyMCwiZXhwIjoxNjQyMjM5MzIwfQ.eAirkGPy_ttXEOmVBKkKWPSostyHjv2XplfvcZjFC1M

(Restricted to Admin user token)

{
    "password": "FUff"
}
```

## Create a Question
POST https://b2p-app-backend.herokuapp.com/question-set
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmUyMzJmYzlkYTRmMjFhODg2ZDcwYyIsImlhdCI6MTYzOTg1MTc1OSwiZXhwIjoxNjQyNDQzNzU5fQ.xSnbvraW4X9GL1hRV3CW0NZekAjnyVKo_hIWViO1tOU

(Restricted to Admin user token)

{
    "setName": "HuiHui",
    "client": ["61be234bc9da4f21a886d712"], || ClientIds
    "worker": ["61be2341c9da4f21a886d70f"], || WorkersIDs
      "querry": [{
        "question": "question2",
        "dataType": "file",
        "mandatory": "true"
      },
      {
        "question": "question 3",
        "dataType": "text",                  || text / file 
        "mandatory": false                   || True / False
      }]
}
```

## View all questions
GET  https://b2p-app-backend.herokuapp.com/question-set
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmUyMzJmYzlkYTRmMjFhODg2ZDcwYyIsImlhdCI6MTYzOTg1MTc1OSwiZXhwIjoxNjQyNDQzNzU5fQ.xSnbvraW4X9GL1hRV3CW0NZekAjnyVKo_hIWViO1tOU

(Restricted to any user token)
```

## Get single question
GET  https://b2p-app-backend.herokuapp.com/question-set/61beefe23ffbdf31b4650ea9
```
GET  https://b2p-app-backend.herokuapp.com/question-set/:questionId
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmIwODNhYTUxNTc0ZjQzMGM4ODZjNCIsImlhdCI6MTYzOTY0NzMyMCwiZXhwIjoxNjQyMjM5MzIwfQ.eAirkGPy_ttXEOmVBKkKWPSostyHjv2XplfvcZjFC1M

(Restricted to any user token)
```

## Update a single question set by admin
PUT  https://b2p-app-backend.herokuapp.com/question-set/61be3242f1fda6b26469cfa0
```
PUT  https://b2p-app-backend.herokuapp.com/question-set/:questionId
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmUyMzJmYzlkYTRmMjFhODg2ZDcwYyIsImlhdCI6MTYzOTg5NjY5MSwiZXhwIjoxNjQyNDg4NjkxfQ.bLDCQ-pgkUTEhF9fVlcX6vQvlvKSrYgoQASjYKwWdWw

(Restricted to Admin user token)

{ 
    "setName": "HuiHui",
    "client": ["61be234bc9da4f21a886d712"],
    "worker": ["61be2341c9da4f21a886d70f"],
      "querry": [{
        "question": "question2",
        "dataType": "file",
        "mandatory": "true"
      },
      {
        "question": "question 3",
        "dataType": "text",
        "mandatory": "false"
      },
      {
        "question": "question 1",
        "asnwer": ["F"],
        "dataType": "text",
        "mandatory": "false"
      }]
}
```

## Delete a single question set by admin
DELETE  https://b2p-app-backend.herokuapp.com/question-set/61be3242f1fda6b26469cfa0
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmUyMzJmYzlkYTRmMjFhODg2ZDcwYyIsImlhdCI6MTYzOTg5NjY5MSwiZXhwIjoxNjQyNDg4NjkxfQ.bLDCQ-pgkUTEhF9fVlcX6vQvlvKSrYgoQASjYKwWdWw

(Restricted to Admin user token)
```


##  Post answer
PUT https://b2p-app-backend.herokuapp.com/question-set/answer/61beefe23ffbdf31b4650ea9
```
PUT http://localhost:5000/question-set/answer/61d1e0db585de77fba5a34a8
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmUyMzQxYzlkYTRmMjFhODg2ZDcwZiIsImlhdCI6MTYzOTkwNzU1OSwiZXhwIjoxNjQyNDk5NTU5fQ.-kwm9wrlXuqUUEMoz9f4f6KJLJj6zprZWbM6ugK0Oro

{
  "answerQuerry": [
    {
      "answerId": "61d1e0db585de77fba5a34a9",
      "answer": ["ki r hobe"]
    }, 
    {
      "answerId": "61d1e0db585de77fba5a34aa",
      "answer": ["ki r hobe 2", "test answer 1"]
    }
  ]
}
``` 



Find Location using coordinates

https://www.google.com/maps/place/22%C2%B034'33.7%22N+88%C2%B024'14.6%22E

``
https://www.google.com/maps/place/(22deg34'33.7"N)+(88deg24'14.6")E
 , 
``