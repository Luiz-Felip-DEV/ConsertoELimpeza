import userUtils from "../utils/userUtils.js";

class userRequest {

    /**
     * 
     * @param req
     * @param res
     * @param next 
     * verifica se todos os parametros foram enviados
     * @returns 
     */
    setLogin(req,res, next)
    {
        let msg = '';

        if (!req.body.password) {
            msg = 'Parametro password é obrigatorio.'
        }

        if (!req.body.email) {
            msg = 'Parametro email é obrigatorio.'
        }

        if(msg) {
            return res.status(400).json({
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }

    /**
     * 
     * @param req
     * @param res
     * @param next 
     * verifica se todos os parametros foram enviados
     * @returns 
     */
    setUser(req, res, next)
    {
        let msg = '';

        if (!req.body.type) {
            msg = 'Parametro type é obrigatorio.'
        }

        if(!req.body.password) {
            msg = 'Parametro password é obrigatorio.'
        }

        if(!req.body.email) {
            msg = 'Parametro email é obrigatorio.'
        }

        if(!req.body.telefone) {
            msg = 'Parametro telefone é obrigatorio.'
        }

        if(!req.body.cpf) {
            msg = 'Parametro cpf é obrigatorio.'
        }

        if (!req.body.last_name) {
            msg = 'Parametro last_name é obrigatorio.'
        }

        if(!req.body.name) {
            msg = 'Parametro name é obrigatorio.'
        }

        if (req.body.email && !userUtils.emailValido(req.body.email)) {
            msg = 'Parametro email invalido.'   
        }

        if (msg) {  
            return res.status(400).json({   
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }

    /**
     * 
     * @param req
     * @param res
     * @param next 
     * verifica se todos os parametros foram enviados
     * @returns 
     */
    updateUser(req, res, next)
    {
        let msg = '';

        if(!req.body.email) {
            msg = 'Parametro email é obrigatorio.'
        }

        if(!req.body.telefone) {
            msg = 'Parametro telefone é obrigatorio.'
        }

        if(!req.body.cpf) {
            msg = 'Parametro cpf é obrigatorio.'
        }

        if (!req.body.last_name) {
            msg = 'Parametro last_name é obrigatorio.'
        }

        if(!req.body.name) {
            msg = 'Parametro name é obrigatorio.'
        }

        if (req.body.email && !userUtils.emailValido(req.body.email)) {
            msg = 'Parametro email invalido.'   
        }   

        if (msg) {  
            return res.status(400).json({   
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }

    /**
     * 
     * @param req
     * @param res
     * @param next 
     * verifica se todos os parametros foram enviados
     * @returns 
     */
    resetCode(req, res, next)
    {
        let msg = '';

        if(!req.query.email) {
            msg = 'Parametro email é obrigatorio.'
        } 
        
        if (req.body.email && !userUtils.emailValido(req.body.email)) {
            msg = 'Parametro email invalido.'   
        }   

        if (msg) {  
            return res.status(400).json({   
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }

    /**
     * 
     * @param req
     * @param res
     * @param next 
     * verifica se todos os parametros foram enviados
     * @returns 
     */
    updatePassword(req, res, next)
    {
        let msg = '';

        if(!req.body.email) {
            msg = 'Parametro email é obrigatorio.'
        }

        if(!req.body.new_password) {
            msg = 'Parametro new_password é obrigatorio.'
        }  

        if (msg) {  
            return res.status(400).json({   
                error: true,
                msgUser: msg,
                msgOriginal: msg
            });
        }

        next();
    }
}

export default new userRequest();