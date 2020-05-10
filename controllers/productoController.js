const Productos = require('../models/Productos'); 

/*--IMAGEN---------------------------------------------------------------------------------------------------------- */
const multer = require('multer');
const shortid = require('shortid');

const ConfiguracionMulter = {

    storage: filteStorage = multer.diskStorage({
        destination: (req,file,cb)=>{
                cb(null,__dirname+'../../uploads/');//le desimos que se almacenara en uplate
        },
        filename: (req,file,cb)=>{
            const extension = file.mimetype.split('/')[1];
            cb(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true);
        }else{
            cb(new Error('Formato No valido'));
        }
    },
}
//pasar la configuracion y el campo 
const upload = multer(ConfiguracionMulter).single('imagen');

//sube un archivo 
exports.subirarchivo = (req,res,next)=>{
    upload(req,res, function(error){
        if(error){
            res.json({mensaje: error})
        }
        return next();
    })
}
/*-------------------------------------------------------------------------------------IMAGEN */
//agrega nuevos productos   
exports.nuevoProducto = async (req,res, next) => {
        const producto = new Productos(req.body);
    try {
        if(req.file.filename){                             /*------------------------para guaradr IMAGEN */ 
            producto.imagen = req.file.filename
        } 
        await producto.save();
        res.json({mensaje : 'Se agrego nuevo producto '})
        
    } catch (error) {
        console.log(error);
        next();
    } 
};

//Muestra todos los productos 
exports.mostrarProductos = async ( req,res,next)=>{
    try {
        //obtener todos los productos   
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra un producto en especifico con su ID
exports.mostrarProducto = async (req,res,next)=>{
    const producto = await Productos.findById(req.params.idProducto);
    if(!producto){
        res.json({mensaje: 'Ese Producto no existe'});
        return next();
    }
    //Mostrar el Producto
    res.json(producto); 
} 

//Actualizar un producto id
exports.actualizarProducto = async (req,res,next)=>{
    try {
        /*--IMG---------------------------------------------------------------------------- */
        let productoAnterior = await Productos.findById(req.params.idProducto);

        //Construir un nuevo producto
        let nuevoProducto = req.body;

        //Verificamos si hay una imagen nueva
        if(req.file){ //sis se subio unanueva imagen entonces 
            nuevoProducto.imagen = req.file.filename ;
        }else{
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        /*------------------------------------------------------------------------------------IMG--*/

        let producto = await Productos.findByIdAndUpdate({_id:req.params.idProducto},nuevoProducto,{
            new: true,
        });
        res.json(producto); 
    } catch (error) {
        console.log(error);
        next();
    }
}


//Elminiar Producto
exports.eliminarProduto = async (req,res,next)=>{
    try {
        await Productos.findByIdAndDelete({_id:req.params.idProducto})
        res.json({mensaje : 'El producto se a eliminado '})
    } catch (error) {
        console.log(error);
        next();
    }
}

//nuevo enpoint
exports.buscarProducto  = async (req,res,next)=>{
    try {
        //obtener el query
        const {query} = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query,'i')});
        res.json(producto); 
    } catch (error) {
       console.log(error);
       next(); 
    }
}