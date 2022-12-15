import logo from '../../assets/logoinovia.png'

export const LoginHeader = () => {
    return (
        <div className="bg-background font-open flex items-center justify-between px-5 min-h-[72px]">
            <img src={logo} alt="inovia" className='w-28' />
            <p className="text-secondary">Approaching Technologies</p>
        </div>
    )
}
