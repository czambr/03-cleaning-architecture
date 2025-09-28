# Node Auth - Clean Architecture

Este proyecto implementa autenticación de usuarios en Node.js siguiendo los principios de Clean Architecture.

## Características

- Registro y autenticación de usuarios
- Separación de capas (domain, infrastructure, presentation)
- Uso de JWT para autenticación
- Validación de datos con DTOs
- Hash de contraseñas con bcrypt
- Base de datos MongoDB con Mongoose

## Tecnologías

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Superset de JavaScript con tipado estático
- **Express** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - JSON Web Tokens para autenticación
- **bcryptjs** - Librería para hash de contraseñas
- **Docker** - Containerización para MongoDB

## Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Docker y Docker Compose (para la base de datos)

## Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/czambr/03-cleaning-architecture.git
   cd node-auth
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   PORT=3000
   MONGO_URL=mongodb://mongo-user:123456@localhost:27017
   MONGO_DB_NAME=auth-db
   JWT_PRIVATE_SEED=tu-jwt-secret-key-muy-segura
   ```

4. **Levanta la base de datos MongoDB**
   ```bash
   docker-compose up -d
   ```

## Uso

### Desarrollo
Para ejecutar el proyecto en modo desarrollo con hot reload:
```bash
npm run dev
```

### Producción
Para compilar y ejecutar en modo producción:
```bash
npm run build
npm start
```

El servidor estará disponible en `http://localhost:3000`.

## API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/` | Obtener usuarios | Sí (JWT) |

### Ejemplos de uso

**Registrar usuario:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "contraseña123"
  }'
```

**Iniciar sesión:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "contraseña123"
  }'
```

**Obtener usuarios (requiere token):**
```bash
curl -X GET http://localhost:3000/api/auth/ \
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

## Estructura del Proyecto

El proyecto sigue los principios de Clean Architecture con la siguiente estructura:

```
src/
├── app.ts                    # Punto de entrada de la aplicación
├── config/                   # Configuraciones (envs, jwt, bcrypt, validators)
├── data/                     # Capa de datos
│   └── mongodb/             # Implementación MongoDB
├── domain/                   # Capa de dominio (reglas de negocio)
│   ├── datasources/         # Interfaces de fuentes de datos
│   ├── dtos/                # Data Transfer Objects
│   ├── entities/            # Entidades del dominio
│   ├── errors/              # Errores personalizados
│   ├── repositories/        # Interfaces de repositorios
│   └── use-cases/           # Casos de uso
├── infrastructure/          # Capa de infraestructura
│   ├── datasources/         # Implementaciones de datasources
│   ├── mappers/             # Mappers entre entidades y modelos
│   └── repositories/        # Implementaciones de repositorios
└── presentation/            # Capa de presentación
    ├── auth/                # Controladores y rutas de auth
    ├── middlewares/         # Middlewares (autenticación, etc.)
    ├── routes.ts            # Rutas principales
    └─�� server.ts             # Configuración del servidor Express
```

### Principios de Clean Architecture

- **Domain**: Contiene las reglas de negocio y entidades principales
- **Infrastructure**: Implementaciones concretas (base de datos, APIs externas)
- **Presentation**: Manejo de HTTP, controladores y middlewares
- **Dependencies**: Las dependencias apuntan hacia el dominio (inversión de dependencias)

## Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `npm run dev` | Ejecuta con hot reload usando ts-node-dev |
| Build | `npm run build` | Compila TypeScript a JavaScript |
| Start | `npm start` | Ejecuta la versión compilada |
| Test | `npm test` | Ejecuta las pruebas (por configurar) |

## Troubleshooting

### Problemas comunes

**Error de conexión a MongoDB:**
- Asegúrate de que Docker esté ejecutándose
- Verifica que el contenedor de MongoDB esté activo: `docker-compose ps`
- Revisa la URL de MongoDB en el archivo `.env`

**Error de variables de entorno:**
- Verifica que el archivo `.env` exista en la raíz del proyecto
- Asegúrate de que todas las variables requeridas estén definidas

**Puerto ya en uso:**
- Cambia el puerto en el archivo `.env`
- O termina el proceso que esté usando el puerto: `lsof -ti:3000 | xargs kill` (macOS/Linux)

### Comandos útiles

**Ver registros de MongoDB:**
```bash
docker-compose logs mongo-db
```

**Reiniciar servicios de Docker:**
```bash
docker-compose down
docker-compose up -d
```

**Limpiar y reinstalar dependencias:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Características de la Implementación

### Clean Architecture

Este proyecto implementa los principios fundamentales de Clean Architecture:

1. **Separación de responsabilidades**: Cada capa tiene una responsabilidad específica
2. **Inversión de dependencias**: Las capas externas dependen de las internas
3. **Independencia de frameworks**: El dominio no depende de Express o MongoDB
4. **Testabilidad**: Las interfaces permiten fácil mocking para pruebas

### Patrones implementados

- **Repository Pattern**: Abstrae el acceso a datos
- **Dependency Injection**: Inyección manual de dependencias
- **DTO Pattern**: Validación y transferencia de datos
- **Use Cases**: Encapsulan la lógica de negocio
- **Middleware Pattern**: Para autenticación y validación

## Próximas mejoras

- [ ] Implementar pruebas unitarias e integración
- [ ] Agregar validación de esquemas con Joi o Zod
- [ ] Implementar refresh tokens
- [ ] Agregar logging con Winston
- [ ] Dockerizar la aplicación completa
- [ ] Implementar rate limiting
- [ ] Agregar documentación con Swagger

## Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

MIT - Ver archivo LICENSE para más detalles

## Contacto

Proyecto creado con fines educativos para demostrar la implementación de Clean Architecture en Node.js con TypeScript.