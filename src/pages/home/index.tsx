//React
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

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
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const loadData = async () => {

            try {
                const data = await fetchData({ to: "home" })


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

        if (searchText === "") {
            try {
                const data = await fetchData({ to: "home" })
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
            <section className="flex justify-center items-center w-full max-w-3xl p-4 mx-auto bg-white rounded-lg gap-2">

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

            <h1 className="text-white font-bold text-center mt-6 text-2xl mb-4">
                Encontre sua lasanha aqui!
            </h1>

            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all">

                {cars && cars.map(car => (
                    <div key={car.id}>
                        <CarCard car={car} />
                    </div>
                ))}

            </main>

        </Container>
    )
}

export default Home