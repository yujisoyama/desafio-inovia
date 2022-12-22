import { Footer } from "../components/common/Footer"
import { LoginHeader } from "../components/common/LoginHeader"
import { SignUpForm } from "../components/SignUpPage/SignUpForm"


export const SignUp = () => {
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto flex flex-col justify-between">
            <LoginHeader />
            <SignUpForm />
            <Footer />
        </div>
    )
}
