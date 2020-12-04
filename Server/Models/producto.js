const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Nombre del producto obligatorio']
    },
    precioU: {
        type: Number,
        required: [true, 'Precio requerido']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        required: [true, 'Categoria requerida'],
        ref: 'Categoria'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: [true, 'Usuario requerido'],
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Productos', productoSchema)