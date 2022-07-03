import { validateJWT } from "../utils/index.js";

export const protectRoute = async (req, res, next) => {

    // Verificando la existencia del token
    const { _jwt } = req.cookies;

    if (!_jwt) {
        return res.redirect("/auth/login")
    }

    try {

        const { id } = validateJWT(_jwt);
        // Consultamos la BD con el id
        
    } catch (error) {
        return res.clearCookie("_jwt").redirect("/auth/login");
    }

    // Comprobando el token

    next(); // Termina la ejecución del middleware al terminar el cuerpo de esta función
};

// Está función debemos importarla desde la routa que queremos proteger y colorcarla como segundo,
// del router (antes del controlador).