import { useState } from 'react';
import Modal from '../components/Modal';
import Confirmar from '../components/Confirmar';
import { STATUS, FLUXO, moeda, uid, hoje, formatarData, totalPedido, classeStatus } from '../data/utils';

const formVazio = () => ({ clienteId: '', entrega: hoje(1), observacao: '', itens: [] });

export default function Pedidos({ pedidos, setPedidos, clientes, produtos }) {
  const [filtro, setFiltro] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [aberto, setAberto] = useState(false);
  const [form, setForm] = useState(formVazio);
  const [produtoSel, setProdutoSel] = useState('');
  const [qtdSel, setQtdSel] = useState(1);
  const [erro, setErro] = useState('');
  const [excluindo, setExcluindo] = useState(null);

  const ativos = produtos.filter((p) => p.ativo);
  const nomeCliente = (id) => clientes.find((c) => c.id === id)?.nome || 'Cliente removido';

  const lista = pedidos
    .filter((p) => filtro === 'Todos' || p.status === filtro)
    .filter((p) =>
      `${p.numero} ${nomeCliente(p.clienteId)}`.toLowerCase().includes(busca.toLowerCase())
    )
    .sort((a, b) => b.numero - a.numero);

  const contar = (status) =>
    status === 'Todos' ? pedidos.length : pedidos.filter((p) => p.status === status).length;

  function abrirNovo() {
    setForm(formVazio());
    setProdutoSel(ativos[0]?.id || '');
    setQtdSel(1);
    setErro('');
    setAberto(true);
  }

  function adicionarItem() {
    const produto = produtos.find((p) => p.id === produtoSel);
    const qtd = Number(qtdSel);
    if (!produto || qtd < 1) return;
    const existe = form.itens.find((i) => i.produtoId === produto.id);
    const itens = existe
      ? form.itens.map((i) => (i.produtoId === produto.id ? { ...i, qtd: i.qtd + qtd } : i))
      : [...form.itens, { produtoId: produto.id, nome: produto.nome, preco: produto.preco, qtd }];
    setForm({ ...form, itens });
    setQtdSel(1);
    setErro('');
  }

  function removerItem(produtoId) {
    setForm({ ...form, itens: form.itens.filter((i) => i.produtoId !== produtoId) });
  }

  function salvar(e) {
    e.preventDefault();
    if (!form.clienteId) return setErro('Escolha um cliente.');
    if (form.itens.length === 0) return setErro('Adicione pelo menos um produto.');
    const numero = Math.max(0, ...pedidos.map((p) => p.numero)) + 1;
    setPedidos([
      ...pedidos,
      { ...form, id: uid(), numero, status: 'Pendente', criadoEm: hoje(0) },
    ]);
    setAberto(false);
  }

  function avancar(pedido) {
    const proximo = FLUXO[FLUXO.indexOf(pedido.status) + 1];
    if (!proximo) return;
    setPedidos(pedidos.map((p) => (p.id === pedido.id ? { ...p, status: proximo } : p)));
  }

  function cancelar(pedido) {
    setPedidos(pedidos.map((p) => (p.id === pedido.id ? { ...p, status: 'Cancelado' } : p)));
  }

  function confirmarExclusao() {
    setPedidos(pedidos.filter((p) => p.id !== excluindo.id));
    setExcluindo(null);
  }

  const totalForm = totalPedido(form);

  return (
    <>
      <header className="cabecalho">
        <div>
          <h2>Pedidos</h2>
          <p>Acompanhe cada encomenda do forno até a entrega</p>
        </div>
        <button className="btn btn-rosa" onClick={abrirNovo}>+ Novo pedido</button>
      </header>

      <div className="filtros">
        <input
          className="input busca"
          placeholder="Buscar por número ou cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <div className="chips">
          {['Todos', ...STATUS].map((s) => (
            <button key={s} className={`chip ${filtro === s ? 'ativo' : ''}`} onClick={() => setFiltro(s)}>
              {s} <span className="chip-contador">{contar(s)}</span>
            </button>
          ))}
        </div>
      </div>

      {lista.length === 0 ? (
        <p className="vazio painel">Nenhum pedido por aqui</p>
      ) : (
        <div className="grade-pedidos">
          {lista.map((p) => {
            const proximo = FLUXO[FLUXO.indexOf(p.status) + 1];
            const finalizado = ['Entregue', 'Cancelado'].includes(p.status);
            return (
              <article key={p.id} className={`card-pedido ${p.status === 'Cancelado' ? 'inativo' : ''}`}>
                <div className="pedido-topo">
                  <div>
                    <strong className="pedido-numero">#{p.numero}</strong>
                    <h4>{nomeCliente(p.clienteId)}</h4>
                  </div>
                  <span className={`status ${classeStatus(p.status)}`}>{p.status}</span>
                </div>

                <p className="pedido-data">📅 Entrega em {formatarData(p.entrega)}</p>

                <ul className="pedido-itens">
                  {p.itens.map((i) => (
                    <li key={i.produtoId}>
                      <span>{i.qtd}× {i.nome}</span>
                      <span>{moeda(i.preco * i.qtd)}</span>
                    </li>
                  ))}
                </ul>

                {p.observacao && <p className="pedido-obs">📝 {p.observacao}</p>}

                <div className="pedido-total">
                  <span>Total</span>
                  <strong>{moeda(totalPedido(p))}</strong>
                </div>

                <div className="card-acoes">
                  {!finalizado && proximo && (
                    <button className="btn btn-azul btn-p" onClick={() => avancar(p)}>
                      Marcar como {proximo}
                    </button>
                  )}
                  {!finalizado && (
                    <button className="btn btn-claro btn-p" onClick={() => cancelar(p)}>Cancelar</button>
                  )}
                  <button className="btn-icone" onClick={() => setExcluindo(p)} aria-label="Excluir">🗑️</button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Modal titulo="Novo pedido" aberto={aberto} onFechar={() => setAberto(false)}>
        <form onSubmit={salvar} className="form">
          <div className="linha-form">
            <label>
              Cliente
              <select
                className="input"
                value={form.clienteId}
                onChange={(e) => setForm({ ...form, clienteId: e.target.value })}
              >
                <option value="">Selecione...</option>
                {clientes.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </label>
            <label>
              Data de entrega
              <input
                className="input"
                type="date"
                required
                value={form.entrega}
                onChange={(e) => setForm({ ...form, entrega: e.target.value })}
              />
            </label>
          </div>

          <div className="add-item">
            <label>
              Produto
              <select className="input" value={produtoSel} onChange={(e) => setProdutoSel(e.target.value)}>
                {ativos.map((p) => (
                  <option key={p.id} value={p.id}>{p.emoji} {p.nome} — {moeda(p.preco)}</option>
                ))}
              </select>
            </label>
            <label className="campo-qtd">
              Qtd
              <input className="input" type="number" min="1" value={qtdSel} onChange={(e) => setQtdSel(e.target.value)} />
            </label>
            <button type="button" className="btn btn-amarelo" onClick={adicionarItem}>Adicionar</button>
          </div>

          {form.itens.length > 0 && (
            <ul className="pedido-itens editavel">
              {form.itens.map((i) => (
                <li key={i.produtoId}>
                  <span>{i.qtd}× {i.nome}</span>
                  <span>
                    {moeda(i.preco * i.qtd)}
                    <button type="button" className="btn-icone" onClick={() => removerItem(i.produtoId)} aria-label="Remover">✕</button>
                  </span>
                </li>
              ))}
            </ul>
          )}

          <label>
            Observação
            <textarea
              className="input"
              rows="2"
              placeholder="Ex.: escrever nome no bolo, retirada no balcão..."
              value={form.observacao}
              onChange={(e) => setForm({ ...form, observacao: e.target.value })}
            />
          </label>

          {erro && <p className="erro">{erro}</p>}

          <div className="modal-acoes entre">
            <strong className="total-form">Total: {moeda(totalForm)}</strong>
            <div className="modal-acoes">
              <button type="button" className="btn btn-claro" onClick={() => setAberto(false)}>Cancelar</button>
              <button type="submit" className="btn btn-rosa">Salvar pedido</button>
            </div>
          </div>
        </form>
      </Modal>

      <Confirmar
        mensagem={excluindo && `Excluir o pedido #${excluindo.numero}?`}
        onConfirmar={confirmarExclusao}
        onCancelar={() => setExcluindo(null)}
      />
    </>
  );
}
