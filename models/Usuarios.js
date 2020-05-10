const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosShema = new Schema({
    email:{
        type: String,
        unique: true,
        lowercase: true, //se almacena en Minuscula 
        trim: true,
    },
    nombre:{
        type: String,
        required: 'Agregar tu Nombre',

    },
    password:{
        type: String,
        required:true,
    }
});

module.exports = mongoose.model('Usuarios',usuariosShema);