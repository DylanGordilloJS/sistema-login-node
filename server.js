const express = require('express');
const cors = require('cors');

// Importamos la función del modelo de usuario
const { registrarUsuario,loginUsuario } = require('./model/RT_Usuario/query_db_us');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta (Endpoint) para el registro que se conecta con el modelo
app.post('/CRTUSUO', (req, res) => {
    const { nombre, email, password } = req.body;

    // Validación básica
    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Llamamos a la función del modelo
    registrarUsuario(nombre, email, password, (err, resultado) => {
        if (err) {
            // Si el correo ya está registrado
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Este correo electrónico ya está registrado.' });
            }
            console.error('Error al registrar:', err);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }

        res.status(201).json({
            mensaje: '¡Usuario registrado exitosamente en la base de datos!',
            id_usuario: resultado.insertId
        });
    });
});

// Iniciar servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
        return res.status(400).json({ error: 'Por favor completa todos los campos.' });
    }

    // Llamamos a la función de login del modelo
    loginUsuario(email, password, (err, resultado) => {
        if (err) {
            console.error('Error en el servidor:', err);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }

        if (!resultado.exito) {
            // Si el correo no existe o la contraseña falla
            return res.status(401).json({ error: resultado.mensaje });
        }

        // Si todo sale bien
        res.status(200).json({
            mensaje: resultado.mensaje,
            usuario: resultado.usuario
        });
    });
});