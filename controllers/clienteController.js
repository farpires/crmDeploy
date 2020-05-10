const Clientes = require('../models/Clientes');

//agrega un nuevo cliente
exports.nuevoCliente= async (req,res,next)=>{
    const cliente = new Clientes(req.body);
    try {
        //almacenando el registro
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'})
    } catch (error) {
        //si hay un error, console       
        res.send(error);
        next();//esto es para la aplicacion no se detenga y que se valla al siguiente middelwer   
    }
};

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}


//Muestra un cliente por su ID

exports.mostrarCliente = async(req,res,next)=>{
    const cliente = await Clientes.findById(req.params.idCliente);
    if(!cliente){
        res.json({mensaje: 'Ese Cliente mo existe'});
        next();
    }
    res.json(cliente);
}


//Actuaizar cliente 
exports.actualizarCliente = async(req,res,next)=>{
    try {
        const cliente = await Clientes.findOneAndUpdate({_id: req.params.idCliente},req.body, {
            // Mongoo: alamacena el valor previo y lo que viene siendo el valor nuevo /
            new : true  //en este parte decimos que nos traiga el nuevo 
        });
        res.json(cliente);
    } catch (error) {
        res.send(error)
        next();
    }
}

//cliente controler 
exports.eliminarCliente = async(req,res,next)=>{
    try {
        await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'el cliente fue eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}