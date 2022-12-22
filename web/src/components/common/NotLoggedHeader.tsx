import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./PrimaryButton"
import { SecondaryButton } from "./SecondaryButton"

export const NotLoggedHeader = () => {
    const navigate = useNavigate();

    const goToLogin = () => navigate('/login');
    const goToSignUp = () => navigate('/signup');
    
    return (
        <div className="flex gap-3 items-center mobile:w-full">
            <div className='w-20 mobile:w-1/2'>
                <PrimaryButton label='Login' onClick={goToLogin} />
            </div>
            <div className='w-36 mobile:w-1/2'>
                <SecondaryButton label='Cadastre-se' onClick={goToSignUp} />
            </div>
        </div>
    )
}
