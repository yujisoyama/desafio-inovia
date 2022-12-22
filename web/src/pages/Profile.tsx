import { Footer } from "../components/common/Footer"
import { MainHeader } from "../components/common/MainHeader"
import { ProfileInfo } from "../components/ProfilePage/ProfileInfo"

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
