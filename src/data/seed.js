import { hoje } from './utils';

export const categorias = ['Bolos', 'Docinhos', 'Cupcakes', 'Tortas', 'Biscoitos'];

export const unidades = ['kg', 'g', 'L', 'ml', 'un', 'lata', 'cx'];

export const produtosIniciais = [
  { id: 'p1', nome: 'Bolo de Morango', categoria: 'Bolos', preco: 89.9, emoji: '🍰', descricao: 'Massa branca, recheio de morango com chantilly', ativo: true },
  { id: 'p2', nome: 'Brigadeiro Gourmet', categoria: 'Docinhos', preco: 3.5, emoji: '🍫', descricao: 'Chocolate belga com granulado', ativo: true },
  { id: 'p3', nome: 'Cupcake de Baunilha', categoria: 'Cupcakes', preco: 9, emoji: '🧁', descricao: 'Cobertura de buttercream rosa', ativo: true },
  { id: 'p4', nome: 'Torta de Limão', categoria: 'Tortas', preco: 65, emoji: '🥧', descricao: 'Base crocante e merengue maçaricado', ativo: true },
  { id: 'p5', nome: 'Cookie Recheado', categoria: 'Biscoitos', preco: 8, emoji: '🍪', descricao: 'Recheio cremoso de Nutella', ativo: true },
  { id: 'p6', nome: 'Bolo de Aniversário', categoria: 'Bolos', preco: 120, emoji: '🎂', descricao: 'Personalizado, serve 20 pessoas', ativo: true },
  { id: 'p7', nome: 'Beijinho', categoria: 'Docinhos', preco: 3.5, emoji: '🍬', descricao: 'Coco fresco com cravo', ativo: false },
];

export const clientesIniciais = [
  { id: 'c1', nome: 'Ana Souza', telefone: '(11) 98888-1234', email: 'ana@email.com', endereco: 'Rua das Flores, 120' },
  { id: 'c2', nome: 'Carlos Lima', telefone: '(11) 97777-5678', email: 'carlos@email.com', endereco: 'Av. Brasil, 455' },
  { id: 'c3', nome: 'Mariana Alves', telefone: '(11) 96666-4321', email: 'mari@email.com', endereco: 'Rua Ipiranga, 88' },
];

export const estoqueInicial = [
  { id: 'e1', nome: 'Farinha de trigo', quantidade: 12, unidade: 'kg', minimo: 5 },
  { id: 'e2', nome: 'Açúcar', quantidade: 8, unidade: 'kg', minimo: 5 },
  { id: 'e3', nome: 'Ovos', quantidade: 24, unidade: 'un', minimo: 30 },
  { id: 'e4', nome: 'Leite condensado', quantidade: 6, unidade: 'lata', minimo: 10 },
  { id: 'e5', nome: 'Chocolate em pó', quantidade: 3, unidade: 'kg', minimo: 2 },
  { id: 'e6', nome: 'Morango', quantidade: 1, unidade: 'kg', minimo: 2 },
  { id: 'e7', nome: 'Manteiga', quantidade: 4, unidade: 'kg', minimo: 2 },
];

export const pedidosIniciais = [
  {
    id: 'o1', numero: 1, clienteId: 'c1', entrega: hoje(-2), status: 'Entregue', observacao: '', criadoEm: hoje(-5),
    itens: [{ produtoId: 'p1', nome: 'Bolo de Morango', preco: 89.9, qtd: 1 }, { produtoId: 'p2', nome: 'Brigadeiro Gourmet', preco: 3.5, qtd: 50 }],
  },
  {
    id: 'o2', numero: 2, clienteId: 'c2', entrega: hoje(1), status: 'Em produção', observacao: 'Escrever "Parabéns, Lia!"', criadoEm: hoje(-1),
    itens: [{ produtoId: 'p6', nome: 'Bolo de Aniversário', preco: 120, qtd: 1 }],
  },
  {
    id: 'o3', numero: 3, clienteId: 'c3', entrega: hoje(2), status: 'Pendente', observacao: '', criadoEm: hoje(0),
    itens: [{ produtoId: 'p3', nome: 'Cupcake de Baunilha', preco: 9, qtd: 12 }, { produtoId: 'p5', nome: 'Cookie Recheado', preco: 8, qtd: 6 }],
  },
  {
    id: 'o4', numero: 4, clienteId: 'c1', entrega: hoje(0), status: 'Pronto', observacao: 'Retirada no balcão', criadoEm: hoje(-2),
    itens: [{ produtoId: 'p4', nome: 'Torta de Limão', preco: 65, qtd: 1 }, { produtoId: 'p2', nome: 'Brigadeiro Gourmet', preco: 3.5, qtd: 20 }],
  },
];
