import { AllProducts } from "../components/AllProducts"
import { Footer } from "../components/Footer"
import { MainHeader } from "../components/MainHeader"

export const ProductsPage = () => {
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
