import {useEffect, useState} from 'react'

// @ts-ignore
// renderiza UM item, recebe o item e a função
const ItemCard = ({item, atualizarQuantidade}) => {
    const [produto, setProduto] = useState({})
    const imagem = produto.imagem || 'https://via.placeholder.com/150';
    const [quantidade, setQuantidade] = useState(item.quantidade);


    const incrementarQuantidade = async () => {
        const novaQuantidade = quantidade < 10 ? quantidade + 1 : 10;
        setQuantidade(novaQuantidade);
        await atualizarQuantidade(item.id, novaQuantidade);
    }
    const decrementarQuantidade = async () => {
        const novaQuantidade = quantidade > 1 ? quantidade - 1 : 1;
        setQuantidade(novaQuantidade);
        await atualizarQuantidade(item.id, novaQuantidade);
    }
    const DeletarItem = async () => {
        const novaQuantidade = 0;
        setQuantidade(novaQuantidade);
        await atualizarQuantidade(item.id, novaQuantidade);
    }

    const fetchProduto = async () => {
        try {
            const produto = await fetch(`https://localhost:7091/Produto/${item.produtoId}`)
            const data = await produto.json()
            setProduto(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchProduto()
    }, [])

    return (
        <div>
            <div className="sm:max-w-[600px] w-full flex gap-6">
                <div className="image min-w-30 h-30 sm:min-w-40 sm:h-40 rounded-lg bg-[#E79525]">
                    <a href="#">
                        {imagem?
                            <img className='w-full h-full object-cover' src={produto.imagem} alt={produto.nome}/>
                            : <img className='w-full h-full object-cover' src="NoImage.jpg" alt=""/>
                        }
                    </a>
                </div>
                <div className="descricao flex flex-col gap-6 w-full">
                    <div className="top flex gap-1 flex-col">
                        <div className='flex justify-between'>
                            <h1 className='text-xl'>{produto.nome}</h1>
                            <button onClick={DeletarItem}><i className="las la-trash text-2xl transform active:scale-109 transition-all duration-150 hover:drop-shadow-md"></i></button>
                        </div>
                        <p className="font-thin">{produto.descricao}</p>
                    </div>
                    <div className="bottom flex justify-between">
                        <p>${produto.preco}</p>
                        <div className="flex gap-4 text-xl">
                            <button className="flex justify-center rounded-xl px-2 bg-[#E79525] transform active:scale-109 transition-all duration-150  active:bg-amber-400 " onClick={decrementarQuantidade}>-</button>
                            <p className=' w-2 flex justify-center'>{quantidade}</p>
                            <button className="flex justify-center rounded-xl px-2 bg-[#E79525] transform active:scale-109 transition-all duration-150 active:bg-amber-400" onClick={incrementarQuantidade}>+</button>
                        </div>
                    </div>
                </div>

            </div>
            <hr className="border-1 border-[#E79525] my-4"/>
        </div>
    )
}
export default ItemCard
