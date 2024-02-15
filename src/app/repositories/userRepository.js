import conexao from "../dataBase/conexao.js";

class userRepository {

    /**
     * 
     * @param email
     * @param senha 
     * query para login
     * @returns 
     */
    async setLogin(email, senha) {
        const sql = 'SELECT id, name, last_name, email, telefone,type FROM users WHERE email = ? AND password = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[email, senha],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    } 

    /**
     * 
     * @param {*} dados 
     * query para inserção de usuario
     * @returns 
     */
    async setUser(dados) {
        const sql = 'INSERT INTO users SET ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,dados,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    } 

    /**
     * 
     * @param cpf 
     * query para verificação de cpf
     * @returns 
     */
    async verifyCpf(cpf) {

        const sql = 'SELECT * FROM users WHERE cpf = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,cpf,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    /**
     * 
     * @param telefone 
     * query para verificação de telefone
     * @returns 
     */
    async verifyTelephone(telefone) {

        const sql = 'SELECT * FROM users WHERE telefone = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,telefone,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    /**
     * 
     * @param email 
     * query para verificação de email
     * @returns 
     */
    async verifyEmail(email) {

        const sql = 'SELECT * FROM users WHERE email = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,email,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    /**
     * 
     * @param arrDados
     * @param id 
     * query para atualização de dados do usuario
     * @returns 
     */
    async updateUser(arrDados, id) 
    {
        const sql = 'UPDATE users SET name = ?, last_name = ?, cpf = ?, telefone = ?, email = ?  WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[arrDados.name, arrDados.last_name, arrDados.cpf, arrDados.telefone, arrDados.email, id],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                // console.log(row);
                return resolve(row);
            });
        });
    }

    /**
     * 
     * @param id 
     * query para deleção de dados do usuario
     * @returns 
     */
    async deleteUser(id) 
    {
        const sql = 'DELETE FROM users WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,id,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    }

    async getDadosUser(id)
    {
        const sql = 'SELECT name, last_name, cpf, telefone, email FROM users WHERE id = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,id,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                // console.log(row);
                return resolve(row);
            });
        });
    }
}

export default new userRepository();