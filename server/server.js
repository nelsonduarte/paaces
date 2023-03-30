// Importar os módulos necessários
const express = require('express');
const userRoutes = require('./routes/users');
const orcidRoutes = require('./routes/orcidRoutes');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const mongoose = require('mongoose'); // Importa o mongoose para interagir com o MongoDB

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta na qual o aplicativo irá rodar
const PORT = process.env.PORT;

// Define uma rota simples para a raiz do aplicativo
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Middleware para analisar as solicitações JSON
app.use(express.json());

// Define as rotas para os recursos de usuário e ORCID
app.use('/users', userRoutes);
app.use('/orcid', orcidRoutes);

// Conecta-se ao banco de dados MongoDB Atlas usando a URI fornecida no arquivo .env
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas')) // Se a conexão for bem-sucedida, registra uma mensagem no console
    .catch((err) => console.error('Failed to connect to MongoDB Atlas:', err)); // Se a conexão falhar, registra o erro no console

// Inicia o servidor para ouvir solicitações na porta especificada
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
