export default function Modal({ titulo, aberto, onFechar, children }) {
  if (!aberto) return null;

  return (
    <div className="modal-fundo" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-topo">
          <h3>{titulo}</h3>
          <button className="btn-icone" onClick={onFechar} aria-label="Fechar">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
