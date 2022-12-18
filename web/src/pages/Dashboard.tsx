import { Footer } from '../components/Footer'
import { MainHeader } from '../components/MainHeader'

export const Dashboard = () => {
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto flex flex-col justify-between">
            Dashboard
            <div className="fixed w-full bottom-0">
                <MainHeader />
                <Footer />
            </div>
        </div>
    )
}
