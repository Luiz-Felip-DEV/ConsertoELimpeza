class vendaRequest {
    /**
   *
   * @param req
   * @param res
   * @param next
   * verifica se todos os parametros foram enviados
   * @returns
   */
  setSale(req, res, next) {
    let msg        = "";
    const arrDados = req.body;

    for (let i = 0; i < arrDados.length; i++) {

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
}

export default new vendaRequest();