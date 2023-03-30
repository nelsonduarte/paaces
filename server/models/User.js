const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true,
        unique: true,
    },
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    funcao: {
        type: String,
        enum: ['Docente', 'Diretor de Curso', 'Administrador'],
        required: true,
    },
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
