import {useEffect, useState} from "react";
import Card from "./Card.tsx";

const Catalogo = () => {
    const [Produtos, setProdutos] = useState([])

    const fetchProdutos = async () => {
        try {
            const produtos = await fetch('https://localhost:7091/Produto')
            const data = await produtos.json()
            console.log(data)
            setProdutos(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProdutos();
    }, []);
    return (
        <div className="w-full flex flex-col gap-5 p-10">
            <h1 className='text-3xl font-bold'>CATÁLOGO</h1>
            <div className="flex gap-5">
                {Produtos.map((produto) => (
                    <Card key={produto.id} produto={produto}/> // Criando um Card diretamente
                ))}
            </div>
        </div>
    )
}
export default Catalogo
