import express from "express";
import { db } from "./config/index.js";
import { authRouter } from './routes/index.js';

const app = express();

// Conectando la BD
try {
    await db.authenticate();
    await db.sync(); // Crea las tablas necesarias.
    console.log("Conexión correcta a la base de datos");
} catch(error) {
    console.error(`Error conectando a la base de datos ${error}`);
}

// Habilitando Pug
app.set("view engine", "pug");

// Configurando la carpeta de vistas para que se fije directamente en ella al usar el método render
app.set("views", "./views");

// Configurando la carpeta public para añadir archivos estáticos
app.use(express.static("public"))

// Habilitando la lectura de los request
app.use(express.urlencoded({extended: true}));

// Le damos un prefijo a nuestras rutas de authRouter.
app.use("/auth", authRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`)
});

/* MVC

Modelo - Encargado de todas las interacciones en BD.

Vista - Encargado de todo lo que se ve en pantalla

Controlador - Es la función que acompaña a cada ruta y realiza las llamadas a Modelos y Vistas.

*/ 