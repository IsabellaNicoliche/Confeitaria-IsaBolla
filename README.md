# 🎂 IsaBolla Confeitaria

Sistema web de gestão para confeitaria, desenvolvido em **React** com **Vite**. O nome é um trocadilho com *Isabella* + *bolo* 🍰.

A interface usa uma paleta em tons pastéis de **azul**, **rosa** e **amarelo**, e funciona no computador e no celular.

## ✨ Funcionalidades

### 🏠 Início (Dashboard)
- Faturamento dos pedidos entregues
- Quantidade de pedidos em aberto e valor a receber
- Lista das próximas entregas
- Ranking dos produtos mais vendidos
- Alerta de ingredientes com estoque baixo

### 🧾 Pedidos
- Cadastro de pedidos com cliente, data de entrega, itens e observação
- Cálculo automático do total
- Fluxo de status: **Pendente → Em produção → Pronto → Entregue**
- Cancelamento e exclusão de pedidos
- Filtro por status e busca por número ou cliente

### 🧁 Cardápio
- Cadastro, edição e exclusão de produtos
- Ícone, categoria, preço e descrição
- Pausar ou ativar produtos
- Busca e filtro por categoria

### 💗 Clientes
- Cadastro, edição e exclusão de clientes
- Quantidade de pedidos e total gasto por cliente
- Busca por nome, telefone ou e-mail

### 📦 Estoque
- Controle de ingredientes com quantidade, unidade e estoque mínimo
- Botões rápidos para aumentar ou diminuir a quantidade
- Indicação de itens que precisam ser repostos

## 🛠️ Tecnologias

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- CSS puro
- LocalStorage para salvar os dados no navegador

## 🚀 Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
git clone https://github.com/SEU-USUARIO/isabolla-confeitaria.git
cd isabolla-confeitaria
npm install
npm run dev
```

Depois, abra no navegador o endereço exibido no terminal (normalmente `http://localhost:5173`).

### Outros comandos

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção na pasta `dist` |
| `npm run preview` | Executa localmente a versão de produção |

## 📁 Estrutura do projeto

```
isabolla-confeitaria/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── Modal.jsx
    │   └── Confirmar.jsx
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Pedidos.jsx
    │   ├── Produtos.jsx
    │   ├── Clientes.jsx
    │   └── Estoque.jsx
    └── data/
        ├── seed.js
        ├── storage.js
        └── utils.js
```

## 💾 Dados

Os dados ficam salvos no **LocalStorage** do navegador, então continuam disponíveis depois de recarregar a página. Na primeira execução, o sistema já vem com produtos, clientes, pedidos e ingredientes de exemplo.

Para voltar aos dados iniciais, limpe o armazenamento do site nas ferramentas de desenvolvedor do navegador (**F12 → Application → Local Storage**).

## 🎨 Paleta de cores

| Cor | Hex |
| --- | --- |
| Azul pastel | `#BFE3F5` |
| Rosa pastel | `#F9CFE0` |
| Amarelo pastel | `#FFF1B8` |

## 👤 Autor

**Derick Alves Maschio**
Sistemas de Informação — Universidade de Mogi das Cruzes (UMC)

---

Feito com amor e açúcar ✨
