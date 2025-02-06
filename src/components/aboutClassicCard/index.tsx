import carImg from '../../assets/18041.jpg'
import mecaImg from '../../assets/4062.jpg'
import MotionDiv from '../motionDiv'


const AboutClassicCard = () => {


  return (
    <MotionDiv>
      <div className='relative shaker'>

        <section className="w-full bg-gray-100 rounded-lg px-1 py-1">

          <img className="w-full object-cover rounded-lg mb-2 hover:scale-105 transition-all bg-white fadeIn shaker max-lg:h-60"
            alt={`Foto de anúncio na PrepCars`}
            src={mecaImg}
          />


          <p className="font-bold mt-1 px-2 moreWidth">
            Mercedez-Benz E190
          </p>

          <div className="flex flex-col px-2 mb-3">
            <span className="text-zinc-700 mb-4">Ano 1998 | 78000 km</span>
            <strong className="text-white text-2xl bg-gradient-to-r from-red-700 to-red-500 p-2 rounded-md -skew-x-6 w-full drop-shadow-lg fadeIn">R$ 89.950</strong>
          </div>

          <div className="w-full h-px bg-slate-200 mt-4 mb-1"></div>

          <div className="drop-shadow-lg px-2 p-1 bg-gradient-to-r from-red-700 to-red-500 rounded-md flex items-center justify-between">
            <span className="text-white">Porto Alegre - RS</span>
          </div>
        </section>

      </div>
    </MotionDiv>
  )
}

export default AboutClassicCard