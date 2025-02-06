//Components
import Container from '../../components/container'

//React
import { FaWhatsapp } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiX } from 'react-icons/fi'

//Swiper & Toastify
import { Swiper, SwiperSlide } from 'swiper/react'
import { toast } from 'react-toastify'

//Typescript interface
import { CarDetailsProps } from '../../types'
import useFirebase from '../../hooks/useFirebase'


const Car = () => {
    const { fetchData } = useFirebase()
    const { id } = useParams()

    const [carDetails, setCarDetails] = useState<CarDetailsProps>()
    const [carImageZoom, setCarImageZoom] = useState<string | null>(null)
    const [slidePerView, setSlidePerView] = useState<number>(1)

    const textURL = `Olá, gostaria de mais informações sobre seu ${carDetails?.name} à venda na PrepCars`
    const encodedTextURL = encodeURIComponent(textURL)
    const whatsappURL = `https://wa.me/55${carDetails?.whatsapp}?text=${encodedTextURL}`


    useEffect(() => {
        async function loadCar() {
            if (!id) {
                return
            }

            try {
                const data = await fetchData({ to: "car", id: id })
                setCarDetails({ id: data.id, ...data } as CarDetailsProps);

            } catch (error) {
                toast.error("Erro ao buscar veículo. Tente mais tarde!")
            }
        }
        loadCar()
    }, [id])


    useEffect(() => {
        function handleWindowResize() {
            if (window.innerWidth < 720) {
                setSlidePerView(1)
                return
            }

            if (window.innerWidth > 720 && carDetails?.images.length === 1) {
                setSlidePerView(1)
                return
            }

            setSlidePerView(2)
        }
        handleWindowResize()
        window.addEventListener("resize", handleWindowResize)

        return () => {
            window.removeEventListener("resize", handleWindowResize)
        }
    }, [carDetails])

    return (
        <Container>
            <Swiper
                slidesPerView={slidePerView}
                pagination={{ clickable: true }}
                spaceBetween={10}
                navigation
            >
                {carDetails?.images?.map(image => (
                    <SwiperSlide key={image.name}>

                        <div className='fadeIn h-96 flex items-center justify-center'>

                            <img className='w-full h-80 object-cover rounded-lg drop-shadow-xl cursor-pointer'
                                src={image.url}
                                onClick={() => setCarImageZoom(image.url)}
                                alt={`Imagem de ${carDetails?.name} à venda na PrepCars`}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {carImageZoom && (
                <div className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50'
                    onClick={() => setCarImageZoom(null)}
                >
                    <div className='lg:scale-105 justify-center flex fadeIn'>
                        <div className='bg-red-500 w-8 absolute left-50 cursor-pointer'>
                            <FiX color='#ffff' size={30} />
                        </div>
                        <img
                            alt={`Foto ampliada de ${carDetails?.name} à venda na PrepCars`}
                            src={carImageZoom}
                        />
                    </div>
                </div>

            )}

            {carDetails && (
                <main className='w-full bg-white rounded-lg p-6 my-4'>

                    <div className='flex flex-col sm:flex-row mb-4 items-center justify-between'>

                        <h1 className='font-bold text-3xl text-black'>{carDetails?.name}</h1>
                        <h1 className='font-bold text-3xl text-black'>R${Number(carDetails?.price).toLocaleString()}</h1>
                    </div>

                    <p className='sm:text-left text-center'>{carDetails?.model}</p>

                    <div className='flex w-full gap-6 my-4'>

                        <div className='flex flex-col gap-4'>
                            <div>
                                <p>Cidade</p>
                                <strong>{carDetails?.city}</strong>
                            </div>
                            <div>
                                <p>Quilometragem</p>
                                <strong>{Number(carDetails?.km).toLocaleString()} KM</strong>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <div>
                                <p>Ano</p>
                                <strong>{carDetails?.year}</strong>
                            </div>
                            <div>
                                <p>Telefone / WhatsApp</p>
                                <strong>{carDetails?.whatsapp}</strong>
                            </div>
                        </div>
                    </div>

                    <strong>Descrição:</strong>
                    <p className='mb-4'>{carDetails?.description}</p>

                    <a
                        className='bg-green-600 flex gap-2 justify-center items-center w-full h-12 sm:text-xl text-md text-white font-bold rounded-lg hover:bg-green-500 cursor-pointer'
                        href={whatsappURL}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Enviar mensagem WhatsApp
                        <FaWhatsapp size={26} color='#fff' />
                    </a>
                </main>
            )}
        </Container>
    )
}

export default Car