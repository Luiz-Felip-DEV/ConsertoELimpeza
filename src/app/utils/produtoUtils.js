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
        if (await this.validateTypeProduct(dados.type)) {
            return [];
        }

        const nome     = (dados.nome)      ? await userUtils.formatarNome(dados.nome) : '';
        const valor    = (dados.valor)     ? await this.formatarReal(dados.valor)     : ''; 
        const type     = (dados.type)      ? dados.type.toUpperCase()                 : '';
        
        // type -> FRUTA, CARNE, PEIXE, LEGUMES, DERIVADO
 
        const arrDados = {nome: nome, valor: valor, type: type};

        return arrDados;    
    }

    /**
     * 
     * @array dados 
     * monta o array para o update
     * @returns 
     */
    async updateProduct(dados)
    {
        if (await this.validateTypeProduct(dados.type)) {
            return [];
        }

        const nome     = (dados.nome)      ? await userUtils.formatarNome(dados.nome) : '';
        const valor    = (dados.valor)     ? await this.formatarReal(dados.valor)     : ''; 
        const type     = (dados.type)      ? dados.type.toUpperCase()                 : '';
        
        // type -> FRUTA, CARNE, PEIXE, LEGUMES, DERIVADO
 
        const arrDados = {id: dados.id_product, nome: nome, valor: valor, type: type};

        return arrDados;    
    }

     /**
     * 
     * @array dados 
     * monta o array para o update
     * @returns 
     */
     async validateTypeProduct(type)
     {
        const types = ['FRUTA', 'CARNE', 'PEIXE', 'LEGUMES', 'DERIVADO'];
        let verify  = true;

        types.forEach(function(elemento) {
            if (type.toUpperCase() == elemento) {
                verify = false;
            }
          });

          return verify;
     }
}

export default new produtoUtils();