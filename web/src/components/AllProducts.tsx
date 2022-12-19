import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProducts, IProduto, selectAllProducts } from "../store/reducers/allProductsSlice";
import { selectFilter } from "../store/reducers/filterSlice";
import { useAppDispatch } from "../store/store";
import { Loading } from "./Loading";
import { Product } from "./Product";

export const AllProducts = () => {
    const [filteredProducts, setFilteredProducts] = useState<IProduto[]>([]);
    const allProducts = useSelector(selectAllProducts);
    const filter = useSelector(selectFilter);
    const dispatch = useAppDispatch();

    const fetchProducts = () => {
        dispatch(getProducts());
    }

    const filterProducts = () => {
        setFilteredProducts(allProducts.filter((product) => {
            return product.nome.toLowerCase().includes(filter.toLowerCase()) || product.marca.toLowerCase().includes(filter.toLowerCase());
        }))
    }

    useEffect(() => {
        if (!allProducts.length) {
            fetchProducts();
        }
        console.log(filteredProducts);
        
        setFilteredProducts(allProducts);
        filterProducts();
    }, [filter, allProducts])

    if (!allProducts.length) {
        return <Loading />
    }

    return (
        <div className="mx-14 mt-14 mb-20 flex flex-wrap justify-center gap-14">
            {filteredProducts.map(product => <Product imagem={product.imagem} nome={product.nome} marca={product.marca} sobre={product.sobre} preco={product.preco} estoque={product.estoque} id={product._id} key={product._id} />)}
        </div>
    )
}
