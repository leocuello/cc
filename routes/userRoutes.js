const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Mostrar todos los usuarios
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.render('users/index', { users });
});

// Mostrar el formulario de creación
router.get('/create', (req, res) => {
    res.render('users/create');
});

// Crear un nuevo usuario
router.post('/create', async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    res.redirect('/users');
});

// Mostrar un usuario por ID
router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.render('users/show', { user });
});

// Mostrar el formulario de edición
router.get('/:id/edit', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.render('users/edit', { user });
});

// Actualizar un usuario
router.post('/:id/edit', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);

    // Actualizar la contraseña solo si se proporciona
    const updatedData = {
        name,
        email
    };
    if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
    }

    await User.update(updatedData, {
        where: { id: req.params.id }
    });
    res.redirect('/users');
});

// Eliminar un usuario
router.post('/:id/delete', async (req, res) => {
    await User.destroy({
        where: { id: req.params.id }
    });
    res.redirect('/users');
});

module.exports = router;