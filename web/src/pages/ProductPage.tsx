import { useParams } from "react-router-dom"
import { Footer } from "../components/common/Footer"
import { MainHeader } from "../components/common/MainHeader"
import { ProductInfo } from "../components/ProductPage/ProductInfo"

export const ProductPage = () => {
    const params = useParams()

    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto">
            <MainHeader />
            <ProductInfo productId={params.productId!} />
            <div className="fixed w-full bottom-0">
                <Footer />
            </div>
        </div>
    )
}
