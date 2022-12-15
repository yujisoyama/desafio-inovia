import { AllProducts } from "../components/AllProducts"
import { Footer } from "../components/Footer"
import { ProductsHeader } from "../components/ProductsHeader"

export const ProductsPage = () => {
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto">
            <ProductsHeader />
            <AllProducts />
            <div className="fixed w-full bottom-0">
                <Footer />
            </div>
        </div>
    )
}
