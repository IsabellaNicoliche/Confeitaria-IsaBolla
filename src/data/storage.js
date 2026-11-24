import { useEffect, useState } from 'react';

const PREFIXO = 'isabolla_';

function carregar(chave, padrao) {
  try {
    const salvo = localStorage.getItem(PREFIXO + chave);
    return salvo ? JSON.parse(salvo) : padrao;
  } catch {
    return padrao;
  }
}

function salvar(chave, valor) {
  try {
    localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch {
    return;
  }
}

export function usePersistentState(chave, padrao) {
  const [estado, setEstado] = useState(() => carregar(chave, padrao));

  useEffect(() => {
    salvar(chave, estado);
  }, [chave, estado]);

  return [estado, setEstado];
}
