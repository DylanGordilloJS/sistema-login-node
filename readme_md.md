# 🚀 Sistema de Registro y Autenticación Modular (Node.js & MySQL)

Sistema backend robusto y seguro para el registro y el inicio de sesión de usuarios, construido bajo una **arquitectura modular por capas** con Node.js, Express, MySQL y cifrado de contraseñas mediante Bcrypt.

---

## 📂 Arquitectura del Proyecto

El proyecto está organizado de manera modular para separar responsabilidades y facilitar su mantenimiento:

```text
├── config/
│   └── conexion.js          # Conexión centralizada a la base de datos MySQL
├── model/
│   └── RT_Usuario/
│       └── query_db_us.js   # Lógica de datos, consultas SQL y cifrado de seguridad
├── server.js                # Servidor principal, rutas (endpoints) y manejo de peticiones
├── index.html               # Vista de Registro (Frontend)
├── login.html               # Vista de Login (Frontend)
└── package.json             # Dependencias y configuración del proyecto
```

---

## 🛠️ Tecnologías y Librerías Utilizadas

* **Node.js**: Entorno de ejecución para JavaScript en el servidor.
* **Express**: Framework minimalista para crear el servidor web y manejar rutas HTTP.
* **MySQL2**: Conector rápido y eficiente para interactuar con bases de datos MySQL mediante consultas parametrizadas (prevención de Inyección SQL).
* **Bcryptjs**: Librería para el cifrado seguro de contraseñas con hashes (hashing y comparación segura).
* **CORS**: Middleware para permitir la comunicación segura entre el frontend y el backend.

---

## ⚙️ Características Principales

1. **Registro Seguro:** Las contraseñas nunca se guardan en texto plano; se procesan con `bcrypt.hash()` antes de ser almacenadas en la base de datos.
2. **Autenticación (Login):** Compara de forma segura la contraseña ingresada con el hash guardado utilizando `bcrypt.compare()`.
3. **Manejo de Errores HTTP:** Respuestas claras y controladas (`200 OK`, `400 Bad Request`, `401 Unauthorized`, `500 Internal Server Error`).
4. **Consultas Parametrizadas:** Protección avanzada contra ataques de Inyección SQL.

---

## 📋 Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (versión LTS recomendada)
* Un servidor de MySQL local (como XAMPP, WampServer o MySQL Workbench)

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para clonar y ejecutar el proyecto en tu computadora local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/nombre-de-tu-repositorio.git
cd nombre-de-tu-repositorio
```

### 2. Instalar las dependencias
Ejecuta el siguiente comando en la terminal para instalar Express, MySQL2 y Bcryptjs:
```bash
npm install
```

### 3. Configurar la Base de Datos en MySQL
Crea una base de datos y la tabla correspondiente ejecutando las siguientes sentencias SQL en tu gestor de base de datos:

```sql
CREATE DATABASE pru_test;

USE pru_test;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

### 4. Configurar las credenciales de conexión
Abre el archivo `config/conexion.js` y asegúrate de que los datos de tu servidor MySQL sean correctos (`host`, `user`, `password`, `database`).

### 5. Iniciar el servidor
Ejecuta el servidor con Node.js:
```bash
node server.js
```
O si prefieres que se reinicie automáticamente con cada cambio usando Nodemon:
```bash
npx nodemon server.js
```

El servidor se iniciará en `http://localhost:3000`.

---

## 👨‍💻 Autor
Desarrollado como proyecto de práctica y profesionalización en el desarrollo backend.