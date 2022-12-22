import { useParams } from 'react-router-dom'
import { EditOrderInfo } from '../components/EditOrderInfo'
import { Footer } from '../components/Footer'
import { MainHeader } from '../components/MainHeader'

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
