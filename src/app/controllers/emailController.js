import emailUtils from "../utils/emailUtils.js";
import 'dotenv/config';

class emailController {

    async resetPassword(email, name)
    {
        const transporter  = await emailUtils.emailConnection();
        const codigo       = Math.floor(100000 + Math.random() * 900000);

        const htmlBody = await emailUtils.htmlEmail(name, codigo);

        try {
                
            transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Recuperação de Senha",
                html: htmlBody,
                text: `Obrigado por enviar o formulario de ajuda, SR(A) <strong>${'Luiz Felipe'}</strong>, Daqui alguns instantes você receberá um retorno!`
            });  
            
        } catch(error) {
            return false;
        }

        return codigo;
    }

    async confirmEmail(name, email)
    {
        const transporter  = await emailUtils.emailConnection();

        const htmlBody = await emailUtils.confirmEmail(name);

        try {
                
            transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Alteração de Senha",
                html: htmlBody,
                text: `Obrigado por enviar o formulario de ajuda, SR(A) <strong>${'Luiz Felipe'}</strong>, Daqui alguns instantes você receberá um retorno!`
            });  
            
        } catch(error) {
            return false;
        }

        return true;
    }
}

export default new emailController();