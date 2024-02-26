const express = require('express'); // Importa o módulo 'express' para criar um aplicativo Express
const app = express(); // Cria uma instância do aplicativo Express
const port = 3000; // Define a porta em que o servidor estará escutando por requisições HTTP


// Array de usuários com informações de exemplo
const users = [
    { id: 1, email: 'usuario1@example.com', password: 'senha1', name: 'Usuário 1' },
    { id: 2, email: 'usuario2@example.com', password: 'senha2', name: 'Usuário 2' },
    { id: 3, email: 'usuario3@example.com', password: 'senha3', name: 'Usuário 3' }
];


app.set('view engine', 'ejs'); // Configura o mecanismo de visualização para usar o EJS
app.use(express.urlencoded({ extended: true })); // Configura o Express para analisar dados de formulários URL-encoded
app.use(express.static('public')); // Define o diretório 'public' para servir arquivos estáticos


// Rota para a página de login
app.get('/', (req, res) => {
  res.render('login', { error: null }); // Renderiza a página de login com erro nulo
});


// Rota para processar o login
app.post('/login', (req, res) => {
    const { email, password } = req.body; // Extrai email e senha do corpo da requisição


    // Verifica se email e senha foram fornecidos
    if (!email || !password) {
      return res.status(400).send('Email e senha são obrigatórios'); // Retorna erro 400 se campos estiverem em branco
    }
 
    // Busca pelo usuário com o email e senha fornecidos
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).send('Email ou senha incorretos'); // Retorna erro 401 se usuário não for encontrado
    }
 
    res.redirect(`/profile/${user.id}`); // Redireciona para a página de perfil do usuário encontrado
});


// Rota para exibir o perfil do usuário
app.get('/profile/:userId', (req, res) => {
  const userId = parseInt(req.params.userId); // Obtém o ID do usuário da URL
  const user = users.find(user => user.id === userId); // Busca o usuário pelo ID
  res.render('profile', { user }); // Renderiza a página de perfil com os dados do usuário
});


// Rota para a página de cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro'); // Renderiza a página de cadastro
});


// Rota para processar o formulário de cadastro
app.post('/cadastro', (req, res) => {
    const { name, email, password, confirmPassword } = req.body; // Extrai dados do formulário


    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      return res.status(400).send('As senhas não coincidem'); // Retorna erro 400 se as senhas não coincidirem
    }


    // Cria um novo usuário e o adiciona ao array de usuários
    const newUser = { id: users.length + 1, name, email, password };
    users.push(newUser);
   
    res.redirect(`/profile/${newUser.id}`); // Redireciona para a página de perfil do novo usuário
});


// Inicia o servidor Express e faz com que ele escute na porta especificada
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`); // Exibe mensagem no console indicando que o servidor está ouvindo
});




 
// Inicia o servidor express. Quando estiver pronto para aceitar conexão ele imprime uma mensaegem.
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
