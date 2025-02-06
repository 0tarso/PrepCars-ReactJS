import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <div className="w-full items-center flex h-10 bg-gradient-to-r from-red-700 to-red-500 p-2 rounded-lg text-white font-medium gap-4 mb-4 max-md:w-auto max-md:right-3 z-50">

      <div className="hidden md:flex items-center gap-4 w-full">
        <Link to="/">
          <span className="py-1 px-2 rounded-lg hover:bg-white hover:text-red-400 transition-all">Showroom</span>
        </Link>
        <Link to="/about">
          <span className="py-1 px-2 rounded-lg hover:bg-white hover:text-red-400 transition-all">Sobre PrepCars</span>
        </Link>

        <Link to="/rules">
          <span className="py-1 px-2 rounded-lg hover:bg-white hover:text-red-400 transition-all">Regras</span>
        </Link>
        <Link to="/register">
          <span className="py-1 px-2 rounded-lg hover:bg-white hover:text-red-400 transition-all">Criar Conta</span>
        </Link>
      </div>

      <button
        className="md:hidden mt-4 z-50 fixed top-12 left-0 w-full bg-black shadow-lg flex items-center justify-center gap-2 p-4 transition-all"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {menuOpen && (
        <div className="mt-16 z-40 fixed top-12 left-0 w-full bg-red-500 rounded-lg shadow-lg flex flex-col gap-2 p-4 md:hidden transition-all fadeIn">
          <Link to="/">
            <span className="block py-2 px-4 rounded-lg hover:bg-white hover:text-red-400 transition-all">Showroom</span>
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <span className="block py-2 px-4 rounded-lg hover:bg-white hover:text-red-400 transition-all">Sobre PrepCars</span>
          </Link>

          <Link to="/rules" onClick={() => setMenuOpen(false)}>
            <span className="block py-2 px-4 rounded-lg hover:bg-white hover:text-red-400 transition-all">Regras</span>
          </Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>
            <span className="block py-2 px-4 rounded-lg hover:bg-white hover:text-red-400 transition-all">Criar Conta</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavBar