import {useEffect, useState} from 'react'
import Navbar from "../Components/Navbar.tsx";
import CarrinhoItens from "../Components/CarrinhoItens.tsx";
import InformacoesCarrinho from "../Components/InformacoesCarrinho.tsx";
import {toast, ToastContainer} from "react-toastify";


// essa é a página carrinho, ela guarda as funções mais importantes que são: pegar carrinho e atualizar quantidade do item no carrinho.
// os outros componentes apenas chamam essas funções ou apenas dão fetch nas informações com base nas funções dessa página

const Carrinho = () => {
    const [carrinho, setCarrinho] = useState(null)
    const carrinhoId = "58F33A6D-9A2B-448A-93BF-D4E861CB27C2"
    const fetchCarrinho = async () => {
        try {
            const carrinho = await fetch(`https://localhost:7091/Carrinho/${carrinhoId}`);
            if (!carrinho.ok) {
                throw new Error('Falha ao buscar o carrinho');
            }
            const carrinhoData = await carrinho.json();  // Espera a resolução da Promise

            if (!carrinhoData) {
                console.log("Dados do carrinho estão vazios");
            }
            setCarrinho(carrinhoData);
        } catch (error) {
            console.error("Erro na requisição: ", error);
        }

    }
    const finalizarCarrinho = async () => {
        try{
            await fetch(`https://localhost:7091/Carrinho/${carrinhoId}/finalizar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success(`Carrinho finalizado!`)
            fetchCarrinho();
        }catch(error){}
    }
    // Função para atualizar a quantidade de um item no carrinho
    const atualizarQuantidade = async (itemId, novaQuantidade) => {
        try {
            const response = await fetch(`https://localhost:7091/CarrinhoItem/itens/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantidade: novaQuantidade,
                }),
            });

            if (response.ok) {
                console.log('Quantidade atualizada com sucesso!');
                fetchCarrinho();  // Atualiza o carrinho após a alteração na quantidade
            } else {
                console.log('Erro ao atualizar a quantidade');
            }
        } catch (err) {
            console.log('Erro ao atualizar a quantidade:', err);
        }
    };

    useEffect(() => {
        fetchCarrinho()
    }, [])


    return (
        <div>
            <Navbar/>
            <div className="w-full flex flex-col sm:flex-row gap-5 p-2 sm:p-10">
                {carrinho ? (<CarrinhoItens itens={carrinho.itens} carrinho={carrinho}
                                            atualizarQuantidade={atualizarQuantidade}/>) : "Itens não encontrados"}
                <div className="w-full p-6 flex flex-col items-center">
                    <InformacoesCarrinho carrinho={carrinho}/>
                    <button onClick={finalizarCarrinho} className='bg-[#E4E95D] w-[80%] rounded-xl transition duration-75 active:scale-95 hover:scale-105'>Finalizar Carrinho</button>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </div>
    )
}
export default Carrinho
