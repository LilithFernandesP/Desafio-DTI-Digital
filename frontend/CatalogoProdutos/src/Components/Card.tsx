import {useState} from "react";

const Card = ({produto}) => {
    const [showModal, setShowModal] = useState(false);
    const [quantidade, setQuantidade] = useState(1);
    const carrinhoId = "9E2B609C-DD63-4CD3-A683-822837340D1B"
    const abrirModal = () => setShowModal(true);
    const fecharModal = () => setShowModal(false);

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
            fecharModal();
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho:', error);
        }
    }


    return (
        <div>
            <div
                className=" block w-60 p-6 border border-default rounded-xl shadow-xl">
                <div className="flex w-full justify-center  rounded-xl">
                <a href="#">
                    {produto.imagem &&
                        <img className='w-[160px] h-[160px] rounded-base' src={produto.imagem} alt={produto.nome}/>}
                </a>
                </div>
                <a href="#">
                    <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">{produto.nome}</h5>
                </a>
                <div className="flex w-full justify-end gap-4">
                    <p>R$ {produto.preco}</p>
                    <button onClick={abrirModal}><i class="las la-plus-circle"></i></button>
                </div>

            </div>
            {showModal && (
                <div className="fixed inset-0 bg-amber-950/50  flex justify-center items-center">
                    <div className="bg-[#EDBD7D] p-6 rounded-lg">
                        <h2 className="text-xl mb-4">Selecione a Quantidade</h2>
                        <input
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                            min="1"
                            className="border p-2 rounded-md mb-4 w-24"
                        />
                        <div className="flex justify-end gap-4">
                            <button onClick={fecharModal} className="bg-gray-500 text-white p-2 rounded-md">Cancelar</button>
                            <button
                                onClick={AdicionarAoCarrinho}
                                className="bg-blue-500 text-white p-2 rounded-md"
                            >
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Card
