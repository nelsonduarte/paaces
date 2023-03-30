const express = require('express');
const userRoutes = require('./routes/users');
const orcidRoutes = require('./routes/orcidRoutes');
const cienciaVitaeRoutes = require('./routes/cienciaVitaeRoutes');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json()); // Para analisar pedidos de solicitação JSON

app.use('/users', userRoutes);
app.use('/orcid', orcidRoutes);
app.use('/api', cienciaVitaeRoutes);


mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Failed to connect to MongoDB Atlas:', err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
