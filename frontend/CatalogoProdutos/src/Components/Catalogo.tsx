import React, {useEffect, useState} from "react";
import Card from "./Card.tsx";
import {OrbitProgress} from "react-loading-indicators";
import Search from "./Search.tsx";
import {useDebounce} from 'react-use';
// Aqui se renderiza todos os produtos com seus cards
const Catalogo = () => {
    const [Produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

    const fetchProdutos = async (query = '') => {
        try {
            setLoading(true)
            const url = "https://localhost:7091/Produto"
            const endpoint = query
                ? `${url}?query=${encodeURIComponent(query)}`
                : `${url}`

            const produtos = await fetch(endpoint)
            const data = await produtos.json()
            console.log(data)
            setProdutos(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProdutos(debouncedSearchTerm);
    }, [debouncedSearchTerm]);
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-5 p-10">
            {loading ?
                <div className="flex w-full justify-center h-full items-center"><OrbitProgress variant="dotted"
                                                                                               color="#32cd32"
                                                                                               size="medium"
                                                                                               text="TakePay"
                                                                                               textColor=""/></div>
                :
                <div className='w-full flex flex-col gap-10'>
                    <div className="flex flex-col items-center" >
                    <h1 className='text-3xl font-bold'>CATÁLOGO</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    </div>


                    <div className="flex sm:flex-row flex-wrap flex-col gap-5 ">
                            {Produtos.map((produto) => (
                                <Card key={produto.id} produto={produto}/> // Criando um Card diretamente

                            ))}
                    </div>

                </div>}
        </div>
    )
}
export default Catalogo
