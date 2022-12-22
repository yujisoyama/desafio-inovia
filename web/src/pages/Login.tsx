import { Footer } from '../components/common/Footer'
import { LoginHeader } from '../components/common/LoginHeader'
import { LoginForm } from '../components/LoginPage/LoginForm'

export const Login = () => {
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto flex flex-col justify-between">
            <LoginHeader />
            <LoginForm />
            <Footer />
        </div>
    )
}
