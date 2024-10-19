<h1>Auth Default</h1>
<p>Auth Default é um projeto de backend em Node.js com TypeScript, que fornece uma solução de autenticação básica, incluindo o registro e a verificação de e-mails. O sistema permite a criação de usuários temporários, envia códigos de confirmação por e-mail, e realiza a ativação da conta através de um link de confirmação.</p>

<p>Este projeto serve como uma solução para evitar a necessidade de criar a autenticação do zero em projetos futuros. Ele pode ser facilmente integrado em novas aplicações, economizando tempo e esforço.</p>

<h2>Funcionalidades</h2>
<ul>
    <li>Registro de usuário com e-mail e senha</li>
    <li>Envio de código de confirmação para o e-mail</li>
    <li>Confirmação de registro via link enviado ao e-mail</li>
    <li>Envio de e-mail de confirmação após o registro ser confirmado</li>
</ul>

<h2>Arquitetura do Projeto</h2>
<pre>
prisma/
src/
  ├── containers/            # Instanciamento de useCases, repositórios e serviços
  ├── controllers/Auth       # Controladores relacionados à autenticação
  ├── DTOS/AuthDTO           # Definições de Data Transfer Objects para autenticação
  ├── interfaces/            # Interfaces utilizadas no projeto
  ├── middlewares/           # Middleware para validação de DTO
  ├── repositories/          # Repositórios para acesso aos dados
  ├── routes/                # Definição das rotas de API
  ├── services/              # Serviços compartilhados: Bcrypt, Email, Token, User
  ├── shared/                # Código compartilhado/utilitário
  ├── useCases/              # Casos de uso da aplicação
  └── utils/                 # Funções utilitárias
index.ts                     # Arquivo de entrada principal
</pre>

<h2>Dependências</h2>
<p>As principais dependências do projeto incluem:</p>
<ul>
    <li><strong>@prisma/client</strong> - ORM para acesso ao banco de dados</li>
    <li><strong>bcryptjs</strong> - Criptografia de senhas</li>
    <li><strong>class-validator</strong> - Validação de dados</li>
    <li><strong>dotenv</strong> - Gerenciamento de variáveis de ambiente</li>
    <li><strong>express</strong> - Framework para criação de servidores HTTP</li>
    <li><strong>jsonwebtoken</strong> - Geração e verificação de tokens JWT</li>
    <li><strong>nodemailer</strong> - Envio de e-mails</li>
</ul>

<h2>Configuração e Uso</h2>
<ol>
    <li>Clone o repositório:
        <pre><code>git clone https://github.com/ms-gustavo/auth-default.git</code></pre>
    </li>
    <li>Instale as dependências:
        <pre><code>npm install</code></pre>
    </li>
    <li>Configure as variáveis de ambiente no arquivo <code>.env</code>.</li>
    <li>Execute as migrações do banco de dados:
        <pre><code>npx prisma migrate dev</code></pre>
    </li>
    <li>Inicie o servidor:
        <pre><code>npm run dev</code></pre>
    </li>
</ol>

<h2>Testes Futuros</h2>
<p>Estão planejados a inclusão de testes, documentação e um front-end para proporcionar uma experiência de usuário completa e uma melhor integração no fluxo de trabalho de desenvolvimento.</p>
