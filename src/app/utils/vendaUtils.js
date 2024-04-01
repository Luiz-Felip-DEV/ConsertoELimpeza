import userUtils from "./userUtils.js";

class vendaUtils {
  /**
   *
   * @array dados
   * retorna um valor em real
   * @returns
   */
  async validatePayment(tipoPagamento) {
    const arrTipoPagamento = ["PIX", "CARTAO", "DINHEIRO"];
    let verify = true;

    arrTipoPagamento.forEach(function (elemento) {
      if (tipoPagamento.toUpperCase() == elemento) {
        verify = false;
      }
    });

    return verify;
  }

  /**
   *
   * @array dados
   * monta o array para o update
   * @returns
   */
  async setSale(dados) {
    if (await this.validatePayment(dados.tipo_pagamento)) {
      return [];
    }

    const tipoPamento = dados.tipo_pagamento ? dados.tipo_pagamento.toUpperCase() : "";
    const quantidade  = dados.quantidade     ? dados.quantidade                   : 0;
    const produtoId   = dados.id_product     ? dados.id_product                   : "";

    // type -> PIX, CARTAO, DINHEIRO

    const arrDados = { tipo_pagamento: tipoPamento, quantidade: quantidade, produto_id: produtoId };

    return arrDados;
  }
}

export default new vendaUtils();
