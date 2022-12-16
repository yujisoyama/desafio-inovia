import { useEffect, useState } from "react";
import { api } from "../Api";
import { Product } from "./Product";

interface ICaracteristica {
    nome: string;
    descricao: string;
    valor: string;
}
interface IProduto {
    _id: string;
    nome: string;
    sobre: string;
    preco: number;
    marca: string;
    imposto: number;
    estoque: number;
    imagem: string;
    caracteristicas: ICaracteristica[];
}

export const AllProducts = () => {
    const [allProducts, setAllProducts] = useState<IProduto[]>([]);

    const fetchProducts = async () => {
        const result = await api.get('/produtos');
        setAllProducts(result.data);
    }

    useEffect(() => {
        fetchProducts(); 
    }, [])

    return (
        <div className="m-14 flex flex-wrap justify-center gap-14">
            {allProducts.map(product => <Product imagem={product.imagem} nome={product.nome} marca={product.marca} sobre={product.sobre} preco={product.preco} estoque={product.estoque} key={product._id} />)}
        </div>
    )
}
