import { useEffect, useState } from 'react'
import Container from '../../components/container'
import DashboardHeader from '../../components/dashboardHeader'
import HeaderPath from '../../components/headerPath'
import useFirebase from '../../hooks/useFirebase'
import { CarsProps } from '../../types'
import { toast } from 'react-toastify'
import Spinner from '../../components/spinner'
import CarCard from '../../components/carCard'
import { Link } from 'react-router-dom'

const Favorites = () => {
  const { loadFavs, fetchData } = useFirebase()


  const [loading, setLoading] = useState<boolean>(true)
  const [carsFav, setCarsFav] = useState<CarsProps[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const favoritesID = await loadFavs(null, "favorites");
        if (Array.isArray(favoritesID)) {
          const listFavorites = await Promise.all(
            favoritesID.map(async (id) => {
              const data = await fetchData({ to: "carFavorites", id: id });
              return data as CarsProps;
            })
          );

          setCarsFav(listFavorites);
        }

      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar favoritos");

      } finally {
        setLoading(false);
      }
    }

    loadData()
  }, [carsFav])


  const handleDeleteCarCard = (car: CarsProps) => {
    const remainingCars = carsFav.filter(carItem => carItem.id !== car.id)
    setCarsFav(remainingCars)
  }

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }



  return (
    <Container>
      <DashboardHeader />
      <HeaderPath text='Favoritos' />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 fadeIn">
        {carsFav.length > 0 && carsFav.map(car => (
          <CarCard
            key={car.id}
            car={car}
            isFavPage={true}
            reloadPage={() => handleDeleteCarCard(car)}
          />
        ))}
      </div>


      {carsFav.length === 0 && (
        <div>
          <h1 className="font-medium text-xl text-center mt-20 fadeIn text-white">Você ainda não encontrou seu sonho :{'('}</h1>

          <Link to={"/"}>
            <div className="flex items-center justify-center mt-3 fadeIn drop-shadow-xl hover:drop-shadow-none">
              <button className="bg-red-500 w-2/4 font-bold h-12 text-white text-2xl rounded-lg hover:bg-red-400 transition-all">Procurar</button>

            </div>
          </Link>
        </div>


      )}
    </Container>
  )
}

export default Favorites