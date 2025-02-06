//React
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FiTrash, FiUpload } from 'react-icons/fi'
import { ChangeEvent, useContext, useState } from 'react'

//Components
import Input from '../../../components/input'
import Container from '../../../components/container'
import HeaderPath from '../../../components/headerPath'
import DashboardHeader from '../../../components/dashboardHeader'

//ZOD
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

//Context
import { AuthContext } from '../../../contexts/AuthContext'

//Firebase
import { db, storage } from '../../../services/firebaseConnection'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'

import { v4 as uuidV4 } from 'uuid'

const schema = z.object({
	name: z.string().max(50, "Máximo de 50 caracteres").nonempty("Nome obrigatório").toUpperCase(),
	model: z.string().max(50, "Máximo de 50 caracteres").nonempty("Modelo obrigatório").toUpperCase(),
	brand: z.string().max(50, "Máximo de 50 caracteres").nonempty("Marca obrigatório").toUpperCase(),
	year: z.string().max(4, "Ano deve conter no máximo 4 números").nonempty("Ano do veículo obrigatório"),
	km: z.string().max(7, "Máximo de 7 números sem pontos ou vírgulas").nonempty("A quilometragem é obrigatória"),
	price: z.string().max(7, "Máximo de 7 números sem pontos ou vírgulas").nonempty("O valor é obrigatório"),
	city: z.string().max(50, "Máximo de 50 caracteres preferencialmente com a sigla do seu Estado (ex: RS)").nonempty("A cidade é obrigatória").toUpperCase(),
	whatsapp: z.string().min(1, "O contato é obrigatório").refine((value) => /^(\d{10,11})$/.test(value), {
		message: "Número inválido"
	}),
	description: z.string().max(1000, "Máximo 1000 caracteres").nonempty("A descrição é obrigatória")
})


type FormData = z.infer<typeof schema>

interface ImageItemProps {
	uid: string;
	name: string;
	previewUrl: string;
	url: string;
}



