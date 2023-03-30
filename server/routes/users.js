const express = require('express');
const router = express.Router();
// const User = require('../models/User');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');


router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);




module.exports = router;
