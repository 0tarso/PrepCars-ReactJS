//React
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { useContext, useEffect, useState } from 'react'

//Context
import { AuthContext } from '../../contexts/AuthContext'

//Components
import MotionDiv from '../motionDiv'

//Typescript interface
import { CarCardProps, FavoriteCarProps } from '../../types'

import useFirebase from '../../hooks/useFirebase'

const CarCard = ({ car, reloadPage, isFavPage }: CarCardProps) => {

  const { user } = useContext(AuthContext)
  const { addCarFavorite, removeCarFavorite, loadFavs } = useFirebase()
  const navigate = useNavigate()

  const [heartView, setHeartView] = useState<boolean>(false)

  useEffect(() => {
    if (!user?.uid) return
    const loadData = async () => {

      try {
        const isFavorite = await loadFavs(car, 'carCard')
        if (isFavorite) {
          setHeartView(true)
        }

      } catch (error) {
        toast.error("Erro ao carregar favoritos")
        console.log("Errooo, ", error)
      }
    }

    loadData()
  }, [user?.uid])

  const handleFavoriteCar = async () => {
    if (!user?.uid) return

    if (user.uid === car.uid) {
      toast.info("Você não pode favoritar seu próprio carro")
      return
    }

    const favoriteCar: FavoriteCarProps = {
      userID: user.uid,
      carID: car.id
    }

    if (heartView) {
      setHeartView(false)
      try {
        await removeCarFavorite(favoriteCar)
        toast.info("Veículo removido dos favoritos!")

      } catch (error) {
        console.log("erroooo", error)
        toast.error("Erro ao remover dos favoritos!")
      }

      if (isFavPage) {
        reloadPage()
      }
    }
    else {
      setHeartView(true)
      try {
        await addCarFavorite(favoriteCar)
        toast.success("Visite seu Favoritos!")

      } catch (error) {
        console.log("Erroooo", error)
        toast.error("Erro ao adicionar aos favoritos")
      }

    }


  }

  const handleRedirect = async () => {
    toast.info("Crie uma conta para adicionar favoritos")
    navigate("/login")
  }

  return (
    <MotionDiv>
      <div className='relative'>
        <Link key={car.id} to={`/car/${car.id}`}>
          <section className="w-full bg-gray-100 rounded-lg px-1 py-1">
            <img className="w-full object-cover rounded-lg mb-2 h-72 hover:scale-105 transition-all hover:cursor-pointer bg-white fadeIn"
              alt={`Foto de ${car.name} a venda na PrepCars`}
              src={car.images[0].url}
            />

            <p className="font-bold mt-1 px-2">
              {car.name}
            </p>

            <div className="flex flex-col px-2 mb-3">
              <span className="text-zinc-700 mb-4">Ano {car.year} | {car.km} km</span>
              <strong className="text-white text-2xl bg-gradient-to-r from-red-700 to-red-500 p-2 rounded-md -skew-x-6 w-3/4 drop-shadow-lg">R$ {Number(car.price).toLocaleString()}</strong>
            </div>

            <div className="w-full h-px bg-slate-200 mt-4 mb-1"></div>

            <div className="drop-shadow-lg px-2 p-1 bg-gradient-to-r from-red-700 to-red-500 rounded-md flex items-center justify-between">
              <span className="text-white">{car.city}</span>
            </div>
          </section>
        </Link>


        {user?.uid && (
          <button className='absolute right-3 bottom-14 drop-shadow-lg hover:scale-125 transition-all'
            onClick={handleFavoriteCar}
          >
            {heartView ? (
              <FaHeart size={45} color='red' className='fadeIn' />
            ) : (
              <FiHeart size={45} color='black' className='fadeIn' />
            )}

          </button>
        )}

        {!user?.uid && (
          <button className='absolute right-3 bottom-14 drop-shadow-lg hover:scale-125 transition-all'
            onClick={handleRedirect}
          >
            <FiHeart size={45} color='black' className='fadeIn' />
          </button>
        )}
      </div>
    </MotionDiv>
  )
}

export default CarCard