const NewCarRegister = () => {
	const navigate = useNavigate()
	const { user } = useContext(AuthContext)

	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: 'onChange'
	})

	const [carImages, setCarImages] = useState<ImageItemProps[]>([])
	const [rulesWarning, setRulesWarning] = useState<boolean>(true)


	function onSubmit(data: FormData) {
		console.log(data)

		if (carImages.length === 0) {
			alert("Você deve enviar ao menos 1 imagem do carro a ser cadastrado!")
			return
		}

		const carListImages = carImages.map(car => {
			return {
				uid: car.uid,
				name: car.name,
				url: car.url
			}
		})

		addDoc(collection(db, 'cars'), {
			name: data.name,
			model: data.model,
			brand: data.brand,
			year: data.year,
			km: data.km,
			whatsapp: data.whatsapp,
			city: data.city,
			price: data.price,
			description: data.description,
			owner: user?.name,
			uid: user?.uid,
			created: new Date(),
			images: carListImages
		})
			.then(() => {

				reset()
				setCarImages([])
				toast.success(`${data.name} cadastrado com sucesso!`)
				navigate("/dashboard")

			})
			.catch((error) => {
				toast.error("Erro ao cadastrar veículo, tente mais tarde!")
				console.log(error)
			})


	}


	async function handleFile(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.files && event.target.files[0]) {
			const image = event.target.files[0]

			if (image.type === "image/jpeg" || image.type === "image/png") {
				await handleUpload(image)
			}
			else {
				alert("A imagem deve ser JPEG ou PNG")
				return
			}
		}
	}



	async function handleUpload(image: File) {
		if (!user?.uid) {
			return
		}

		const currentUid = user.uid
		const uidImage = uuidV4()

		const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

		uploadBytes(uploadRef, image).then((snapshot) => {

			getDownloadURL(snapshot.ref).then((downloadUrl) => {

				const imageItem = {
					name: uidImage,
					uid: currentUid,
					previewUrl: URL.createObjectURL(image),
					url: downloadUrl
				}

				setCarImages((images) => [...images, imageItem])
			})
		})
	}



	async function handleDeleteImage(item: ImageItemProps) {

		const imagePath = `images/${item.uid}/${item.name}`

		const imgRef = ref(storage, imagePath)

		try {
			await deleteObject(imgRef)
			setCarImages(carImages.filter((car) => car.url !== item.url))
		}
		catch (error) {
			console.log(error)
		}
	}



	return (
		<Container>
			<DashboardHeader />

			{rulesWarning && (
				<>
					<HeaderPath text='Leia' />
					<div className='w-full flex items-center justify-center mb-4 '>
						<h1 className='text-2xl text-white font-bold font bg-red-700 p-4 rounded-md drop-shadow-lg w-2/4 text-center max-sm:w-full'>Lembre-se das Regras</h1>
					</div>
					<div className='w-full p-4 flex flex-col justify-center items-center bg-white rounded-md'>
						<p className='mb-4'>Leia até o fim para criar o anúncio</p>

						<section className='w-full'>
							<div className='mb-2'>
								<h3 className='text-xl font-bold bg-gradient-to-r from-red-700 to-red-500 rounded-md w-[50%] p-1 -skew-x-6 text-white max-sm:w-full'>Informações Verdadeiras</h3>
								<p>Os usuários devem fornecer informações verdadeiras, precisas e completas ao se cadastrar e ao criar anúncios. Anúncios falsos ou enganosos serão removidos.</p>

							</div>
							<div className='mb-2'>
								<h3 className='text-xl font-bold bg-gradient-to-r from-red-700 to-red-500 rounded-md w-[40%] p-1 -skew-x-6 text-white max-sm:w-full'>Propriedade do Veículo</h3>
								<p>Os anúncios devem ser de veículos que o usuário tem direito de vender ou alugar. Não é permitido anunciar veículos sem ser o proprietário ou sem autorização.</p>

							</div>
							<div className='mb-2'>
								<h3 className='text-xl font-bold bg-gradient-to-r from-red-700 to-red-500 rounded-md w-[38%] p-1 -skew-x-6 text-white max-sm:w-full'>Mostre o seu carro</h3>
								<p>As imagens de veículos devem ser reais e claras. Não é permitido o uso de imagens de estoque, fotos manipuladas ou que não representem fielmente o veículo anunciado.</p>

							</div>
							<div className='mb-2'>
								<h3 className='text-xl font-bold bg-gradient-to-r from-red-700 to-red-500 rounded-md w-[50%] p-1 -skew-x-6 text-white max-sm:w-full'>Anúncios enganosos</h3>
								<p>Não é permitido criar anúncios com preços falsos, informações incompletas ou enganosas para atrair usuários de forma desonesta.</p>

							</div>
							<div className='mb-2'>
								<h3 className='text-xl font-bold bg-gradient-to-r from-red-700 to-red-500 rounded-md w-[38%] p-1 -skew-x-6 text-white max-sm:w-full'>Atualize seus anúncios</h3>
								<p>Os anúncios devem ser atualizados regularmente. Caso o veículo seja vendido, o anúncio deve ser removido imediatamente da plataforma.</p>

							</div>
							<div className='mb-2'>
								<h3 className='text-xl font-bold bg-gradient-to-r from-red-700 to-red-500 rounded-md w-[40%] p-1 -skew-x-6 text-white max-sm:w-full'>Responsabilidade da negociação</h3>
								<p>A plataforma não se responsabiliza pelas negociações entre compradores e vendedores. É de total responsabilidade dos usuários verificar a autenticidade das informações e a legalidade da negociação.</p>

							</div>
						</section>

						<p className='mt-4 '>Ao clicar em "Criar Anúncio" você afirma que leu e concordou com as regras acima</p>
						<button className='hover:scale-105 hover:drop-shadow-none bg-green-500 w-2/4 p-2 font-bold rounded-md text-white drop-shadow-lg transition-all' onClick={() => { setRulesWarning(false) }}>Criar Anúncio</button>
					</div>
				</>

			)}

			{!rulesWarning && (
				<>
					<HeaderPath text='Novo Anúncio' />
					<p className='font-medium text-white'>Fotos do seu carro</p>
					<div className='w-full p-3 bg-gray-100 rounded-lg flex flex-col sm:flex-row items-center gap-2 fadeIn'>
						<button className='h-32 border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-black'>

							<div className='absolute cursor-pointer'>
								<FiUpload size={30} color='#000' />
							</div>

							<div className='cursor-pointer'>
								<input className='opacity-0 cursor-pointer'
									type='file'
									accept='image/*'
									onChange={handleFile}
								/>
							</div>

						</button>

						{carImages && carImages.map(item => (
							<div className='w-full h-32 flex item-center justify-center relative rounded-lg shadow-md'
								key={item.name}
							>
								<button className='absolute left-2 top-2'
									onClick={() => handleDeleteImage(item)}
								>
									<FiTrash size={28} color='#fff' />
								</button>
								<img className='h-32 rounded-lg w-full object-cover'
									src={item.previewUrl}
									alt='Foto do carro'
								/>
							</div>
						))}
					</div>


					<div className='w-full bg-gray-100 p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-3 fadeIn'>
						<form className='w-full' onSubmit={handleSubmit(onSubmit)}>

							<div className='mb-3'>
								<p className='font-medium mb-1'>Nome</p>
								<Input
									type='text'
									register={register}
									name="name"
									error={errors.name?.message}
									placeholder='Ex: Monza'
								/>
							</div>

							<div className='flex w-full mb-3 flex-row items-center gap-4'>
								<div className='w-full'>
									<p className='font-medium mb-1'>Modelo</p>
									<Input
										type='text'
										register={register}
										name="model"
										error={errors.model?.message}
										placeholder='Ex: 2.0 Gasolina Manual'
									/>
								</div>
								<div className='w-full'>
									<p className='font-medium mb-1'>Frabricante</p>
									<Input
										type='text'
										register={register}
										name="brand"
										error={errors.brand?.message}
										placeholder='Ex: Chevrolet'
									/>
								</div>
							</div>

							<div className='flex w-full mb-3 flex-row items-center gap-4'>

								<div className='w-full'>
									<p className='font-medium mb-1'>Ano</p>
									<Input
										type='text'
										register={register}
										name="year"
										error={errors.year?.message}
										placeholder='Ex: 1999'
									/>
								</div>

								<div className='w-full'>
									<p className='font-medium mb-1'>Quilometragem</p>
									<Input
										type='text'
										register={register}
										name="km"
										error={errors.km?.message}
										placeholder='Ex: 123456'
									/>
								</div>
							</div>

							<div className='flex w-full mb-3 flex-row items-center gap-4'>

								<div className='w-full'>
									<p className='font-medium mb-1'>Telefone / WhatsApp</p>
									<Input
										type='text'
										register={register}
										name="whatsapp"
										error={errors.whatsapp?.message}
										placeholder='Ex: 51999887766'
									/>
								</div>

								<div className='w-full'>
									<p className='font-medium mb-1'>Cidade</p>
									<Input
										type='text'
										register={register}
										name="city"
										error={errors.city?.message}
										placeholder='Ex: Santos - SP'
									/>
								</div>
							</div>

							<div className='mb-3'>
								<p className='font-medium mb-1'>Preço</p>
								<Input
									type='text'
									register={register}
									name="price"
									error={errors.price?.message}
									placeholder='(Somente números, sem pontos e vírgulas) - Exemplo: 19999'
								/>
							</div>

							<div className='mb-3'>
								<p className='font-medium mb-1'>Descrição</p>
								<textarea
									className='border-2 w-full rounded-md h-24 px-2'
									{...register("description")}
									name="description"
									placeholder='Conte mais sobre seu carro...'
								/>

								{errors.description && <p className='mb-1 text-red-500 text-sm'>{errors.description?.message}</p>}
							</div>

							<button type='submit'
								className='w-full rounded-md bg-zinc-900 text-white font-medium h-10'
							>
								Cadastrar
							</button>
						</form>
					</div>
				</>
			)}
		</Container>
	)
}

export default NewCarRegister