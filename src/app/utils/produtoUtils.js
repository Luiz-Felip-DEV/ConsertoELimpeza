import userUtils from "./userUtils.js";

class produtoUtils {

    /**
     * 
     * @array dados 
     * retorna um valor em real
     * @returns 
     */
    async formatarReal(numero) {
        return numero.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
    }

    /**
     * 
     * @array dados 
     * monta o array para o update
     * @returns 
     */
    async setProduct(dados)
    {
        const nome     = (dados.nome)      ? await userUtils.formatarNome(dados.nome) : '';
        const valor    = (dados.valor)     ? await this.formatarReal(dados.valor)     : ''; 
        const type     = (dados.type)      ? dados.type                               : '';
        
        // type -> FRUTA, CARNE, PEIXE, LEGUMES, DERIVADO
 
        const arrDados = {nome: nome, valor: valor, type: type};

        return arrDados;
    }
}

export default new produtoUtils();