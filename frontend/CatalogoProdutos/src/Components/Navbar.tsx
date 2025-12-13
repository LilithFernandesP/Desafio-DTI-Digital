import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    function onCartClick() {
        navigate("/Carrinho");
    }
    function onHomeClick() {
        navigate("/");
    }
    return (
        <div className="Navbar flex items-center h-[58px] bg-[#EDBD7D] w-full">
            <div className="flex justify-between w-full px-5">
            <h1 className='text-[28px]'>TakeToPay</h1>
            <ul className='flex gap-5'>
                <li><button onClick={onHomeClick}><i className="las la-home"></i></button></li>
                {/*aqui eu poderia passar o id do carrinho, ou passar o usuário por padrão pra todas as páginas*/}
                <li><button onClick={onCartClick}><i class="las la-shopping-cart"></i></button></li>
                <li><i className="las la-user-alt"></i></li>
            </ul>
            </div>
        </div>
    )
}
export default Navbar
