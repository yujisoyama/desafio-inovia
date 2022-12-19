import { Footer } from "../components/Footer"
import { MainHeader } from "../components/MainHeader"
import { ProfileInfo } from "../components/ProfileInfo"

export const Profile = () => {
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto">
            <MainHeader />
            <ProfileInfo />
            <div className="fixed w-full bottom-0">
                <Footer />
            </div>
        </div>
    )
}
