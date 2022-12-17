import { ShoppingCartSimple } from 'phosphor-react'

export const ShoppingCart = () => {
    return (
        <div className='p-2 rounded-lg border border-background hover:cursor-pointer hover:border-highlight duration-100 flex items-center gap-2 text-highlight font-noto font-extrabold'>
            <p>12</p>
            <ShoppingCartSimple size={40} color="#1de9b6" weight="bold" />
        </div>
    )
}
