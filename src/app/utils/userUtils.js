import userRepository from "../repositories/userRepository.js";

class userUtils {

    /**
     * 
     * @param nome 
     * mascara para deixar as primeiras letras maisculas
     * @returns 
     */
    formatarNome(nome)
    {
        const arrNome = nome.split(' ');
        for (let i = 0; i < arrNome.length; i++) {
            arrNome[i] = arrNome[i].charAt(0).toUpperCase() + arrNome[i].slice(1);
        }

        return arrNome.join(' ');
    }

    /**
     * 
     * @param cpf 
     * mascara para cpf
     * @returns 
     */
    formatarCpf(cpf)
    {
        const cpfLimpo = cpf.replace(/\D/g, '');

        const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
        return cpfLimpo.replace(regex, '$1.$2.$3-$4');
    }

    /**
     * 
     * @param telefone 
     * mascara para telefone
     * @returns 
     */
    formatarTelefone(telefone)
    {
        const telefoneLimpo = telefone.replace(/\D/g, '');

        const regex = /^(\d{2})(\d{5})(\d{4})$/;
        return telefoneLimpo.replace(regex, '($1) $2-$3');
    }

    /**
     * 
     * @param email 
     * valida se um email é valido
     * @returns 
     */
    emailValido(email)
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * 
     * @param data
     * '2023-09-09 -> formato de entrada' 
     * @returns 
     */
    formatarData(data)
    {
        const date = new Date(data);
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const dia = String(date.getDate()).padStart(2, '0');
        return `${ano}/${mes}/${dia}`;
    }

    /**
     * 
     * @array dados 
     * monta um array de inserção de dados
     * @returns 
     */
    async setUser(dados)
    {
        const nome     = (dados.name)      ? this.formatarNome(dados.name)         : '';
        const lastName = (dados.last_name) ? this.formatarNome(dados.last_name)    : ''; 
        const cpf      = (dados.cpf)       ? this.formatarCpf(dados.cpf)           : '';
        const telefone = (dados.telefone)  ? this.formatarTelefone(dados.telefone) : '';
 
        const arrDados = {name: nome, last_name: lastName, cpf: cpf, telefone: telefone, email: dados.email, password: dados.password, type: dados.type.toUpperCase()};

        return arrDados;
    }

     /**
     * 
     * @param cpf 
     * verifica se já existe esse cpf na base de dados
     * @returns 
     */
    async verifyCpf(cpf)
    {
        let verify = false;

        try{
            const arrDados = await userRepository.verifyCpf(this.formatarCpf(cpf));

            verify = (arrDados[0]) ? true : false;
        }catch(e) {
            console.log(e.message);
        }

        return verify;
    }

    /**
     * 
     * @param telefone 
     * verifica se já existe esse telefone na base de dados
     * @returns 
     */
    async verifyTelephone(telefone)
    {
        let verify = false;

        try{
            const arrDados = await userRepository.verifyTelephone(this.formatarTelefone(telefone));

            verify = (arrDados[0]) ? true : false;
        }catch(e) {
            console.log(e.message);
        }

        return verify;
    }

    /**
     * 
     * @param email 
     * verifica se já existe esse email na base de dados
     * @returns 
     */
    async verifyEmail(email)
    {
        let verify = false;

        try{
            const arrDados = await userRepository.verifyEmail(email);

            verify = (arrDados[0]) ? true : false;
        }catch(e) {
            console.log(e.message);
        }

        return verify;
    }

    /**
     * 
     * @array dados 
     * monta o array para o update
     * @returns 
     */
    async updateUser(dados)
    {
        const nome     = (dados.name)      ? this.formatarNome(dados.name)         : '';
        const lastName = (dados.last_name) ? this.formatarNome(dados.last_name)    : ''; 
        const cpf      = (dados.cpf)       ? this.formatarCpf(dados.cpf)           : '';
        const telefone = (dados.telefone)  ? this.formatarTelefone(dados.telefone) : '';
 
        const arrDados = {name: nome, last_name: lastName, cpf: cpf, telefone: telefone, email: dados.email};

        return arrDados;
    }

    /**
     * 
     * @param mensagem
     * @param type
     * @param modo
     * @param userId 
     * monta o array para o cadastro de log
     * @returns 
     */
    async insertLog(mensagem, type, modo, userId)
    {
        const arrDados = {mensagem: mensagem, type: type, modo: modo, user_id: userId};

        return arrDados;
    }
}

export default new userUtils();