import Modal from './Modal';

export default function Confirmar({ mensagem, onConfirmar, onCancelar }) {
  return (
    <Modal titulo="Tem certeza?" aberto={Boolean(mensagem)} onFechar={onCancelar}>
      <p className="texto-confirmar">{mensagem}</p>
      <div className="modal-acoes">
        <button className="btn btn-claro" onClick={onCancelar}>Cancelar</button>
        <button className="btn btn-perigo" onClick={onConfirmar}>Excluir</button>
      </div>
    </Modal>
  );
}
