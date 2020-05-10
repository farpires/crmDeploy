const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//crear nuevas cuenta
exports.registrarUsuario = async (req,res)=>{
    //leer los datos del usuario
    const usuario = new Usuarios(req.body); 
    usuario.password = await bcrypt.hash(req.body.password,10);
    try {
        await usuario.save();
        res.json({mensaje:'usuario creado Correctamente'});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error'});
    }
} 

//verificar para saber si exite el usuario
exports.autenticarUsuario = async (req,res,next) =>{
    //buscar el usuario                                                 conmongo buscare a ver si ese usuario existe o no
    const {email, password } = req.body;
    const usuario = await Usuarios.findOne({email});
    if(!usuario){
        //si el usuario no  existe
        await res.status(401).json({mensaje:'Ese usuario no Existe'});
        next();
    }else{

        //el usuario no Existe                                       verificar si el pasword es correcto 
        if(!bcrypt.compareSync(password,usuario.password)){
            //si el password es incorrecto 
            await res.status(401).json({mensaje:'Password Incorrecto'});
            next();
        }else{
             
            //password correcto firmar el token
            const token = jwt.sign({
                email : usuario.email,
                nombre : usuario.nombre,
                id: usuario._id
            },
            'LLAVESECRETA',
            {
                expiresIn : '5h'
            });
            //retornar el token
            res.json({token});
        }

    }

}