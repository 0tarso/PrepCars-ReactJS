import { BounceLoader } from 'react-spinners'

const Spinner = () => {
    return (
        <div className="flex items-center justify-center">
            <BounceLoader
                color="#ff0000"
                size={50}
            />
        </div>
    )
}

export default Spinner