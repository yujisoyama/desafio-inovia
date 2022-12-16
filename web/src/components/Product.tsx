
interface IProductProps {
    imagem: string;
    nome: string;
    sobre: string;
    preco: number;
    marca: string;
    estoque: number;
}

export const Product = ({ imagem, nome, sobre, preco, marca, estoque }: IProductProps) => {
    return (
        <div className="w-72 rounded-md border-2 border-highlight bg-background p-4 font-noto text-main flex flex-col gap-2 hover:cursor-pointer hover:shadow-[0px_0px_10px_0px_#1de9b6] duration-150">
            <img className="mx-auto" src={imagem} alt="product" />
            <h1 className="font-bold text-center text-lg">{nome}</h1>
            <h2 className="text-secondary ">Marca: {marca}</h2>
            <p className="truncate text-xs">{sobre}</p>
            <div className="mt-3 flex items-center justify-around">
                <p className="text-lg text-highlight"><span className="align-text-top text-xs">R$</span> {(preco / 100).toFixed(2)}</p>
                <div className="text-secondary text-sm">
                    <p>Em estoque</p>
                    <p>({estoque} unidades)</p>
                </div>
            </div>
        </div>
    )
}

