import productRepository from "../repositories/produtoRepository.js";
import saleRepository from "../repositories/vendaRepository.js";
import saleUtils from "../utils/vendaUtils.js";
import productUtils from "../utils/produtoUtils.js";

class vendaController {

  async setSale(req, res)
  {
    const idCompra     = await saleUtils.idSale();
    const arrItensComp = req.body;

    for (let i = 0; i < arrItensComp.length; i++) {
      req.body[i].id_sale = idCompra;

      const idProduto  = arrItensComp[i].id_product;
      const quantidade = arrItensComp[i].quantidade;
      
      let arrSetDados = [];
      let verifySet   = false;

      try {
          arrSetDados = await saleUtils.setSale(req.body[i]);
          verifySet   = (!arrSetDados.tipo_pagamento) ? true : false;
      } catch(e) {
          return res.status(400).json({
              error: true,
              msgUser: "Erro ao validar tipo de pagamento.",
              msgOriginal: "Erro ao validar tipo de pagamento, " + e.message + ".",
            });
      }

      if (verifySet) {
          return res.status(400).json({
              error: true,
              msgUser: "Tipo de pagamento invalido, tipos aceitos: PIX, CARTAO, DINHEIRO.",
              msgOriginal: "Tipo de pagamento invalido"
            });
      }

      let setSaleH = [];
      let verifyH = false;

      try {
          setSaleH = await saleRepository.setVenda(arrSetDados);
          verifyH  = (setSaleH.affectedRows != 1) ? true : false;
      }catch(e) {
          return res.status(400).json({
              error: true,
              msgUser: "Erro ao tentar cadastrar venda, Tente Novamente mais tarde.",
              msgOriginal: "Erro ao tentar cadastrar venda, " + e.message
            });
      }

      if (verifyH) {
          return res.status(400).json({
              error: true,
              msgUser: "Erro ao tentar cadastrar venda, Tente Novamente mais tarde.",
              msgOriginal: "Erro ao tentar cadastrar venda, verifyH retornou vazio."
            });
      }

      let arrDados = [];

      try {
        arrDados = await productRepository.getQtd(idProduto);
      } catch (e) {
        return res.status(400).json({
          error: true,
          msgUser: "Quantidade de produto insuficiente.",
          msgOriginal: "Erro ao buscar quantidade de produto, " + e.message + ".",
        });
      }

      if (!arrDados[0]) {
        return res.status(400).json({
          error: true,
          msgUser: "Produto não encontrado.",
          msgOriginal: "Produto não encontrado",
        });
      }

      const qtdProduct = arrDados[0].quantidade;

      const putQtd = qtdProduct - quantidade;
      let arrPut   = [];
      let verify   = false;

      try {
        arrPut = await productRepository.putQtd(idProduto, putQtd);
        verify = arrPut.affectedRows != 1 ? true : false;
      } catch (e) {
        return res.status(400).json({
          error: true,
          msgUser: "Erro ao atualizar quantidade de produto.",
          msgOriginal: "Erro ao atualizar quantidade de produto.",
        });
      }

      if (verify) {
        return res.status(400).json({
          error: true,
          msgUser: "Produto não encontrado.",
          msgOriginal: "Erro ao atualizar quantidade de produto.",
        });
      }
    }

    return res.status(200).json({
      error: false,
      msgUser: "Produtos atualizado com sucesso.",
      msgOriginal: "Erro ao atualizar quantidade de produto.",
    }); 
  }

  async purchaseValue(req, res)
  {
    const idSale  = req.query.id_sale;
    let arraySale = []; 
    let verify    = false;

    try {
      arraySale = await saleRepository.purchaseValue(idSale);
      verify    = (!arraySale[0]) ? true : false;
    } catch (e) {
      return res.status(400).json({
        error: true,
        msgUser: "Erro ao trazer produtos.",
        msgOriginal: "Erro ao trazer produtos.",
      });
    }

    if (verify) {
      return res.status(400).json({
        error: true,
        msgUser: "Compra não encontrada.",
        msgOriginal: "Compra não encontrada.",
      });
    }

    let valorFinal  = 0;

    for (let i = 0; i < arraySale.length; i++) {
      valorFinal = valorFinal + arraySale[i].valor;
      arraySale[i].valor = await productUtils.formatarReal(arraySale[i].valor);
    }

    valorFinal = await productUtils.formatarReal(valorFinal);

    return res.status(200).json({
      error: false,
      msgUser: null,
      msgOriginal: null,
      valorTotal: valorFinal,
      produtos: arraySale
    });
  }
}

export default new vendaController();