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


    async getProducts()
    {
        const sql = 'SELECT id, nome, valor, type FROM produtos';

        return new Promise((resolve, reject) => {
            conexao.query(sql,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async deleteProduct(idProduct)
    {
        const sql = 'DELETE FROM produtos WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,idProduct,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async updateProduct(dados)
    {
        const sql = 'UPDATE produtos SET nome = ?, valor = ?, type = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[dados.nome, dados.valor, dados.type, dados.id],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }
}

export default new produtoRepository();