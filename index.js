const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const sequelize = require('./config/database');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Sincronizar la base de datos
sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.log('Error syncing database:', err);
});

// Rutas
app.use('/users', userRoutes);

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
