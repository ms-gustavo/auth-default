<h1>Projeto Auth-Default</h1>
    <p><strong>Auth-Default</strong> é uma solução completa de autenticação, incluindo backend em Node.js com TypeScript e frontend em React. O sistema oferece funcionalidades essenciais para registro e autenticação de usuários, verificação de e-mails, autenticação OAuth2 via Google e GitHub, e proteção de rotas com tokens JWT.</p>

<h2>Visão Geral</h2>
    <p>O projeto é organizado em um repositório unificado com duas partes principais:</p>
    <ul>
      <li><strong>Backend:</strong> Localizado em <code>/backend</code>, fornece a API para autenticação e gerenciamento de usuários.</li>
      <li><strong>Frontend:</strong> Localizado em <code>/frontend</code>, fornece a interface de usuário para o sistema de autenticação.</li>
    </ul>
     <p>O <strong>backend</strong> foi desenvolvido para ser uma solução robusta para gerenciar a autenticação de usuários, incluindo:</p>
    <ul>
      <li>Registro de usuários com e-mail e senha, incluindo envio de código de confirmação.</li>
      <li>Verificação e ativação de conta através de link de confirmação.</li>
      <li>Autenticação com OAuth2 utilizando provedores externos, como Google e GitHub.</li>
    </ul>
    <p>O <strong>frontend</strong> é uma interface de usuário moderna que facilita o acesso e a interação com o sistema de autenticação, suportando:</p>
    <ul>
      <li>Login e registro com formulários validados.</li>
      <li>Autenticação via provedores externos (Google e GitHub).</li>
      <li>Proteção de rotas utilizando token JWT armazenado em <code>localStorage</code>.</li>
      <li>Feedback ao usuário com mensagens de sucesso ou erro, usando <code>toast</code>.</li>
    </ul>

 <h2>Captura de Tela</h2>
    <img src="https://github.com/user-attachments/assets/759e7897-35aa-49d5-a188-6d0ad6b83b26" alt="Captura de Tela do Projeto">

 <h2>Arquitetura do Backend</h2>
    <pre>
/backend
  prisma/
  src/
    ├── containers/          # Instanciação de useCases, repositórios e serviços
    ├── controllers/Auth     # Controladores de autenticação
    ├── DTOS/AuthDTO         # Data Transfer Objects para autenticação
    ├── middlewares/         # Middleware para validação de dados
    ├── repositories/        # Repositórios de acesso a dados
    ├── services/            # Serviços como Bcrypt, Email, Token, User
    ├── routes/              # Definição das rotas da API
    ├── useCases/            # Casos de uso
    └── utils/               # Funções utilitárias
  index.ts                   # Arquivo principal de entrada
    </pre>

 <h2>Arquitetura do Frontend</h2>
    <pre>
/frontend
  src/
    ├── assets/              # Arquivos estáticos como imagens e ícones
    ├── components/          # Componentes reutilizáveis da interface
    ├── contexts/            # Contextos para gerenciamento de estado, como autenticação
    ├── interfaces/          # Tipos TypeScript para o projeto
    ├── pages/               # Páginas do aplicativo
    ├── utils/               # Funções utilitárias
    ├── App.tsx              # Componente principal do aplicativo
    ├── index.css            # Arquivo de estilos globais
    ├── main.tsx             # Arquivo de entrada principal do React
    └── vite-env.d.ts        # Configurações do Vite para TypeScript
    </pre>

 <h2>Configuração</h2>
    <h3>Backend</h3>
    <p>Siga os passos abaixo para configurar o backend:</p>
    <ol>
      <li>Clone o repositório:
        <pre><code>git clone https://github.com/ms-gustavo/auth-default.git</code></pre>
      </li>
      <li>Navegue para o diretório <code>/backend</code> e instale as dependências:
        <pre><code>cd backend && npm install</code></pre>
      </li>
      <li>Configure as variáveis de ambiente no arquivo <code>.env</code>:
        <pre><code>
DATABASE_URL=
PORT=
EMAIL_USER=
EMAIL_PASS=
EMAIL_SERVICE=
CONFIRMATION_URL=
JWT_SECRET=
SECRET_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
        </code></pre>
      </li>
      <li>Execute a geração do prisma:
        <pre><code>npx prisma generate</code></pre>
      </li>
      <li>Inicie o servidor:
        <pre><code>npm run dev</code></pre>
      </li>
    </ol>

<h3>Frontend</h3>
    <p>Siga os passos abaixo para configurar o frontend:</p>
    <ol>
      <li>Navegue para o diretório <code>/frontend</code> e instale as dependências:
        <pre><code>cd frontend && npm install</code></pre>
      </li>
      <li>Configure o arquivo <code>.env</code>:
        <pre><code>REACT_APP_API_BASE_URL=http://localhost:3000</code></pre>
      </li>
      <li>Inicie o servidor de desenvolvimento:
        <pre><code>npm run dev</code></pre>
      </li>
    </ol>

  <h2>Funcionalidades</h2>
    <ul>
      <li>Registro de usuário com verificação de e-mail e autenticação local.</li>
      <li>Suporte para autenticação OAuth2 com Google e GitHub.</li>
      <li>Proteção de rotas no frontend usando tokens JWT.</li>
      <li>Feedback visual com mensagens de erro e sucesso para o usuário.</li>
    </ul>


 <h2>Autenticação com OAuth2</h2>
    <p>Para configurar a autenticação com OAuth2, siga os passos abaixo para configurar o Google e o GitHub como provedores:</p>
    <h3>1. Google</h3>
    <ul>
      <li>Crie um novo projeto no <a href="https://console.developers.google.com/">Google Cloud Console</a>.</li>
      <li>Ative a API Google+ ou Google Identity Platform.</li>
      <li>Crie credenciais OAuth2 e configure os URIs de redirecionamento autorizados.</li>
    </ul>

 <h3>2. GitHub</h3>
    <ul>
      <li>Vá para <a href="https://github.com/settings/developers">GitHub Developer Settings</a> e crie um novo aplicativo OAuth.</li>
      <li>Configure o <strong>Client ID</strong> e o <strong>Client Secret</strong> gerados para o GitHub.</li>
    </ul>

 <h2>Melhorias Futuras</h2>
    <ul>
      <li>Adicionar mais provedores de autenticação OAuth2.</li>
      <li>Implementar uma interface mais amigável e intuitiva.</li>
      <li>Expandir os testes para cobrir mais funcionalidades e casos de uso.</li>
    </ul>
