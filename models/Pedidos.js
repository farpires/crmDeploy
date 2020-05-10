const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes' 
    },
    pedido: [{
        producto: {//muestra camisa de angular
            type: Schema.ObjectId,
            ref:'Productos'
        },
        cantidad: Number //cuanta desea comprar el usuario
    }],
    total: {
        type: Number, 
    }

});
module.exports = mongoose.model('Pedidos',pedidosSchema);