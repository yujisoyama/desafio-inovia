import logo from '../../assets/logoinovia.png'
import { Footer } from '../components/Footer'
import { HomeHeader } from '../components/HomeHeader'
import { LoginForm } from '../components/LoginForm'

export const SignIn = () => {
    return (
        <div className="bg-backgroundLight w-screen h-screen overflow-y-auto flex flex-col justify-between">
            <HomeHeader />
            <LoginForm />
            <Footer />
        </div>
    )
}
