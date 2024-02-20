const express = require('express'); // importa o framework express.js
const app = express(); // criando uma instância no express
const port = 3000; // porta de conexão http


// Array de usuários - com propriedade [id, email, passsword, name]
const users = [
    { id: 1, email: 'usuario1@example.com', password: 'senha1', name: 'Usuário 1' },
    { id: 2, email: 'usuario2@example.com', password: 'senha2', name: 'Usuário 2' },
    { id: 3, email: 'usuario3@example.com', password: 'senha3', name: 'Usuário 3' }
  ];


// Configuração do Express
app.set('view engine', 'ejs'); // usar o ejs, para ser usado automaticamente
app.use(express.urlencoded({ extended: true })); // permite acessar os dados de req.body
app.use(express.static('public')); // acessa tudo que está no 'public'


//  a página de login
app.get('/', (req, res) => { //rota raiz do aplicativo do localhost
  res.render('login', { error: null }); //indica q não a erros
});




// processar o login
app.post('/login', (req, res) => { // acionado para processar as informações do login
    const { email, password } = req.body;
 
    // Validar campos do formulário
    if (!email || !password) {
      return res.status(400).send('Email e senha são obrigatórios');
    }
 
    // se os dados correspondem a algum usuário
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).send('Email ou senha incorretos');
    }
 
    // Ir para a página de perfil do usuário
    res.redirect(`/profile/${user.id}`);
  });
 
// Rota para a página de perfil do usuário
app.get('/profile/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(user => user.id === userId);
  res.render('profile', { user });
});


// Inicia o servidor express. Quando estiver pronto para aceitar conexão ele imprime uma mensaegem.
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
