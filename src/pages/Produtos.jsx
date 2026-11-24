import { useState } from 'react';
import Modal from '../components/Modal';
import Confirmar from '../components/Confirmar';
import { moeda, uid } from '../data/utils';
import { categorias } from '../data/seed';

const vazio = { nome: '', categoria: 'Bolos', preco: '', emoji: '🍰', descricao: '', ativo: true };
const emojis = ['🍰', '🎂', '🧁', '🍫', '🍪', '🥧', '🍩', '🍬', '🍮', '🍓'];

export default function Produtos({ produtos, setProdutos }) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [aberto, setAberto] = useState(false);
  const [form, setForm] = useState(vazio);
  const [editandoId, setEditandoId] = useState(null);
  const [excluindo, setExcluindo] = useState(null);

  const lista = produtos.filter(
    (p) =>
      (filtro === 'Todos' || p.categoria === filtro) &&
      p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function novo() {
    setForm(vazio);
    setEditandoId(null);
    setAberto(true);
  }

  function editar(produto) {
    setForm({ ...produto, preco: String(produto.preco) });
    setEditandoId(produto.id);
    setAberto(true);
  }

  function salvar(e) {
    e.preventDefault();
    const dados = { ...form, nome: form.nome.trim(), preco: Number(form.preco) };
    if (editandoId) {
      setProdutos(produtos.map((p) => (p.id === editandoId ? { ...dados, id: editandoId } : p)));
    } else {
      setProdutos([...produtos, { ...dados, id: uid() }]);
    }
    setAberto(false);
  }

  function alternarAtivo(id) {
    setProdutos(produtos.map((p) => (p.id === id ? { ...p, ativo: !p.ativo } : p)));
  }

  function confirmarExclusao() {
    setProdutos(produtos.filter((p) => p.id !== excluindo.id));
    setExcluindo(null);
  }

  const campo = (chave) => (e) => setForm({ ...form, [chave]: e.target.value });

  return (
    <>
      <header className="cabecalho">
        <div>
          <h2>Cardápio</h2>
          <p>{produtos.length} delícias cadastradas</p>
        </div>
        <button className="btn btn-rosa" onClick={novo}>+ Novo produto</button>
      </header>

      <div className="filtros">
        <input
          className="input busca"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <div className="chips">
          {['Todos', ...categorias].map((c) => (
            <button key={c} className={`chip ${filtro === c ? 'ativo' : ''}`} onClick={() => setFiltro(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {lista.length === 0 ? (
        <p className="vazio painel">Nenhum produto encontrado</p>
      ) : (
        <div className="grade-produtos">
          {lista.map((p) => (
            <article key={p.id} className={`card-produto ${p.ativo ? '' : 'inativo'}`}>
              <div className="produto-emoji">{p.emoji}</div>
              <span className="tag">{p.categoria}</span>
              <h4>{p.nome}</h4>
              <p>{p.descricao}</p>
              <strong className="preco">{moeda(p.preco)}</strong>
              <div className="card-acoes">
                <button className="btn btn-claro btn-p" onClick={() => alternarAtivo(p.id)}>
                  {p.ativo ? 'Pausar' : 'Ativar'}
                </button>
                <button className="btn btn-azul btn-p" onClick={() => editar(p)}>Editar</button>
                <button className="btn-icone" onClick={() => setExcluindo(p)} aria-label="Excluir">🗑️</button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal titulo={editandoId ? 'Editar produto' : 'Novo produto'} aberto={aberto} onFechar={() => setAberto(false)}>
        <form onSubmit={salvar} className="form">
          <label>
            Ícone
            <div className="emojis">
              {emojis.map((em) => (
                <button
                  type="button"
                  key={em}
                  className={`emoji-opcao ${form.emoji === em ? 'ativo' : ''}`}
                  onClick={() => setForm({ ...form, emoji: em })}
                >
                  {em}
                </button>
              ))}
            </div>
          </label>
          <label>
            Nome
            <input className="input" required value={form.nome} onChange={campo('nome')} />
          </label>
          <div className="linha-form">
            <label>
              Categoria
              <select className="input" value={form.categoria} onChange={campo('categoria')}>
                {categorias.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>
              Preço (R$)
              <input className="input" type="number" min="0" step="0.01" required value={form.preco} onChange={campo('preco')} />
            </label>
          </div>
          <label>
            Descrição
            <textarea className="input" rows="3" value={form.descricao} onChange={campo('descricao')} />
          </label>
          <div className="modal-acoes">
            <button type="button" className="btn btn-claro" onClick={() => setAberto(false)}>Cancelar</button>
            <button type="submit" className="btn btn-rosa">Salvar</button>
          </div>
        </form>
      </Modal>

      <Confirmar
        mensagem={excluindo && `Excluir "${excluindo.nome}" do cardápio?`}
        onConfirmar={confirmarExclusao}
        onCancelar={() => setExcluindo(null)}
      />
    </>
  );
}
