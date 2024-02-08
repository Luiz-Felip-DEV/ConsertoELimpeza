import jwt from 'jsonwebtoken';
class Jwt {

    /**
     * 
     * @param id 
     * cria um token JWT
     * @returns 
     */
    createToken(id) {

        const secret         = process.env.SECRET;
        const tempoExpiracao = 4 * 60 * 60;

        const token = jwt.sign({
            id: id
        },
        secret,{ expiresIn: tempoExpiracao });

        return token;
    }

    /**
     * 
     * @param req
     * @param res
     * @param next 
     * verifica se o token JWT é válido
     * @returns 
     */
    checkToken(req, res, next) {

        const authHeader = req.headers['authorization'];
        const token      = authHeader && authHeader.split(" ")[1];
    
        if (!token) {

            return res.status(400).json({
                error: true,
                msgUser: "Token não encontrado",
                msgOriginal: "Token não encontrado"
            });
        }
    
        try {

            jwt.verify(token, process.env.SECRET);
            next();

        } catch(error) {

            const typeErro = error.message;
            let msg        = 'Token Expirado.';

            if (typeErro == "invalid signature")
            {
                msg = 'Token Invalido.';
            } 
        
            return res.status(400).json({
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }
    }
}

export default new Jwt();