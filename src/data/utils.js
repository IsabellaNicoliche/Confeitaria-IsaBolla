export const STATUS = ['Pendente', 'Em produção', 'Pronto', 'Entregue', 'Cancelado'];

export const FLUXO = ['Pendente', 'Em produção', 'Pronto', 'Entregue'];

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export const moeda = (valor) =>
  Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function hoje(dias = 0) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function formatarData(data) {
  if (!data) return '-';
  const [a, m, d] = data.split('-');
  return `${d}/${m}/${a}`;
}

export const totalPedido = (pedido) =>
  pedido.itens.reduce((soma, item) => soma + item.preco * item.qtd, 0);

export function classeStatus(status) {
  const mapa = {
    Pendente: 'st-amarelo',
    'Em produção': 'st-azul',
    Pronto: 'st-rosa',
    Entregue: 'st-verde',
    Cancelado: 'st-cinza',
  };
  return mapa[status] || '';
}
