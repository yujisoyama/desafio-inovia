import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AllProducts } from "../components/AllProducts"
import { Footer } from "../components/Footer"
import { MainHeader } from "../components/MainHeader"
import { getProducts, selectAllProducts } from "../store/reducers/allProductsSlice";
import { useAppDispatch } from "../store/store";

export const AllProductsPage = () => {
    
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto">
            <MainHeader />
            <AllProducts />
            <div className="fixed w-full bottom-0">
                <Footer />
            </div>
        </div>
    )
}
