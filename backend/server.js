const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'users.json');

// Função para ler usuários
function readUsers() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE));
}

// Função para salvar usuários
function saveUsers(users) {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}

// Endpoint de cadastro
app.post('/api/cadastro', (req, res) => {
  const { nome, celular, nascimento } = req.body;
  if (!nome || !celular || !nascimento) {
    return res.status(400).json({ error: 'Faltam campos obrigatórios.' });
  }

  const users = readUsers();
  if (users.find(u => u.celular === celular)) {
    return res.status(400).json({ error: 'Celular já cadastrado.' });
  }

  users.push({ nome, celular, nascimento });
  saveUsers(users);

  res.json({ message: 'Usuário cadastrado com sucesso!' });
});

// Endpoint de login
app.post('/api/login', (req, res) => {
  const { celular } = req.body;
  const users = readUsers();

  const user = users.find(u => u.celular === celular);
  if (!user) {
    return res.status(401).json({ error: 'Usuário não encontrado.' });
  }

  res.json({ message: 'Login bem-sucedido!', user });
});

// Iniciar servidor
app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
