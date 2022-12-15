import { Triangle } from 'react-loader-spinner'

export const Loading = () => {
    return (
        <div className='flex h-full justify-center items-center'>
            <Triangle
                height="80"
                width="80"
                color="#39DCC1"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                visible={true}
            />
        </div>
    )
}