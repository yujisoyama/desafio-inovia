import { useParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { MainHeader } from '../components/MainHeader'

export const EditOrderPage = () => {
    const params = useParams()
    
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto flex flex-col">
            <MainHeader />
            
            <div className="fixed w-full bottom-0">
                <Footer />
            </div>
        </div>
    )
}
