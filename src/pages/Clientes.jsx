import { useState } from 'react';
import Modal from '../components/Modal';
import Confirmar from '../components/Confirmar';
import { moeda, uid, totalPedido } from '../data/utils';

const vazio = { nome: '', telefone: '', email: '', endereco: '' };

export default function Clientes({ clientes, setClientes, pedidos }) {
  const [busca, setBusca] = useState('');
  const [aberto, setAberto] = useState(false);
  const [form, setForm] = useState(vazio);
  const [editandoId, setEditandoId] = useState(null);
  const [excluindo, setExcluindo] = useState(null);

  const lista = clientes.filter((c) =>
    `${c.nome} ${c.telefone} ${c.email}`.toLowerCase().includes(busca.toLowerCase())
  );

  function resumo(clienteId) {
    const dele = pedidos.filter((p) => p.clienteId === clienteId && p.status !== 'Cancelado');
    return { qtd: dele.length, total: dele.reduce((s, p) => s + totalPedido(p), 0) };
  }

  function novo() {
    setForm(vazio);
    setEditandoId(null);
    setAberto(true);
  }

  function editar(cliente) {
    setForm(cliente);
    setEditandoId(cliente.id);
    setAberto(true);
  }

  function salvar(e) {
    e.preventDefault();
    const dados = { ...form, nome: form.nome.trim() };
    if (editandoId) {
      setClientes(clientes.map((c) => (c.id === editandoId ? { ...dados, id: editandoId } : c)));
    } else {
      setClientes([...clientes, { ...dados, id: uid() }]);
    }
    setAberto(false);
  }

  function confirmarExclusao() {
    setClientes(clientes.filter((c) => c.id !== excluindo.id));
    setExcluindo(null);
  }

  const campo = (chave) => (e) => setForm({ ...form, [chave]: e.target.value });

  return (
    <>
      <header className="cabecalho">
        <div>
          <h2>Clientes</h2>
          <p>{clientes.length} clientes adoçados</p>
        </div>
        <button className="btn btn-rosa" onClick={novo}>+ Novo cliente</button>
      </header>

      <div className="filtros">
        <input
          className="input busca"
          placeholder="Buscar por nome, telefone ou e-mail..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="painel tabela-wrap">
        {lista.length === 0 ? (
          <p className="vazio">Nenhum cliente encontrado</p>
        ) : (
          <table className="tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contato</th>
                <th>Endereço</th>
                <th className="num">Pedidos</th>
                <th className="num">Total gasto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lista.map((c) => {
                const r = resumo(c.id);
                return (
                  <tr key={c.id}>
                    <td data-l="Nome">
                      <div className="avatar-nome">
                        <span className="avatar">{c.nome.charAt(0).toUpperCase()}</span>
                        <strong>{c.nome}</strong>
                      </div>
                    </td>
                    <td data-l="Contato">
                      <div>{c.telefone}</div>
                      <small className="suave">{c.email}</small>
                    </td>
                    <td data-l="Endereço">{c.endereco || '-'}</td>
                    <td data-l="Pedidos" className="num">{r.qtd}</td>
                    <td data-l="Total gasto" className="num">{moeda(r.total)}</td>
                    <td className="acoes-tabela">
                      <button className="btn btn-azul btn-p" onClick={() => editar(c)}>Editar</button>
                      <button className="btn-icone" onClick={() => setExcluindo(c)} aria-label="Excluir">🗑️</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <Modal titulo={editandoId ? 'Editar cliente' : 'Novo cliente'} aberto={aberto} onFechar={() => setAberto(false)}>
        <form onSubmit={salvar} className="form">
          <label>
            Nome
            <input className="input" required value={form.nome} onChange={campo('nome')} />
          </label>
          <div className="linha-form">
            <label>
              Telefone
              <input className="input" required placeholder="(11) 90000-0000" value={form.telefone} onChange={campo('telefone')} />
            </label>
            <label>
              E-mail
              <input className="input" type="email" value={form.email} onChange={campo('email')} />
            </label>
          </div>
          <label>
            Endereço
            <input className="input" value={form.endereco} onChange={campo('endereco')} />
          </label>
          <div className="modal-acoes">
            <button type="button" className="btn btn-claro" onClick={() => setAberto(false)}>Cancelar</button>
            <button type="submit" className="btn btn-rosa">Salvar</button>
          </div>
        </form>
      </Modal>

      <Confirmar
        mensagem={excluindo && `Excluir o cliente "${excluindo.nome}"? Os pedidos dele continuam no histórico.`}
        onConfirmar={confirmarExclusao}
        onCancelar={() => setExcluindo(null)}
      />
    </>
  );
}
