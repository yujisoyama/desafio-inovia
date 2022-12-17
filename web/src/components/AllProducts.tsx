import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../Api";
import { getProducts, selectAllProducts } from "../store/reducers/allProductsSlice";
import { useAppDispatch } from "../store/store";
import { Loading } from "./Loading";
import { PrimaryButton } from "./PrimaryButton";
import { Product } from "./Product";
import { SecondaryButton } from "./SecondaryButton";


export const AllProducts = () => {
    const allProducts = useSelector(selectAllProducts);
    const dispatch = useAppDispatch();

    const fetchProducts = () => {
        dispatch(getProducts());
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    if (!allProducts.length) {
        return <Loading />
    }

    return (
        <div className="m-14 flex flex-wrap justify-center gap-14">
            {allProducts.map(product => <Product imagem={product.imagem} nome={product.nome} marca={product.marca} sobre={product.sobre} preco={product.preco} estoque={product.estoque} id={product._id} key={product._id} />)}
        </div>
    )
}
