user-service Responsibilities:

Store and fetch user profiles

Update user data (name, address, phone, etc.)

Protected routes (JWT verification via Authorization header)

[ Client ]
|
| POST /auth/register (email, password, confirmPassword)
|
v
[ Auth Service ]

- Validates password
- Hashes password
- Calls: POST /users/register (with email, hashedPassword)
  |
  v
  [ User Service ]
- Creates user in DB
- Returns userId
  |
  v
  [ Auth Service ]
- Generates JWT with userId
- Returns token to client
