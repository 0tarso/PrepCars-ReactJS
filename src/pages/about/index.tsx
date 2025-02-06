import Container from '../../components/container'
import NavBar from '../../components/nav'
import imgSobre from '../../assets/chavesSobre.png'

import MotionDiv from '../../components/motionDiv'
import AboutCarCard from '../../components/aboutCarCard'
import AboutFavoriteCard from '../../components/aboutFavoriteCard'
import AboutClassicCard from '../../components/aboutClassicCard'

const About = () => {
	return (
		<Container>
			<NavBar />

			<div className='w-full rounded-lg flex flex-row max-lg:flex-col items-center justify-between mt-6 gap-4 fadeIn p-4 transition-all mb-16'>
				<MotionDiv>
					<div className='flex flex-col w-full transition-all'>
						<span className='font-bold text-8xl text-white -skew-x-6 rounded-md max-lg:text-9xl max-sm:text-7xl transition-all'>Buscar</span>
						<span className='font-bold text-8xl text-white -skew-x-6 rounded-md mt-2 max-lg:text-9xl max-sm:text-7xl transition-all'>Encontrar</span>
						<span className='font-bold text-8xl text-white -skew-x-6 rounded-md mt-2 max-lg:text-9xl max-sm:text-7xl transition-all'>Realizar</span>
						<div className=' bg-gradient-to-r from-red-700 to-red-500 mt-8 p-3 rounded-md -skew-x-6'>
							<p className='text-white '>Criada com o objetivo simples de conectar apaixonados por carros em busca de uma nova aventura automotiva. Nós da PrepCars entendemos sua motivação e vontade de ter um Chevette 1974 que diz nunca ter sido batido. Fique tranquilo.
								<br></br>
								<strong> Estamos todos juntos nessa jornada. Esperamos que encontre seu sonho aqui!</strong>
							</p>
						</div>
					</div>
				</MotionDiv>



				<div className=' bg-red-500 rounded-full transition-all'>
					<img src={imgSobre} className='drop-shadow-xl shaker transition-all max-w-[450px] max-sm:max-w-[340px]' />
				</div>

			</div>

			<div className='w-full'>
				<MotionDiv>
					<div className='flex flex-col w-full transition-all mb-4'>
						<span className='text-center font-bold text-6xl text-white -skew-x-6 rounded-md max-lg:text-9xl max-sm:text-5xl transition-all max-md:text-5xl'>Crie sua conta gratuita!</span>
					</div>
				</MotionDiv>


				<div className='flex max-sm:flex-col gap-4 max-lg:flex-col'>

					<MotionDiv>
						<div className='relative bg-gradient-to-r from-red-700 to-red-500 p-4 rounded-xl h-[650px] max-sm:h-[600px] max-lg:min-h-fit'>

							<AboutClassicCard />

							<p className='text-white text-xl font-medium mt-4 max-sm:text-base'>Seu clássico pode</p>
							<p className='text-white text-6xl font-bold fadeIn'>Estar aqui!</p>


							<span className='text-white text-[150px] font-bold absolute right-0 bottom-0 opacity-15'>1</span>
						</div>
					</MotionDiv>


					<MotionDiv>
						<div className='relative bg-gradient-to-r from-red-700 to-red-500 p-4 rounded-xl h-[650px] max-sm:h-[600px] max-lg:min-h-fit'>

							<AboutFavoriteCard />
							<p className='text-white text-xl font-medium mt-4 max-sm:text-base'>Veja quantas pessoas</p>
							<p className='text-white text-6xl font-bold fadeIn'>Curtiram</p>
							<p className='text-white text-6xl font-bold fadeIn'>seu carro!</p>

							<span className='text-white text-[150px] font-bold absolute right-0 bottom-0 opacity-15'>2</span>
						</div>
					</MotionDiv>
					<MotionDiv>
						<div className='relative bg-gradient-to-r from-red-700 to-red-500 p-4 rounded-xl h-[650px] max-sm:h-[600px] max-lg:min-h-fit'>
							<AboutCarCard />
							<p className='text-white text-xl font-medium mt-4 max-sm:text-base'>Anúncie seu veículo de forma</p>
							<p className='text-white text-6xl font-bold fadeIn'>Rápida e</p>
							<p className='text-white text-6xl font-bold fadeIn'>Gratuita</p>

							<span className='text-white text-[150px] font-bold absolute right-0 bottom-[0px] opacity-15'>3</span>
						</div>
					</MotionDiv>


				</div>
			</div>

		</Container >
	)
}

export default About