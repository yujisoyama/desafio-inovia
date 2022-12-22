interface IOrderProductsProps {
    produtoId: string;
    nome: string;
    preco: number;
    quantidade: number;
}

export const OrderProducts = ({ produtoId, nome, preco, quantidade }: IOrderProductsProps) => {
    return (
        <div className="w-4/5 grid grid-cols-4 text-start mobile:text-[9px] mobile:w-full">
            <p>{nome}</p>
            <p>{quantidade}</p>
            <p>R$ {(preco / 100).toFixed(2)}</p>
            <p>R$ {(preco * quantidade / 100).toFixed(2)}</p>
        </div>
    )
}
