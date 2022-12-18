import { Avatar } from "./Avatar"
import { ShoppingCart } from "./ShoppingCart"


export const LoggedHeader = () => {
    return (
        <div className='flex gap-2 items-center'>
            <ShoppingCart />
            <Avatar />
        </div>
    )
}

