import saleUtils from "../utils/vendaUtils.js";

class vendaRequest {
    /**
   *
   * @param req
   * @param res
   * @param next
   * verifica se todos os parametros foram enviados
   * @returns
   */
  async setSale(req, res, next) {

    let msg        = "";
    const arrDados = req.body;

    for (let i = 0; i < arrDados.length; i++) {

      const objVerify = await saleUtils.verifyQtd(arrDados[i].id_product, arrDados[i].quantidade);

      if (objVerify.error) {
        msg = "Quantidade de " + objVerify.name + " insuficiente no estoque";
      }
      
      if (!arrDados[i].id_product) {
        msg = "Parametro id_product é obrigatorio.";
      }

      if (!arrDados[i].quantidade) {
        msg = "Parametro quantidade é obrigatorio.";
      }

      if (!arrDados[i].tipo_pagamento) {
          msg = "Parametro tipo_pagamento é obrigatorio.";
      }

      if (msg) {
        return res.status(400).json({
          error: true,
          msgUser: msg,
          msgOriginal: msg,
        });
      }
    }

    next();
  }

  async purchaseValue(req, res, next)
  {
    let msg = '';

    if (!req.query.id_sale) {
      msg = "Parametro id_sale é obrigatorio.";
    }

    if (msg) {
      return res.status(400).json({
        error: true,
        msgUser: msg,
        msgOriginal: msg,
      });
    }

    next();
  }
}

export default new vendaRequest();