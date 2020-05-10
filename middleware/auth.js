const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    //autorizacion por el heder
    const authHeader = req.get('Authorization');
    console.log(authHeader)
    if(!authHeader){
        const error =  new Error('No autenticado,no hay JWT');
        error.statusCode = 401;
        throw error; //cuando mandas un throw error el codigo deja de ejecutarse
    }
    //obtener le token y verificarlos 
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token,'LLAVESECRETA')
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
    //  si es un token valido,pero hay algun error 
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }
    //si pasa la verificacion
    next();

}
