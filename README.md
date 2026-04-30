# 🐾 Sistema de Adopciones - API REST

API REST desarrollada en Node.js para la gestión de adopciones de mascotas.  
Permite administrar usuarios, mascotas y adopciones, implementando autenticación con JWT mediante cookies, testing automatizado y despliegue con Docker.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (autenticación middleware)
- JWT (autenticación con cookies)
- bcrypt
- Docker
- Mocha + Chai (unit testing)
- Swagger / OpenAPI (documentación de API REST)
- GitHub Actions

---

## 🧱 Arquitectura del proyecto

El proyecto sigue una arquitectura por capas bien definida:

```
src/
├── DAO/ # Acceso a datos
├── DTO/ # Transferencia de datos
├── config/ # Configuraciones
├── controllers/ # Manejo de requests/responses
├── error/ # Manejo de errores
├── middleware/ # Middlewares (auth, validaciones)
├── models/ # Esquemas de Mongoose
├── repositories/ # Abstracción de datos
├── routes/ # Endpoints
├── services/ # Lógica de negocio
├── tests/ # Tests de integración
├── app.js # Entry point
└── test.setup.js # Configuración de tests
```

---

## ⚙️ Instalación

```bash
git clone https://github.com/CesValde/Entrega_Final.git
cd Entrega_Final
npm install
```

---

### 🔧 Variables de entorno

Crear un archivo `.env`:

```
PORT=3000
MONGO_URI=tu_uri
JWT_SECRET=tu_secreto
COOKIE_SECRET=tu_secreto
```

---

## ▶️ Ejecución

`npm run dev`

---

## 🔐 Autenticación

El sistema utiliza JWT almacenado en cookies.

El token se envía automáticamente en cada request
No es necesario usar `Authorization: Bearer`
Las rutas protegidas validan la `cookie` mediante middleware

---

## 📡 Endpoints principales

### 🐶 Pets

- GET /api/pets
- GET /api/pets/:id
- POST /api/pets
- PUT /api/pets/:id
- DELETE /api/pets/:id

### 👤 Users

- GET /api/users
- GET /api/users/:id

### ❤️ Adoptions

- GET /api/adoptions
- GET /api/adoptions/:id
- POST /api/adoptions
- PUT /api/adoptions/:id

---

## 🧪 Testing

`npm test`

Incluye:

- Tests de endpoints
- Validación de errores (400 / 404)
- Flujo de adopciones
- Manejo de autenticación con cookies

---

## 🐳 Docker

### Build

`docker build -t entrega_final .`

### Run

`docker run -p 3000:3000 entrega_final`

---

## 🔄 CI/CD

Configurado con GitHub Actions para:

- Build automático
- Push a Docker Hub
- Integración continua en cada push a main

---

## 📦 Buenas prácticas aplicadas

- Arquitectura en capas (Controller / Service / Repository / DAO)
- Uso de DTOs
- Manejo centralizado de errores
- Separación de responsabilidades
- Testing automatizado

---

## 📌 Estado del proyecto

- ✔ Funcional
- ✔ Testeado
- ✔ Dockerizado
- ✔ CI/CD configurado

---

# Docker Image

La imagen del proyecto está disponible en Docker Hub:

👉 https://hub.docker.com/r/cesvalde/entrega_final

## Ejecutar con Docker

```bash
docker pull cesarvalderrama/entrega_final
docker run -p 8080:8080 cesarvalderrama/entrega_final
```

---

## 🧠 Si usas MongoDB (IMPORTANTE)

Si tu app usa Mongo local, en Docker necesitas:

### Usar Mongo Atlas

```env
MONGO_URL=your_mongo_atlas_connection_string
```

---

## 👨‍💻 Autor

- César Valderrama

- GitHub: https://github.com/CesValde
