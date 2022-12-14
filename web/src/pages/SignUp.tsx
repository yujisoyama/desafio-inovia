import { Footer } from "../components/Footer"
import { HomeHeader } from "../components/HomeHeader"
import { SignUpForm } from "../components/SignUpForm"


export const SignUp = () => {
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto flex flex-col justify-between">
            <HomeHeader />
            <SignUpForm />
            <Footer />
        </div>
    )
}
