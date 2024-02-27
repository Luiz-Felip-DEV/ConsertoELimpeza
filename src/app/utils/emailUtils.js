import 'dotenv/config';
import nodemailer from 'nodemailer';

class emailUtils {

    async emailConnection()
    {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_EMAIL
            },
        });

        return transporter;
    }

    async htmlEmail(nome, codigo) 
    {
        const htmlBody = `<!DOCTYPE html>
                                <html lang="pt-br">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Recuperação de Senha</title>
                                </head>
                                <body>
                                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
                                        <h2 style="color: #333;">Olá, ${nome}</h2>
                                        <p style="color: #555;">Aqui está o código para resetar a senha:</p>
                                        <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin-bottom: 15px; border: 1px solid #ccc; text-align: center;">
                                            <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: Consolas, monospace; font-size: 14px; color: #333; margin: 0; font-weight: bold;">${codigo}</pre>
                                        </div>
                                        <p style="color: #555;">Espero que isso te ajude!</p>
                                        <p style="color: #555;">Atenciosamente,</p>
                                        <p style="color: #555; font-weight: bold;">Sua equipe</p>
                                    </div>
                                </body>
                                </html>        
                                        `

        return htmlBody;
    }

    async confirmEmail(nome)
    {
        const hmtlBody = `<!DOCTYPE html>
                                <html lang="pt-br">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Confirmação de Alteração de Senha</title>
                                </head>
                                <body>
                                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
                                        <h2 style="color: #333;">Olá, ${nome}</h2>
                                        <p style="color: #555;">Sua senha foi alterada com sucesso.</p>
                                        <p style="color: #555;">Se você realizou essa alteração, pode ignorar este e-mail.</p>
                                        <p style="color: #555;">Caso contrário, entre em contato conosco imediatamente.</p>
                                        <p style="color: #555;">Atenciosamente,</p>
                                        <p style="color: #555; font-weight: bold;">Sua equipe</p>
                                    </div>
                                </body>
                                </html>
                            `
        return hmtlBody;
    }
}

export default new emailUtils();

