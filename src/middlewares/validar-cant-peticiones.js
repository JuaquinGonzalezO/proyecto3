import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,  
    message:{
        success: false,
        msg: "Demasiadas peticiones de esta IP, porfavor intente de  nuevo en 15 minutos"
    }
});

export default limiter;