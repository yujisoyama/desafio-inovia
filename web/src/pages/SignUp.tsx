import { Footer } from "../components/Footer"
import { LoginHeader } from "../components/LoginHeader"
import { SignUpForm } from "../components/SignUpForm"


export const SignUp = () => {
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto flex flex-col justify-between">
            <LoginHeader />
            <SignUpForm />
            <Footer />
        </div>
    )
}
