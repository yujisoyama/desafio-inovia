import { AllProducts } from "../components/AllProductsPage/AllProducts"
import { Footer } from "../components/common/Footer"
import { MainHeader } from "../components/common/MainHeader"

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
