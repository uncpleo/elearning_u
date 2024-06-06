import express from "express";
import cors from "cors";
import path from "path";
import mongoose, { mongo } from "mongoose";
import router from "./router";
import * as dotenv from "dotenv";
import { url } from "inspector";

dotenv.config()

//Conectar a la base de datos
mongoose.Promise = global.Promise

const dbUrl = "mongodb://localhost:27017/courses_udemy";
mongoose.connect(
    dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(mongoose => console.log("Conexion a la base de datos de MongoDB"))
.catch(err => console.log(err));

//Definir la instancia de express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public'))) //Localiza la carpeta
app.use('/api/', router)

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {console.log("Conexion exitosa al servidor en el puerto 3000")})