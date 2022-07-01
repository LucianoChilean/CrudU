const db      = require('../db/connection');
const express = require('express');
const cors    = require('cors');

class Server{

   constructor(){
       this._app  = express();
       this.port = '3000';

       this.paths = {
        usuarios:     '/api/usuarios',
        auth:         '/api/auth',
      
       };

       this.connectDB();
       this.middlewares();
       this.routes();

   }

   async connectDB(){
     try {
        await db.authenticate();
        await db.sync({force:true}); 
     }catch(e){
        console.log(e)
        throw new Error('error en conectar BD');
     }
    }

    middlewares(){
         //Cors
         this._app.use(cors());
         //Lectura del body
         this._app.use(express.json());
         //Ver express levantado
         this._app.use(express.static('public'));

    }

    routes(){

        this._app.use(this.paths.auth,require('../routes/auth'));
        this._app.use(this.paths.usuarios,require('../routes/usuarios'));


    }

    listen(){
        this._app.listen(this.port, ()=>{
                console.log('Servidor corriendo en el puerto ', this.port);
        })
    }


}


module.exports = Server; 