<h1>Auth Default</h1>
<p>Auth Default é um projeto de backend em Node.js com TypeScript, que fornece uma solução de autenticação básica, incluindo o registro e a verificação de e-mails. O sistema permite a criação de usuários temporários, envia códigos de confirmação por e-mail e realiza a ativação da conta através de um link de confirmação. Agora, o projeto também suporta autenticação OAuth2 com provedores externos, como Google e GitHub.</p>

<p>Este projeto serve como uma solução para evitar a necessidade de criar a autenticação do zero em projetos futuros. Ele pode ser facilmente integrado em novas aplicações, economizando tempo e esforço.</p>

<h2>Funcionalidades</h2>
<ul>
    <li>Registro de usuário com e-mail e senha</li>
    <li>Envio de código de confirmação para o e-mail</li>
    <li>Confirmação de registro via link enviado ao e-mail</li>
    <li>Envio de e-mail de confirmação após o registro ser confirmado</li>
    <li>Autenticação via OAuth2 com Google e GitHub</li>
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
  ├── services/              # Serviços compartilhados: Bcrypt, Email, Token, User, Passport
  ├── shared/                # Código compartilhado/utilitário
  ├── useCases/              # Casos de uso da aplicação
  ├── utils/                 # Funções utilitárias
  └── routes                 # Rotas de autenticação via OAuth
        └── AuthRoutes.ts
        └── ProviderRoutes.ts
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
    <li><strong>passport</strong> - Middleware para autenticação</li>
    <li><strong>passport-google-oauth20</strong> - Estratégia de autenticação OAuth2 para Google</li>
    <li><strong>passport-github2</strong> - Estratégia de autenticação OAuth2 para GitHub</li>
    <li><strong>express-session</strong> - Gerenciamento de sessões</li>
</ul>

<h2>Configuração e Uso</h2>
<ol>
    <li>Clone o repositório:
        <pre><code>git clone https://github.com/ms-gustavo/auth-default.git</code></pre>
    </li>
    <li>Instale as dependências:
        <pre><code>npm install</code></pre>
    </li>
    <li>Configure as variáveis de ambiente no arquivo <code>.env</code>, incluindo as credenciais para OAuth2:
        <pre><code>
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
        </code></pre>
    </li>
    <li>Execute a geração do prisma
        <pre><code>npx prisma generate</code></pre>
    </li>
    <li>Inicie o servidor:
        <pre><code>npm run dev</code></pre>
    </li>
</ol>

<h2>Autenticação OAuth2 com Google e GitHub</h2>
<p>Para configurar a autenticação via Google e GitHub, siga os passos abaixo:</p>

<h3>1. Configuração do Google</h3>
<ol>
    <li>Crie um novo projeto no <a href="https://console.developers.google.com/">Google Cloud Console</a>.</li>
    <li>Ative a API Google+ ou Google Identity Platform.</li>
    <li>Crie credenciais de OAuth2 e obtenha o <strong>Client ID</strong> e o <strong>Client Secret</strong>.</li>
    <li>Adicione o URI de redirecionamento autorizado, por exemplo, <code>http://localhost:3000/auth/google/callback</code>.</li>
</ol>

<h3>2. Configuração do GitHub</h3>
<ol>
    <li>Vá para <a href="https://github.com/settings/developers">GitHub Developer Settings</a> e crie um novo OAuth App.</li>
    <li>Preencha os detalhes do aplicativo e adicione o <strong>Callback URL</strong>, por exemplo, <code>http://localhost:3000/auth/github/callback</code>.</li>
    <li>Obtenha o <strong>Client ID</strong> e o <strong>Client Secret</strong> gerados.</li>
</ol>

<h3>3. Testando as Rotas OAuth2</h3>
<ul>
    <li>Acesse <code>http://localhost:3000/auth/google</code> para iniciar o fluxo de autenticação com o Google.</li>
    <li>Acesse <code>http://localhost:3000/auth/github</code> para iniciar o fluxo de autenticação com o GitHub.</li>
</ul>

<h2>Testes Futuros</h2>
<p>Estão planejados a inclusão de testes, documentação e um front-end para proporcionar uma experiência de usuário completa e uma melhor integração no fluxo de trabalho de desenvolvimento.</p>
