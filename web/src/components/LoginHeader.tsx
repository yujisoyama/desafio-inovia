import { Logo } from './Logo';

export const LoginHeader = () => {
    return (
        <div className="bg-background font-open flex items-center justify-between px-5 min-h-[72px]">
            <Logo />
            <p className="text-secondary">Approaching Technologies</p>
        </div>
    )
}
