import './App.css'
import Navbar from "./Components/Navbar.tsx";
import Catalogo from "./Components/Catalogo.tsx";

function App() {

  return (
    <div className="App flex flex-col w-full gap-2">
        <Navbar />
        <Catalogo />
    </div>
  )
}

export default App
