import { SignIn } from "phosphor-react"
import { FormEvent } from "react"
import { Link } from "react-router-dom"
import { CancelButton } from "./CancelButton"
import { ConfirmButton } from "./ConfirmButton"
import { TextInput } from "./TextInput"

export const LoginForm = () => {
    const handleLogin = (event: FormEvent) => {
        console.log('click');
    }

    return (
        <div className="w-[400px] p-8 mx-auto my-12 opacity-95 rounded-[15px] bg-background font-open relative mobile:w-[300px] mobile:my-16 mobile:p-4">
            <SignIn className="mx-auto" size={40} color="#fffffe" weight="bold" />
            <h1 className="text-main text-center font-extrabold text-2xl mt-3 mb-7">Login to your account</h1>
            <div>
                <form className="flex flex-col gap-6 relative">
                    <TextInput label='login' type='text' />
                    <TextInput label='password' type='password' />
                    <ConfirmButton label='login' isLoading={false} onClick={handleLogin} />
                    <CancelButton label='login' isLoading={false} onClick={handleLogin} />
                    <div className="text-sm text-secondary font-semibold w-full text-center flex justify-center gap-3 mobile:gap-2">
                        <p className="inline">New to the platform?</p>
                        <p><Link to="/signup" className="text-main hover:underline">Sign Up for free!</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}