import userUtils from "../utils/userUtils.js";

class produtoRequest {

    /**
     * 
     * @param req
     * @param res
     * @param next 
     * verifica se todos os parametros foram enviados
     * @returns 
     */
    setProduct(req, res, next)
    {
        let msg = '';

        if(!req.body.type) {
            msg = 'Parametro type é obrigatorio.'
        }  

        if(!req.body.valor) {
            msg = 'Parametro valor é obrigatorio.'
        }

        if(!req.body.nome) {
            msg = 'Parametro nome é obrigatorio.'
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
    deleteProduct(req, res, next)
    {
        let msg = '';

        if(!req.body.id_product) {
            msg = 'Parametro id_product é obrigatorio.'
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

export default new produtoRequest();