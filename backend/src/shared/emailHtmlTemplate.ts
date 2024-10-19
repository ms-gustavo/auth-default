import { HtmlTemplateProps } from "../interfaces/interface";

export function generateHtmlTemplate({
  service,
  userName,
  email,
  site,
}: HtmlTemplateProps): string {
  return `
     <div style="background-color: #333; padding: 20px; color: #fff; font-family: Arial, sans-serif; text-align: center;">
       <h2 style="color: #fff;">Cadastro realizado com sucesso</h2>
       <p>Olá, ${userName},</p>
       <p>Seu email foi cadastrado na plataforma ${service} e sua conta foi criada com sucesso. Agora você está pronto para aproveitar nossos serviços :)</p>
       <p><strong>Login:</strong> ${email}</p>
       <p><strong>Por motivos de segurança, não enviamos senhas pelos canais de contato.</p>
       <p>Faça já seu acesso em <a href="${site}" style="color: #4CAF50;">${site}</a></p>
     </div>
   `;
}
