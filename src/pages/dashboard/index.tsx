//Components
import Spinner from "../../components/spinner";
import Container from "../../components/container"
import HeaderPath from "../../components/headerPath";
import ModalDeleteCar from "../../components/modalDeleteCar";
import DashboardHeader from "../../components/dashboardHeader"

//React
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi"
import { useContext, useEffect, useState } from "react";

//Context
import { AuthContext } from "../../contexts/AuthContext";

//Typescript interface
import { CarsDashProps } from "../../types";

//Hook Firebase
import useFirebase from "../../hooks/useFirebase";


const Dashboard = () => {

  const { fetchData, deleteCarData } = useFirebase()
  const [carsDash, setCarsDash] = useState<CarsDashProps[] | null>(null)
  const [deleteCar, setDeleteCar] = useState<string | null>(null)

  const { user } = useContext(AuthContext)

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData({ to: "dashboard" })

      if (Array.isArray(data)) {
        setCarsDash(data as CarsDashProps[])
      }
    }

    loadData()

  }, [user?.uid])

  const handleDeleteCar = async (car: CarsDashProps) => {
    if (!car.id) {
      return
    }

    try {
      await deleteCarData(car)
      setCarsDash((prevCarsDash) => (prevCarsDash as CarsDashProps[]).filter((remainingCar) => remainingCar.id !== car.id))

    } catch (error) {
      toast.error("Erro ao deletar veículo. Tente mais tarde!")
      console.log(error)
    }
  }


  function showDeleteCarWindow(carId: string | null) {
    setDeleteCar(carId)
  }


  if (carsDash === null) {
    return (
      <Spinner />
    )
  }


  return (
    <Container>
      <DashboardHeader />
      <HeaderPath text="Meus Carros" />

      {carsDash.length > 0 && (
        <>
          <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 fadeIn">

            {carsDash?.map(car => (
              <section key={car.id}
                className="w-full bg-gray-100 rounded-lg px-1 py-1 relative"
              >
                <button
                  className="absolute bg-white rounded-full p-1 ml-1 mt-1 hover:scale-105 transition-all z-30 drop-shadow-md"
                  onClick={() => showDeleteCarWindow(car.id)}
                >
                  <FiTrash2 size={28} color="black" />
                </button>

                {deleteCar === car.id && (
                  <ModalDeleteCar
                    carInfo={car}
                    showModal={showDeleteCarWindow}
                    confirmDelete={handleDeleteCar}
                  />

                )}

                {car.favoriteCount && car.favoriteCount > 0 ? (
                  <div className="drop-shadow-md bg-gradient-to-r from-red-700 to-red-500 absolute right-1 rounded-md p-2 flex flex-col">
                    <span className="text-white">Esse carro já tem</span>
                    <span className="font-bold text-center text-white text-lg">{car.favoriteCount} {car.favoriteCount > 1 ? "Favoritos" : "Favorito"}</span>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-red-700 to-red-500 absolute right-1 rounded-md p-2 flex flex-col">
                    <span className="text-white">Ainda não foi favoritado {":("}</span>
                  </div>
                )}

                <div className="absolute right-1 top-[260px] flex flex-row justify-center p-1 rounded-md drop-shadow-md w-[58%] bg-gradient-to-r from-red-700 to-red-500 text-white">
                  <span className="font-medium">Anunciado em:</span>
                  <p className="font-medium">{car.created.toDate().getDate()}/{car.created.toDate().getMonth()}/{car.created.toDate().getFullYear()} </p>

                </div>


                <Link to={`/car/${car.id}`}>

                  <img className="w-full object-cover rounded-lg mb-2 h-72 hover:cursor-pointer bg-white"
                    src={car.images[0].url}
                  />

                  <p className="font-bold mt-1 mb-2 px-2">
                    {car.name}
                  </p>

                  <div className="px-2 flex justify-between">
                    <span className="text-zinc-700">Ano {car.year} | {Number(car.km).toLocaleString()} km</span>

                  </div>
                  <div className="flex flex-col px-2">
                    <strong className="text-black text-xl">R$ {Number(car.price).toLocaleString()}</strong>
                  </div>

                  <div className="w-full h-px bg-slate-200 my-2"></div>

                  <div className="px-2 pb-2">
                    <span className="text-zinc-700">{car.city}</span>
                  </div>

                </Link>
              </section>
            ))}


          </main>
        </>
      )}

      {carsDash.length === 0 && (
        <>
          <h1 className="font-medium text-xl text-center mt-20 fadeIn text-white">Você ainda não tem nenhum carro à venda</h1>

          <Link to={"/dashboard/new"}>
            <div className="flex items-center justify-center mt-3 fadeIn drop-shadow-xl hover:drop-shadow-none">
              <button className="bg-red-500 w-2/4 font-bold h-12 text-white text-2xl rounded-lg hover:bg-red-400 transition-all">Criar Anúncio</button>

            </div>
          </Link>
        </>
      )}
    </Container>
  )
}

export default Dashboard