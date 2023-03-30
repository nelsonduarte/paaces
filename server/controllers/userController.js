// Importa o modelo User
const User = require('../models/User');

// Função assíncrona para obter todos os utilizadores
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // pPsquisa todos os utilizadores no banco de dados
        res.json(users); // Retorna os utilizadores encontrados em formato JSON
    } catch (err) {
        res.status(500).json({ message: err.message }); // Retorna um erro caso a pesquisa falhe
    }
};

// Função assíncrona para criar um novo utilizador
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body); // Cria uma nova instância do modelo User com os dados da requisição
        const user = await newUser.save(); // Salva o novo utilizador no banco de dados
        res.status(201).json(user); // Retorna o utilizador criado com um status 201 (Created)
    } catch (err) {
        res.status(400).json({ message: err.message }); // Retorna um erro caso a criação falhe
    }
};

// Função assíncrona para atualizar um utilizador existente
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Pesquisa o utilizador pelo ID fornecido nos parâmetros da requisição
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Retorna um erro caso o utilizador não seja encontrado
        }
        Object.assign(user, req.body); // Atualiza o objeto user com os novos dados da requisição
        const updatedUser = await user.save(); // Salva o utilizador atualizado no banco de dados
        res.json(updatedUser); // Retorna o utilizador atualizado em formato JSON
    } catch (err) {
        res.status(400).json({ message: err.message }); // Retorna um erro caso a atualização falhe
    }
};

// Define uma função assíncrona para excluir um utilizador existente
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilizador não encontrado' });
        }
        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'Utilizador eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Define uma função assíncrona para obter um utilizador pelo ID
const getUserById = async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilizador não encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
};

// Exporta as funções para serem utilizadas noutros ficheiros
module.exports = { getUsers, createUser, updateUser, deleteUser, getUserById };
