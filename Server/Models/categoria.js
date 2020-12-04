const mongoose = require('mongoose');

let Schema = mongoose.Schema;
// Usuari, llave foranea (se relaciona con otra tabla)
let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descarpcion es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);