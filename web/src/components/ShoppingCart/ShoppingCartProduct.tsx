import { Trash } from "phosphor-react";
import { removeCartProduct } from "../../store/reducers/shoppingCartSlice";
import { useAppDispatch } from "../../store/store";

interface IShoppingCarProductsProps {
    produtoId: string;
    nome: string;
    quantidade: number;
    preco: number;
    imagem: string;
}

export const ShoppingCartProduct = ({ produtoId, nome, quantidade, preco, imagem }: IShoppingCarProductsProps) => {
    const dispatch = useAppDispatch();

    const handleRemoveProduct = () => {
        dispatch(removeCartProduct(produtoId));
    }

    return (
        <div className="border-b border-b-background w-full py-2">
            <div className="flex justify-between">
                <img className="w-20" src={imagem} alt="" />
                <div className="w-52 flex flex-col justify-around">
                    <p className="text-sm text-main ">{nome}</p>
                    <p className="text-xs text-secondary">{quantidade} unidade(s)</p>
                    <p className="text-xs text-highlight">R$ {preco * quantidade / 100} (valor com imposto)</p>
                </div>
                <div className="flex justify-center items-center mr-2">
                    <Trash onClick={handleRemoveProduct} className="hover:cursor-pointer" size={32} color="#EF4565" weight="regular" />
                </div>
            </div>
        </div>
    )
}
