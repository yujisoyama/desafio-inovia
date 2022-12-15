import { Footer } from '../components/Footer'
import { LoginHeader } from '../components/LoginHeader'
import { LoginForm } from '../components/LoginForm'

export const Login = () => {
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto flex flex-col justify-between">
            <LoginHeader />
            <LoginForm />
            <Footer />
        </div>
    )
}
