import { useState } from 'react';
import Modal from '../components/Modal';
import Confirmar from '../components/Confirmar';
import { uid } from '../data/utils';
import { unidades } from '../data/seed';

const vazio = { nome: '', quantidade: '', unidade: 'kg', minimo: '' };

export default function Estoque({ estoque, setEstoque }) {
  const [busca, setBusca] = useState('');
  const [soBaixo, setSoBaixo] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [form, setForm] = useState(vazio);
  const [editandoId, setEditandoId] = useState(null);
  const [excluindo, setExcluindo] = useState(null);

  const baixo = (i) => i.quantidade <= i.minimo;
  const totalBaixo = estoque.filter(baixo).length;

  const lista = estoque.filter(
    (i) => i.nome.toLowerCase().includes(busca.toLowerCase()) && (!soBaixo || baixo(i))
  );

  function novo() {
    setForm(vazio);
    setEditandoId(null);
    setAberto(true);
  }

  function editar(item) {
    setForm({ ...item, quantidade: String(item.quantidade), minimo: String(item.minimo) });
    setEditandoId(item.id);
    setAberto(true);
  }

  function salvar(e) {
    e.preventDefault();
    const dados = {
      ...form,
      nome: form.nome.trim(),
      quantidade: Number(form.quantidade),
      minimo: Number(form.minimo),
    };
    if (editandoId) {
      setEstoque(estoque.map((i) => (i.id === editandoId ? { ...dados, id: editandoId } : i)));
    } else {
      setEstoque([...estoque, { ...dados, id: uid() }]);
    }
    setAberto(false);
  }

  function ajustar(id, delta) {
    setEstoque(
      estoque.map((i) =>
        i.id === id ? { ...i, quantidade: Math.max(0, Number((i.quantidade + delta).toFixed(2))) } : i
      )
    );
  }

  function confirmarExclusao() {
    setEstoque(estoque.filter((i) => i.id !== excluindo.id));
    setExcluindo(null);
  }

  const campo = (chave) => (e) => setForm({ ...form, [chave]: e.target.value });

  return (
    <>
      <header className="cabecalho">
        <div>
          <h2>Estoque</h2>
          <p>{estoque.length} ingredientes · {totalBaixo} precisando repor</p>
        </div>
        <button className="btn btn-rosa" onClick={novo}>+ Novo ingrediente</button>
      </header>

      <div className="filtros">
        <input
          className="input busca"
          placeholder="Buscar ingrediente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button className={`chip ${soBaixo ? 'ativo' : ''}`} onClick={() => setSoBaixo(!soBaixo)}>
          ⚠️ Só estoque baixo
        </button>
      </div>

      <div className="painel tabela-wrap">
        {lista.length === 0 ? (
          <p className="vazio">Nenhum ingrediente encontrado</p>
        ) : (
          <table className="tabela">
            <thead>
              <tr>
                <th>Ingrediente</th>
                <th className="num">Quantidade</th>
                <th className="num">Mínimo</th>
                <th>Situação</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lista.map((i) => (
                <tr key={i.id}>
                  <td data-l="Ingrediente"><strong>{i.nome}</strong></td>
                  <td data-l="Quantidade" className="num">
                    <div className="contador">
                      <button className="btn-mini" onClick={() => ajustar(i.id, -1)} aria-label="Diminuir">−</button>
                      <span>{i.quantidade} {i.unidade}</span>
                      <button className="btn-mini" onClick={() => ajustar(i.id, 1)} aria-label="Aumentar">+</button>
                    </div>
                  </td>
                  <td data-l="Mínimo" className="num">{i.minimo} {i.unidade}</td>
                  <td data-l="Situação">
                    <span className={`status ${baixo(i) ? 'st-rosa' : 'st-verde'}`}>
                      {baixo(i) ? 'Repor' : 'OK'}
                    </span>
                  </td>
                  <td className="acoes-tabela">
                    <button className="btn btn-azul btn-p" onClick={() => editar(i)}>Editar</button>
                    <button className="btn-icone" onClick={() => setExcluindo(i)} aria-label="Excluir">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal titulo={editandoId ? 'Editar ingrediente' : 'Novo ingrediente'} aberto={aberto} onFechar={() => setAberto(false)}>
        <form onSubmit={salvar} className="form">
          <label>
            Nome
            <input className="input" required value={form.nome} onChange={campo('nome')} />
          </label>
          <div className="linha-form">
            <label>
              Quantidade
              <input className="input" type="number" min="0" step="0.01" required value={form.quantidade} onChange={campo('quantidade')} />
            </label>
            <label>
              Unidade
              <select className="input" value={form.unidade} onChange={campo('unidade')}>
                {unidades.map((u) => <option key={u}>{u}</option>)}
              </select>
            </label>
          </div>
          <label>
            Estoque mínimo
            <input className="input" type="number" min="0" step="0.01" required value={form.minimo} onChange={campo('minimo')} />
          </label>
          <div className="modal-acoes">
            <button type="button" className="btn btn-claro" onClick={() => setAberto(false)}>Cancelar</button>
            <button type="submit" className="btn btn-rosa">Salvar</button>
          </div>
        </form>
      </Modal>

      <Confirmar
        mensagem={excluindo && `Excluir "${excluindo.nome}" do estoque?`}
        onConfirmar={confirmarExclusao}
        onCancelar={() => setExcluindo(null)}
      />
    </>
  );
}
