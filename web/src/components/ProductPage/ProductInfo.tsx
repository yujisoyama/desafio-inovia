import { FormEvent, useEffect, useState } from "react";
import { api } from "../../Api";
import { IProduto } from "../../store/reducers/allProductsSlice";
import { Caracteristicas } from "./Caracteristicas";
import { Loading } from "../common/Loading";
import { PrimaryButton } from "../common/PrimaryButton";
import SelectQuantity from "./SelectQuantity";
import image404 from '../../../assets/erro404.png'
import { useCliente } from "../../context/ClienteContext";
import { useAppDispatch } from "../../store/store";
import { addCartProduct } from "../../store/reducers/shoppingCartSlice";

interface IProductInfoProps {
    productId: string;
}

export const ProductInfo = ({ productId }: IProductInfoProps) => {
    const { cliente } = useCliente();
    const [produto, setProduto] = useState<IProduto>();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();

    const fetchProduct = async (productId: string) => {
        try {
            const result = await api.get(`/produtos/${productId}`);
            setProduto(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddToCart = async (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const form = Object.fromEntries(formData);
        dispatch(addCartProduct({
            produtoId: produto!._id,
            nome: produto!.nome,
            quantidade: Number(form.quantidade),
            preco: Number(((produto!.preco) * (1 + (produto!.imposto / 100))).toFixed(0)),
            imagem: produto!.imagem
        }));
    }

    useEffect(() => {
        fetchProduct(productId);
    }, [])

    if (isLoading) {
        return <Loading />
    }

    if (!produto) {
        return (
            <div className="text-center text-highlight my-10 text-5xl text-open">
                <img className="mx-auto" src={image404} alt="404" />
                <p>Produto n??o encontrado</p>
            </div>
        )
    }

    const renderDisponibility = (estoque: number) => {
        if (estoque === 0) {
            return (
                <div className="text-alert text-center">
                    <p>Sem estoque</p>
                    <p>Produto indispon??vel :(</p>
                </div>
            )
        }

        return (
            <>
                <div>
                    <p>Produto dispon??vel:</p>
                    <p className="text-secondary">Restam {estoque} unidades</p>
                </div>
                {cliente.nome ? (
                    <form onSubmit={handleAddToCart}>
                        <div className="flex gap-4 items-center">
                            <p>Quantidade: </p>
                            <SelectQuantity name="quantidade" quantity={estoque} />
                        </div>
                        <div className="mt-14 mx-auto">
                            <PrimaryButton label='Adicionar ao carrinho' type='submit' />
                        </div>
                    </form>
                ) : (
                    <div className="mt-10 text-highlight">
                        <p>Fa??a o login para comprar os produtos!</p>
                    </div>
                )}
            </>
        )
    }

    return (
        <div className="mt-10 mb-16 mx-4 flex flex-wrap justify-evenly gap-4 mobile:m-10 text-main">
            <div className="flex flex-wrap justify-center">
                <img className="max-h-[545px]" src={produto?.imagem} alt="produto" />
                <div className="w-96 flex flex-col gap-5 mt-4 mobile:w-[300px]">
                    <h1 className="text-4xl">{produto?.nome}</h1>
                    <h2 className="text-secondary text-xl">Marca: {produto?.marca}</h2>
                    <p className="text-secondary text-justify">{produto?.sobre}</p>
                    {produto?.caracteristicas.length ? (
                        <>
                            <p>Caracter??sticas adicionais:</p>
                            {produto.caracteristicas.map(caracteristica => <Caracteristicas key={caracteristica.nome} nome={caracteristica.nome} descricao={caracteristica.descricao} valor={caracteristica.valor} />)}
                        </>
                    ) : (<></>)}
                </div>
            </div>
            <div className="w-72 mt-4 flex flex-col gap-6 border p-8 border-highlight rounded-lg h-96">
                <p className="text-3xl text-highlight"><span className="align-text-top text-xs">R$</span> {(produto?.preco! / 100).toFixed(2)}</p>
                <p>Imposto: {produto?.imposto}%</p>
                {renderDisponibility(produto?.estoque!)}
            </div>
        </div>
    )
}
