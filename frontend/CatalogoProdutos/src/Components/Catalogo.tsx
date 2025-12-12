import {useEffect, useState} from "react";

const Catalogo =  () => {
    const [Produtos, setProdutos] = useState([])

    const fetchProdutos = async () => {
        try{
            const produtos = await fetch('https://localhost:7091/Produto')
            const data = await produtos.json()
            console.log(data)
            setProdutos(data)
        }catch(err){
            console.log(err)
        }
    }



    useEffect(() => {
        fetchProdutos();
    }, []);
    return (
        <div>

        </div>
    )
}
export default Catalogo
