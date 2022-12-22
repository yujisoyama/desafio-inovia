import { useParams } from 'react-router-dom'
import { EditOrderInfo } from '../components/EditOrderPage/EditOrderInfo'
import { Footer } from '../components/common/Footer'
import { MainHeader } from '../components/common/MainHeader'

export const EditOrderPage = () => {
    const params = useParams()

    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto flex flex-col">
            <MainHeader />
            <EditOrderInfo pedidoId={Number(params.pedidoId)} />
            <div className="fixed w-full bottom-0">
                <Footer />
            </div>
        </div>
    )
}
