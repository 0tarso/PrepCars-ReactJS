//Assets
import logoImg from '../../assets/logo.png'
import imgHelmet from '../../assets/capacete.png'

//React
import { useContext } from 'react'
import { Link } from 'react-router-dom'

//Icons
import { FiLogIn } from 'react-icons/fi'

//Context
import { AuthContext } from '../../contexts/AuthContext'

const Header = () => {
    const { signed, loadingAuth, user } = useContext(AuthContext)
    const firstNameUser = String(user?.name).split(" ", 1)

    return (
        <div className="w-full flex items-center justify-center h-16 bg-[rgba(7,7,7,1)] drop-shadow-xl mb-4 sticky top-0 z-50">

            <header className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto">

                <Link to="/">
                    <img className='w-60'
                        src={logoImg}
                        alt='Logo do site PrepCars'
                    />
                </Link>


                {!loadingAuth && signed && (
                    <Link to="/dashboard">
                        <div className='transition-all mt-2 flex items-center justify-center'>
                            <img src={imgHelmet} className='w-7' />
                        </div>
                        <span className='text-white'>{firstNameUser}</span>
                    </Link>
                )}

                {!loadingAuth && !signed && (
                    <div className='border-2 rounded-full p-1 border-white'>
                        <Link to="/login">
                            <FiLogIn size={24} color='#fff' />
                        </Link>
                    </div>
                )
                }
            </header >
        </div >
    )
}

export default Header