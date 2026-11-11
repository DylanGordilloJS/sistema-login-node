const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        
    password: '',        
    database: 'pru_test'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar a MySQL:', err);
        return;
    }
    console.log('✅ Conectado exitosamente a la base de datos MySQL.');
}
)

module.exports = db;