const express = require('express');

const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//middlewer para proteger la rutas
const auth = require('../middleware/auth');


module.exports = function(){

   //Agrega nuevo clintes via POST
      router.post('/clientes',
            auth,
            clienteController.nuevoCliente
      );

    // Obtener todos los clientes
      router.get('/clientes', 
            auth,
            clienteController.mostrarClientes
      );
    //Mostrar un cliente en especifico (ID)
      router.get('/clientes/:idCliente',
            auth,
            clienteController.mostrarCliente
      );

    //Actualizar  cliente 
      router.put('/clientes/:idCliente',
            auth,
            clienteController.actualizarCliente
      );

   //Eliminar cliente
      router.delete('/clientes/:idCliente',
            auth,
            clienteController.eliminarCliente
      );

/** PRODUCTOS **/
   //Agregar nuevos productos 
      router.post('/productos',
            auth,
            productoController.subirarchivo,      
            productoController.nuevoProducto
      );

   //Mostrar Productos
      router.get('/productos',
            auth,      
            productoController.mostrarProductos
      );

   //Muestra un producto :id
      router.get('/productos/:idProducto',
            auth,
            productoController.mostrarProducto
      ); 
   //Actualizar Productos 
      router.put('/productos/:idProducto', 
            auth,
            productoController.subirarchivo,//Midelwer, si alguien quiere cambiar las imagenes 
            productoController.actualizarProducto
      )
   //Eliminar Producto
      router.delete('/productos/:idProducto',
            auth,
            productoController.eliminarProduto
      ); 
      //Busqueda de Producto 
      router.post('/productos/busqueda/:query',
            auth,
            productoController.buscarProducto  
      );

/*PEDIDOS */
//Agrgar nuevo pedido
      router.post('/pedidos/nuevo/:idUsuario',
            auth,
            pedidosController.nuevoPedido
      ); 
//Mostrar Pedido
      router.get('/pedidos',
            auth,      
            pedidosController.mostrarPedidos
      );
//Mostrar un pedido por ID
      router.get('/pedidos/:idPedido',
            auth,
            pedidosController.mostrarpedido
      );
//Actualizar pedidos
      router.put('/pedidos/:idPedido', 
            auth,
            pedidosController.actualizarPedido
      );
//Eliminar un pedido
      router.delete('/pedidos/:idPedido',
            auth,
            pedidosController.eliminarPedido
      );

      /*USUARIO*/
      //crear cuenta
      router.post('/crear-cuenta',
            auth,
            usuariosController.registrarUsuario
      );
      //Iniciar Seccion
      router.post('/iniciar-sesion',
            usuariosController.autenticarUsuario
      );


    return router;  
}