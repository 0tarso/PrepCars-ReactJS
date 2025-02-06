import carImg from '../../assets/18041.jpg'
import { FaHeart } from 'react-icons/fa'
import MotionDiv from '../motionDiv'
import { useEffect, useState } from 'react'



const AboutFavoriteCard = () => {

  const [countFavorites, setCountFavorites] = useState<number>(1)

  useEffect(() => {
    const time = Math.floor(Math.random() * 3 * 2000)
    console.log(time)

    setTimeout(() => {
      setCountFavorites(prevState => prevState + 1)
    }, time)

  }, [countFavorites])

  return (
    <MotionDiv>
      <div className='relative shaker'>

        <section className="w-full bg-gray-100 rounded-lg px-1 py-1">
          <img className="w-full object-cover rounded-lg mb-2 hover:scale-105 transition-all bg-white fadeIn shaker max-lg:h-60"
            alt={`Foto de anúncio na PrepCars`}
            src={carImg}
          />

          <p className="font-bold mt-1 px-2">
            HRV
          </p>

          <div className="flex flex-col px-2 mb-3">
            <span className="text-zinc-700 mb-1">Ano 2016 | 49950 km</span>
          </div>

          <p className="text-black px-2">Seu carro tem</p>
          <div className="drop-shadow-lg px-2 p-1 bg-gradient-to-r from-red-700 to-red-500 rounded-md flex items-center justify-between">
            <p className="text-white text-4xl font-bold">{countFavorites}

              <span className='text-white text-4xl font-bold'> Favoritos</span>

            </p>
          </div>

        </section>

        <div className='shaker absolute right-3 bottom-8 drop-shadow-lg transition-all fadeIn'>

          <FaHeart size={110} color='red' className='hover:scale-125 transition-all rotate-12' />
        </div>

      </div>
    </MotionDiv>
  )
}

export default AboutFavoriteCard