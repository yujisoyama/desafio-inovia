import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./PrimaryButton"
import { SecondaryButton } from "./SecondaryButton"

export const NotLoggedHeader = () => {
    const navigate = useNavigate();

    const goToLogin = () => navigate('/login');
    const goToSignUp = () => navigate('/signup');
    
    return (
        <>
            <div className='w-20'>
                <PrimaryButton label='Login' onClick={goToLogin} />
            </div>
            <div className='w-32'>
                <SecondaryButton label='Cadastre-se' onClick={goToSignUp} />
            </div>
        </>
    )
}
