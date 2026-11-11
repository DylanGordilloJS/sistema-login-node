const db = require('../../config/conexion'); // Importamos la conexión
const bcrypt = require('bcryptjs');         // Importamos bcrypt para hashear

// Función para registrar un usuario de forma segura
const registrarUsuario = (nombre, email, password, callback) => {
    
    // 1. Definimos qué tan seguro (cuántas rondas) será el cifrado
    const saltRounds = 10;

    // 2. Hasheamos la contraseña
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return callback(err, null);
        }

        // 3. Insertamos en la base de datos usando la contraseña cifrada (hashedPassword)
        const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
        
        db.execute(query, [nombre, email, hashedPassword], (err, resultado) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, resultado);
        });
    });
};

const loginUsuario  =  (email,password, callback)  => { 
const  query = "select * from usuarios  where email = ?";
db.execute(query, [email], (err,resultado) => {
    if(err){
        return callback(err, null);
    }

    if(resultado.length === 0 ){
        return callback(null, { exito: false, mensaje: 'El correo no está registrado.' });
    }
    const usuario = resultado[0];

    bcrypt.compare(password,usuario.password, (err,sonIguales) => {
        if (err) {
                return callback(err, null);
            }
        
            if (sonIguales) {
                // Contraseña correcta
                callback(null, { exito: true, mensaje: '¡Bienvenido de nuevo!', usuario: { nombre: usuario.nombre, email: usuario.email } });
            } else {
                // Contraseña incorrecta
                callback(null, { exito: false, mensaje: 'Contraseña incorrecta.' });
            }

    });
});
};

module.exports = {
    registrarUsuario,
    loginUsuario
};