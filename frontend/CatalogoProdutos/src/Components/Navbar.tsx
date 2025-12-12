
const Navbar = () => {
    return (
        <div className="Navbar flex items-center h-[58px] bg-[#EDBD7D] w-full">
            <div className="flex justify-between w-full px-5">
            <h1 className='text-[28px]'>TakeToPay</h1>
            <ul className='flex gap-5'>
                <li><i className="las la-home"></i></li>
                <li><i class="las la-shopping-cart"></i></li>
                <li><i className="las la-user-alt"></i></li>
            </ul>
            </div>
        </div>
    )
}
export default Navbar
