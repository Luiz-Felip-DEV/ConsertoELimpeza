import conexao from "../dataBase/conexao.js";

class produtoRepository {

    /**
     * 
     * @param {*} dados 
     * query para inserção de usuario
     * @returns 
     */
    async setProduct(dados)
    {
        const sql = 'INSERT INTO produtos SET ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,dados,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    } 

}

export default new produtoRepository();