//React
import { Link } from "react-router-dom"

//Firebase
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"
import { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"

const DashboardHeader = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    async function handleLogout() {
        await signOut(auth)
    }

    return (
        <div className="w-full items-center flex h-10 bg-gradient-to-r from-red-700 to-red-500 p-2 rounded-lg text-white font-medium gap-4 mb-4 max-md:fixed max-md:w-auto max-md:right-3 max-md:h-8 z-50">

            <div className="hidden md:flex items-center gap-4 w-full">
                <Link to="/">
                    <span className="py-1 px-2 rounded-lg hover:bg-white hover:text-red-400 transition-all">Showroom</span>
                </Link>
                <Link to="/dashboard">
                    <span className="py-1 px-2 rounded-lg hover:bg-white hover:text-red-400 transition-all">Dashboard</span>
                </Link>

                <Link to="/dashboard/new">
                    <span className="py-1 px-2 rounded-lg hover:bg-white hover:text-red-400 transition-all">Cadastrar carro</span>
                </Link>

                <Link to="/dashboard/fav">
                    <span className="py-1 px-2 rounded-lg hover:bg-white hover:text-red-400 transition-all">Meus Favoritos</span>
                </Link>

                <button className="ml-auto"
                    onClick={handleLogout}
                >
                    <span className="py-1 px-2 rounded-lg hover:bg-white hover:text-red-400 transition-all">Sair da conta</span>
                </button>

            </div>

            <button
                className="md:hidden z-50 flex w-full justify-center rounded-lg hover:bg-white hover:text-red-400 transition-all"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {menuOpen && (
                <div className="mt-8 z-40 fixed top-12 left-0 w-full bg-gradient-to-r from-red-700 to-red-500 rounded-lg shadow-lg flex flex-col gap-2 p-4 md:hidden transition-all fadeIn">
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        <span className="block py-2 px-4 rounded-lg hover:bg-white hover:text-red-400 transition-all">Showroom</span>
                    </Link>
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                        <span className="block py-2 px-4 rounded-lg hover:bg-white hover:text-red-400 transition-all">Dashboard</span>
                    </Link>

                    <Link to="/dashboard/new" onClick={() => setMenuOpen(false)}>
                        <span className="block py-2 px-4 rounded-lg hover:bg-white hover:text-red-400 transition-all">Cadastrar carro</span>
                    </Link>

                    <Link to="/dashboard/fav">
                        <span className="block py-2 px-4 rounded-lg hover:bg-white hover:text-red-400 transition-all">Meus Favoritos</span>
                    </Link>
                    <button className="w-full text-left" onClick={handleLogout}>
                        <span className="block py-2 px-4 rounded-lg hover:bg-white hover:text-red-400 transition-all">Sair da conta</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default DashboardHeader