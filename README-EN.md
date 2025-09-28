# Node Auth - Clean Architecture

This project implements user authentication in Node.js following Clean Architecture principles.

## Features

- User registration and authentication
- Layer separation (domain, infrastructure, presentation)
- JWT for authentication
- Data validation with DTOs
- Password hashing with bcrypt
- MongoDB database with Mongoose

## Technologies

- **Node.js** - JavaScript runtime
- **TypeScript** - JavaScript superset with static typing
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing library
- **Docker** - Containerization for MongoDB

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker and Docker Compose (for database)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/czambr/03-cleaning-architecture.git
   cd node-auth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the project root with the following variables:
   ```env
   PORT=3000
   MONGO_URL=mongodb://mongo-user:123456@localhost:27017
   MONGO_DB_NAME=auth-db
   JWT_PRIVATE_SEED=your-very-secure-jwt-secret-key
   ```

4. **Start MongoDB database**
   ```bash
   docker-compose up -d
   ```

## Usage

### Development
To run the project in development mode with hot reload:
```bash
npm run dev
```

### Production
To build and run in production mode:
```bash
npm run build
npm start
```

The server will be available at `http://localhost:3000`.

## API Endpoints

### Authentication

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/` | Get users | Yes (JWT) |

### Usage Examples

**Register user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get users (requires token):**
```bash
curl -X GET http://localhost:3000/api/auth/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure

The project follows Clean Architecture principles with the following structure:

```
src/
├── app.ts                    # Application entry point
├── config/                   # Configurations (envs, jwt, bcrypt, validators)
├── data/                     # Data layer
│   └── mongodb/             # MongoDB implementation
├── domain/                   # Domain layer (business rules)
│   ├── datasources/         # Data source interfaces
│   ├── dtos/                # Data Transfer Objects
│   ├── entities/            # Domain entities
│   ├── errors/              # Custom errors
│   ├── repositories/        # Repository interfaces
│   └── use-cases/           # Use cases
├── infrastructure/          # Infrastructure layer
│   ├── datasources/         # Datasource implementations
│   ├── mappers/             # Mappers between entities and models
│   └── repositories/        # Repository implementations
└── presentation/            # Presentation layer
    ├── auth/                # Auth controllers and routes
    ├── middlewares/         # Middlewares (authentication, etc.)
    ├── routes.ts            # Main routes
    └── server.ts            # Express server configuration
```

### Clean Architecture Principles

- **Domain**: Contains business rules and core entities
- **Infrastructure**: Concrete implementations (database, external APIs)
- **Presentation**: HTTP handling, controllers and middlewares
- **Dependencies**: Dependencies point towards the domain (dependency inversion)

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Development | `npm run dev` | Run with hot reload using ts-node-dev |
| Build | `npm run build` | Compile TypeScript to JavaScript |
| Start | `npm start` | Run compiled version |
| Test | `npm test` | Run tests (to be configured) |

## Troubleshooting

### Common Issues

**MongoDB connection error:**
- Make sure Docker is running
- Verify MongoDB container is active: `docker-compose ps`
- Check MongoDB URL in `.env` file

**Environment variables error:**
- Verify `.env` file exists in project root
- Make sure all required variables are defined

**Port already in use:**
- Change port in `.env` file
- Or kill process using the port: `lsof -ti:3000 | xargs kill` (macOS/Linux)

### Useful Commands

**View MongoDB logs:**
```bash
docker-compose logs mongo-db
```

**Restart Docker services:**
```bash
docker-compose down
docker-compose up -d
```

**Clean and reinstall dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Implementation Features

### Clean Architecture

This project implements fundamental Clean Architecture principles:

1. **Separation of concerns**: Each layer has a specific responsibility
2. **Dependency inversion**: Outer layers depend on inner ones
3. **Framework independence**: Domain doesn't depend on Express or MongoDB
4. **Testability**: Interfaces allow easy mocking for tests

### Implemented Patterns

- **Repository Pattern**: Abstracts data access
- **Dependency Injection**: Manual dependency injection
- **DTO Pattern**: Data validation and transfer
- **Use Cases**: Encapsulate business logic
- **Middleware Pattern**: For authentication and validation

## Upcoming Improvements

- [ ] Implement unit and integration tests
- [ ] Add schema validation with Joi or Zod
- [ ] Implement refresh tokens
- [ ] Add logging with Winston
- [ ] Dockerize complete application
- [ ] Implement rate limiting
- [ ] Add Swagger documentation

## Contributing

Contributions are welcome. To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

MIT - See LICENSE file for more details

## Contact

Educational project created to demonstrate Clean Architecture implementation in Node.js with TypeScript.