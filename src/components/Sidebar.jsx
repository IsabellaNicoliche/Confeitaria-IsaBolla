const itens = [
  { id: 'dashboard', label: 'Início', icone: '🏠' },
  { id: 'pedidos', label: 'Pedidos', icone: '🧾' },
  { id: 'produtos', label: 'Cardápio', icone: '🧁' },
  { id: 'clientes', label: 'Clientes', icone: '💗' },
  { id: 'estoque', label: 'Estoque', icone: '📦' },
];

export default function Sidebar({ pagina, setPagina }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icone">🎂</span>
        <div>
          <h1>Isa<span>Bolla</span></h1>
          <small>Confeitaria</small>
        </div>
      </div>

      <nav className="nav">
        {itens.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${pagina === item.id ? 'ativo' : ''}`}
            onClick={() => setPagina(item.id)}
          >
            <span className="nav-icone">{item.icone}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <p className="sidebar-rodape">Feito com amor e açúcar ✨</p>
    </aside>
  );
}
