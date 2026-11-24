import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Pedidos from './pages/Pedidos';
import Produtos from './pages/Produtos';
import Clientes from './pages/Clientes';
import Estoque from './pages/Estoque';
import { usePersistentState } from './data/storage';
import { produtosIniciais, clientesIniciais, pedidosIniciais, estoqueInicial } from './data/seed';

export default function App() {
  const [pagina, setPagina] = useState('dashboard');
  const [produtos, setProdutos] = usePersistentState('produtos', produtosIniciais);
  const [clientes, setClientes] = usePersistentState('clientes', clientesIniciais);
  const [pedidos, setPedidos] = usePersistentState('pedidos', pedidosIniciais);
  const [estoque, setEstoque] = usePersistentState('estoque', estoqueInicial);

  const props = {
    produtos, setProdutos,
    clientes, setClientes,
    pedidos, setPedidos,
    estoque, setEstoque,
    setPagina,
  };

  const paginas = {
    dashboard: <Dashboard {...props} />,
    pedidos: <Pedidos {...props} />,
    produtos: <Produtos {...props} />,
    clientes: <Clientes {...props} />,
    estoque: <Estoque {...props} />,
  };

  return (
    <div className="app">
      <Sidebar pagina={pagina} setPagina={setPagina} />
      <main className="conteudo">{paginas[pagina]}</main>
    </div>
  );
}
