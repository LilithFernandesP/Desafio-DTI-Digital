import React, {useEffect, useState} from 'react'

// Mostra as informações do carrinho com a quantidade de cada item, valor e total. Aqui eu utilizei o Chatgpt para me ajudar a criar o fetchprodutos
// eu não tinha certeza da melhor forma de pegar os produtos para mostrar as informações aqui
const InformacoesCarrinho = ({carrinho}) => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            const produtosDetalhados = await Promise.all(
                carrinho.itens.map(async (item) => {
                    const produto = await fetch(`https://localhost:7091/Produto/${item.produtoId}`)
                        .then(res => res.json());
                    return {
                        ...item,
                        produto,
                    };
                })
            );
            setProdutos(produtosDetalhados);
        };

        fetchProdutos();
    }, [carrinho]);

    return (
        <div className='w-full'>
            <div className="w-full flex flex-col gap-6">
                <h1 className='text-xl'>Detalhes da compra</h1>
                <div className="bg-[#EDBD7D] w-full flex flex-col p-5 rounded-xl ">
                    {produtos.length > 1 ? <p className='font-bold text-[18px]'>{produtos.length} Itens</p> : <p className='font-bold text-[18px]'>{produtos.length} Item</p>}

                    {produtos.length === 0 ? (
                        <p>O carrinho está vazio.</p>
                    ) : (
                        produtos.map((item) => (
                            <div key={item.id} className="flex justify-between py-2">
                                <div className="flex gap-2">
                                <p>{item.quantidade}x</p>
                                <p>{item.produto.nome}</p>
                                </div>
                                <p>Preço: R$ {item.produto.preco}</p>
                            </div>
                        ))
                    )}
                    <hr className="border-1 border-[#E79525] my-4"/>
                    <div className="flex w-full justify-between">
                        <strong>Total: </strong>
                        {produtos.reduce(
                            (total, item) => total + item.produto.preco * item.quantidade,
                            0
                        ).toFixed(2)}
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
export default InformacoesCarrinho
