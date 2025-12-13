import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";

// Esse card recebe UM produto e gera um card para mostrar no catálogo.
const Card = ({produto}) => {
    const [quantidade, setQuantidade] = useState(1);
    // Como não fiz login, estou utilizando um carrinho de exemplo
    const carrinhoId = "58F33A6D-9A2B-448A-93BF-D4E861CB27C2"

    const incrementarQuantidade = () => {
        setQuantidade(prevQuantidade => (prevQuantidade < 10 ? prevQuantidade + 1 : 10));
    }
    const decrementarQuantidade = () => {
        setQuantidade(prevQuantidade => (prevQuantidade > 1 ? prevQuantidade - 1 : 1));
    }

    // Para garantir que o input manual não seja menor ou maior que 10
    const handleChange = (e) => {
        const valor = Number(e.target.value);
        if (valor >= 1) {
            setQuantidade(valor);
        } else {
            setQuantidade(1);
        }
        if (valor <= 10) {
            setQuantidade(valor);
        } else {
            setQuantidade(10);
        }
    };

    async function AdicionarAoCarrinho() {
        const body = {
            produtoId: produto.id,
            quantidade: quantidade,
        };

        try {
            const response = await fetch(`https://localhost:7091/CarrinhoItem/${carrinhoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar ao carrinho');
            }

            const data = await response.json();
            console.log('Produto adicionado ao carrinho:', data);
            toast.success(`${quantidade} ${produto.nome} adicionado ao carrinho`)
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho:', error);
        }
    }


    return (
        <div>
            <div className=" block w-60 p-6 border border-default rounded-xl shadow-xl">

                <div className=" flex w-full justify-center  rounded-xl">
                    <a href="#">
                        {produto.imagem ?
                            <img className='w-[160px] h-[160px] rounded-base' src={produto.imagem} alt={produto.nome}/>
                        : <img className='w-[160px] h-[160px] rounded-base' src="NoImage.jpg" alt=""/>
                        }
                    </a>
                </div>
                <a href="#">
                    <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading truncate ">{produto.nome}</h5>
                </a>
                <div className='w-full flex justify-center'>
                    <p className='text-2xl p-2 font-bold'>R$ {produto.preco}</p>
                </div>
                <div className="flex w-full justify-between gap-4 text-2xl">

                    <div className='flex gap-4 content-center justify-center items-center mb-5 border rounded-md p-2'>
                        <button
                            className="flex justify-center rounded-xl px-2 bg-[#E79525] transform active:scale-125 transition-all duration-50  active:bg-amber-400 "
                            onClick={decrementarQuantidade}>-
                        </button>
                        <input
                            type="number"
                            value={quantidade}
                            onChange={handleChange}
                            min="1"
                            className=" w-10 text-center"
                        />

                        <button
                            className="flex justify-center rounded-xl px-2 bg-[#E79525] transform active:scale-125 transition-all duration-50  active:bg-amber-400 "
                            onClick={incrementarQuantidade}>+
                        </button>

                        <button onClick={AdicionarAoCarrinho}>
                            <i className="las la-cart-plus text-4xl   hover:text-lime-500 hover:drop-shadow-md transform active:scale-125 transition-all duration-50 drop-shadow-lime-500/50"></i>
                        </button>

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
        </div>
    )
}
export default Card
