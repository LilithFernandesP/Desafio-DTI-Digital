import React, {useEffect, useState} from 'react'
import Card from "./Card.tsx";
import ItemCard from "./ItemCard.tsx";
import InformacoesCarrinho from "./InformacoesCarrinho.tsx";

// Renderiza a div que mostra os itens presentes no carrinho, ele recebe os itens, além do carrinho e uma função para atualizar a quantidade de itens
const CarrinhoItens = ({itens, carrinho, atualizarQuantidade}) => {

    return (
        <div className="w-full flex flex-col sm:flex-row gap-5 p-2 sm:p-10">
            <div className='border w-full rounded-xl border-[#E79525] p-6'>
                {itens.map((item: any) => (
                    <ItemCard key={item.id} item={item} atualizarQuantidade={atualizarQuantidade}/>
                ))}
            </div>

        </div>
    )
}
export default CarrinhoItens
