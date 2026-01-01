//React
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

import nissanHero from '../../assets/nissanPNG.png'

//Components
import NavBar from "../../components/nav"
import Spinner from "../../components/spinner"
import CarCard from "../../components/carCard"
import Container from "../../components/container"

//Hook Firebase
import useFirebase from "../../hooks/useFirebase"

//Typescript interface
import { CarsProps } from "../../types"


const Home = () => {

    const { fetchData } = useFirebase()

    const [cars, setCars] = useState<CarsProps[] | undefined>([])
    const [searchText, setSearchText] = useState<string>("")
    const [search, setSearch] = useState(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const loadData = async () => {

            try {
                const data = await fetchData({ to: "home" })
                setSearch(false)


                if (Array.isArray(data)) {
                    setCars(data)
                }


            } catch (error) {
                toast.error("Erro ao buscar dados :(")
                console.log(error)
            }

            finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])


    const handleSearchInput = (input: string) => {
        setSearchText(input.toUpperCase())
    }

    const onSubmitSearch = async () => {
        setLoading(true)
        setSearch(true)
        if (searchText === "") {
            try {
                const data = await fetchData({ to: "home" })
                setSearch(false)
                if (Array.isArray(data)) {
                    setCars(data)

                }

            } catch (error) {
                toast.error("Erro ao buscar dados :(")
                console.log(error)
            }

            finally {
                setLoading(false)
            }

            return
        }

        try {
            const data = await fetchData({ to: "search", search: searchText })

            if (Array.isArray(data)) {
                setCars(data)

            }

        } catch (error) {
            console.log(error)
            toast.error("Erro ao pesquisar. Tente mais tarde.")
        }

        finally {
            setLoading(false)
            setSearchText("")
        }
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
            <NavBar />
            <section className="flex justify-center items-center w-full max-w-3xl p-4 mx-auto bg-white rounded-lg gap-2 mb-12">

                <input className="w-full border-2 rounded-lg h-9 px-3 outline-red-200 outline-1"
                    placeholder="Digite o nome do carro..."
                    onChange={(e) => handleSearchInput(e.target.value)}
                    value={searchText ?? ""}
                />

                <button className="bg-red-500 h-9 px-8 rounded-lg text-white text-lg font-medium"
                    onClick={onSubmitSearch}
                >
                    Buscar
                </button>
            </section>

            {/* <h1 className="text-white font-bold text-center mt-6 text-2xl mb-4">
                Encontre sua lasanha aqui!
            </h1> */}

            {!search && (

                <section className="h-[500px] flex flex-row relative mb-36 max-md:mb-12 transition-all fadeIn max-md:overflow-hidden max-sm:mt-12">

                    <div className="fadeIn flex mt-32 max-lg:mt-12 top-24 absolute overflow-hidden w-2/4 max-lg:w-3/5 max-md:w-full max-md:top-12">
                        <img src={nissanHero} className="object-contain w-full h-auto" />
                    </div>

                    <div className="absolute -z-10 top-0 fadeIn">
                        <span className="transition-all text-[200px] max-lg:text-[130px] max-md:text-[80px] max-sm:text-[70px] text-white/80" style={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif' }}>PrepCars</span>
                    </div>

                    <div className="absolute border-2 -z-20 rounded-xl skew-x-12 opacity-10 border-red-400 w-64 h-24" />
                    <div className="absolute left-52 -z-20 border-2 rounded-xl skew-x-12 bg-red-800 opacity-10 border-red-400 w-96 h-24" />
                    <div className="bg-red-800 absolute left-48 top-44 -z-20 border-2 rounded-xl skew-x-12 opacity-10 border-red-400 w-2/4 h-24" />
                    <div className="absolute right-24 top-12 -z-20 border-2 rounded-xl skew-x-12  opacity-10 border-red-400 w-96 h-24" />
                    <div className="absolute right-0 top-32 -z-20 border-2 rounded-xl skew-x-12 opacity-10 border-red-400 w-96 h-24" />

                    <div className=" flex flex-1 items-end max-lg:items-start max-md:items-end max-lg:mt-64 -z-10 max-md:mb-0 max-sm:mb-12 max-md:px-2">
                        <div className="bg-gradient-to-r from-red-700/50 to-red-800 w-full  flex flex-col pr-16 max-lg:pr-8 py-8 max-md:pt-24 -skew-x-3 rounded-lg items-end max-sm:mb-12 max-md:items-center max-sm:items-end shadow-xl">

                            <span className="font-black text-white text-3xl max-lg:text-xl" style={{ fontFamily: "Roboto Variable" }}>Seu carro do "dia-a-dia"</span>
                            <span className="font-black text-7xl text-white max-lg:text-5xl">está aqui!</span>
                        </div>
                    </div>
                </section>
            )}


            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all">



                {cars && cars.map(car => (
                    <div key={car.id}>
                        <CarCard car={car} />
                    </div>
                ))}

            </section>


        </Container>
    )
}

export default Home