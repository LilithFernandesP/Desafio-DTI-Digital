import './App.css'
import Navbar from "./Components/Navbar.tsx";
import Catalogo from "./Components/Catalogo.tsx";

// O app começa aqui, renderizando o catálogo, pela navbar você pode acessar a página Carrinho
function App() {

  return (
    <div className="App flex flex-col w-full gap-2">
        <Navbar />
        <div className="flex flex-col w-full">
        <Catalogo />
        </div>

    </div>
  )
}

export default App
