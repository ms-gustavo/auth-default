<h1>Auth-Default Frontend</h1>
    <p>Este projeto é o frontend do <strong>Auth-Default</strong>, um sistema de autenticação em Node.js com TypeScript. A solução inclui login e registro de usuários, verificação de e-mails e suporte à autenticação com OAuth2 via Google e GitHub.</p>

  
![Captura de tela 2024-10-22 172017](https://github.com/user-attachments/assets/759e7897-35aa-49d5-a188-6d0ad6b83b26)

    
  <h2>Configuração</h2>
    <p>Antes de iniciar o projeto, configure o arquivo <code>.env</code> com o endpoint da API:</p>
    <pre><code>REACT_APP_API_BASE_URL=http://localhost:3000</code></pre>

  <h2>Scripts Disponíveis</h2>
    <ul>
      <li><code>npm start</code> - Inicia o servidor de desenvolvimento.</li>
      <li><code>npm run build</code> - Gera a versão de produção do projeto.</li>
    </ul>
    
  <h2>Funcionalidades</h2>
    <ul>
      <li>Registro e login de usuários com e-mail e senha.</li>
      <li>Autenticação OAuth2 com Google e GitHub.</li>
      <li>Proteção de rotas com token JWT armazenado no <code>localStorage</code>.</li>
      <li>Redirecionamento automático com base no estado de autenticação.</li>
    </ul>

  <h2>Componentes Principais</h2>
    <ul>
      <li><strong>LoginForm:</strong> Formulário de login com validação de campos.</li>
      <li><strong>RegisterForm:</strong> Formulário de registro com feedback de sucesso e erros.</li>
      <li><strong>ProvidersLogin:</strong> Botões para autenticação via Google e GitHub.</li>
      <li><strong>AuthLayout:</strong> Layout base para as páginas de autenticação.</li>
      <li><strong>ImageAuthComponent:</strong> Componente com a imagem de fundo e uma breve descrição do sistema.</li>
    </ul>

   <h2>Implementação de Autenticação</h2>
    <p>O projeto usa a <code>ContextAPI</code> para gerenciar o estado de autenticação, armazenando o token JWT em <code>localStorage</code>. Se o usuário estiver autenticado, ele é redirecionado automaticamente para a página protegida. O token é removido após 24 horas.</p>

  <h2>Exemplo de Código</h2>
    <p>O código abaixo mostra como o login é realizado:</p>
    <pre><code>const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      setLoading(true);
      const response = await loginRequest(email, password);
      const { token } = response.data;
      login(token);
      navigate("/protected");
      toast.success("Login realizado com sucesso, redirecionando...");
    } catch (error: unknown) {
      const errorMessage = handleApiError(
        error,
        "Falha ao realizar a operação"
      );
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
};</code></pre>

  <h2>Melhorias Futuras</h2>
    <ul>
      <li>Adicionar suporte para autenticação com outros provedores OAuth2.</li>
      <li>Melhorar a experiência do usuário com animações e feedback visual.</li>
      <li>Implementar testes automatizados para os componentes principais.</li>
    </ul>
