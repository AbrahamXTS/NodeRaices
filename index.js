import express from "express";
import { authRouter } from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

// Habilitando Pug
app.set("view engine", "pug");

// Configurando la carpeta de vistas para que se fije directamente en ella al usar el método render
app.set("views", "./views");

// Configurando la carpeta public para añadir archivos estáticos
app.use(express.static("public"))

// Le damos un prefijo a nuestras rutas de authRouter.
app.use("/auth", authRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
});

/* MVC

Modelo - Encargado de todas las interacciones en BD.

Vista - Encargado de todo lo que se ve en pantalla

Controlador - Es la función que acompaña a cada ruta y realiza las llamadas a Modelos y Vistas.

*/