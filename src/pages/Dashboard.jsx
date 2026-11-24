import { moeda, totalPedido, formatarData, classeStatus } from '../data/utils';

export default function Dashboard({ produtos, clientes, pedidos, estoque, setPagina }) {
  const entregues = pedidos.filter((p) => p.status === 'Entregue');
  const abertos = pedidos.filter((p) => !['Entregue', 'Cancelado'].includes(p.status));
  const faturamento = entregues.reduce((soma, p) => soma + totalPedido(p), 0);
  const aReceber = abertos.reduce((soma, p) => soma + totalPedido(p), 0);
  const estoqueBaixo = estoque.filter((i) => i.quantidade <= i.minimo);
  const proximos = [...abertos].sort((a, b) => a.entrega.localeCompare(b.entrega)).slice(0, 5);

  const vendas = {};
  pedidos
    .filter((p) => p.status !== 'Cancelado')
    .forEach((p) => p.itens.forEach((i) => {
      vendas[i.nome] = (vendas[i.nome] || 0) + i.qtd;
    }));
  const ranking = Object.entries(vendas).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maior = ranking[0]?.[1] || 1;

  const nomeCliente = (id) => clientes.find((c) => c.id === id)?.nome || 'Cliente removido';

  return (
    <>
      <header className="cabecalho">
        <div>
          <h2>Olá, doçura! 🍓</h2>
          <p>Veja como está a confeitaria hoje</p>
        </div>
        <button className="btn btn-rosa" onClick={() => setPagina('pedidos')}>+ Novo pedido</button>
      </header>

      <section className="cards-resumo">
        <div className="card-resumo azul">
          <span className="card-icone">💰</span>
          <div><small>Faturamento</small><strong>{moeda(faturamento)}</strong></div>
        </div>
        <div className="card-resumo rosa">
          <span className="card-icone">🧾</span>
          <div><small>Pedidos em aberto</small><strong>{abertos.length}</strong></div>
        </div>
        <div className="card-resumo amarelo">
          <span className="card-icone">⏳</span>
          <div><small>A receber</small><strong>{moeda(aReceber)}</strong></div>
        </div>
        <div className="card-resumo azul">
          <span className="card-icone">🧁</span>
          <div><small>Produtos ativos</small><strong>{produtos.filter((p) => p.ativo).length}</strong></div>
        </div>
      </section>

      <section className="grade-2">
        <div className="painel">
          <div className="painel-topo">
            <h3>Próximas entregas</h3>
            <button className="link" onClick={() => setPagina('pedidos')}>Ver todos</button>
          </div>
          {proximos.length === 0 ? (
            <p className="vazio">Nenhum pedido em aberto 🎉</p>
          ) : (
            <ul className="lista">
              {proximos.map((p) => (
                <li key={p.id}>
                  <div>
                    <strong>#{p.numero} · {nomeCliente(p.clienteId)}</strong>
                    <small>Entrega {formatarData(p.entrega)} · {moeda(totalPedido(p))}</small>
                  </div>
                  <span className={`status ${classeStatus(p.status)}`}>{p.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="painel">
          <div className="painel-topo">
            <h3>Mais vendidos</h3>
          </div>
          {ranking.length === 0 ? (
            <p className="vazio">Ainda não há vendas</p>
          ) : (
            <div className="ranking">
              {ranking.map(([nome, qtd], i) => (
                <div key={nome} className="ranking-linha">
                  <div className="ranking-info">
                    <span>{nome}</span>
                    <strong>{qtd} un</strong>
                  </div>
                  <div className="barra">
                    <div className={`barra-preenchida cor-${i % 3}`} style={{ width: `${(qtd / maior) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="painel">
        <div className="painel-topo">
          <h3>Estoque baixo</h3>
          <button className="link" onClick={() => setPagina('estoque')}>Abrir estoque</button>
        </div>
        {estoqueBaixo.length === 0 ? (
          <p className="vazio">Tudo abastecido 👌</p>
        ) : (
          <div className="chips">
            {estoqueBaixo.map((i) => (
              <span key={i.id} className="chip-alerta">
                ⚠️ {i.nome}: {i.quantidade} {i.unidade} (mín. {i.minimo})
              </span>
            ))}
          </div>
        )}
      </section>

      <p className="rodape-info">{clientes.length} clientes cadastrados · {pedidos.length} pedidos no total</p>
    </>
  );
}
