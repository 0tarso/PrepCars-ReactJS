//Assets
import "../../index.css"
import logoImg from "../../assets/logo.png"

//React
import { Link } from "react-router-dom"

//Components
import Container from "../../components/container"
import Input from "../../components/input"

//Validation
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

//Firebase
import { auth } from "../../services/firebaseConnection"
import { signOut } from "firebase/auth"
import { useEffect } from "react"
import Footer from "../../components/footer"
import { toast } from "react-toastify"
import useFirebase from "../../hooks/useFirebase"

const schema = z.object({
	email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
	password: z.string().nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>

const Login = () => {
	const { loginUser } = useFirebase()

	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: "onChange"
	})

	useEffect(() => {
		const handleLogout = async () => {
			if (auth.currentUser !== null) {
				await signOut(auth)
				toast.info("Por segurança, deslogamos sua conta. Por favor, entre novamente")
			}
		}
		handleLogout()
	}, [])


	const onSubmit = (data: FormData) => {
		loginUser(data)
	}

	return (
		<>
			<Container>
				<div className="w-full min-h-screen flex justify-center items-center flex-col gap-4 transition-all fadeIn">
					<Link to="/" className="mb-6 max-w-sm w-full" >
						<img
							src={logoImg}
							alt="Logo do Site PrepCars"
							className="w-full"
						/>
					</Link>


					<form className="bg-white max-w-xl w-full rounded-lg px-4 py-4 transition-all rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-md"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="mb-4">
							<Input
								type="text"
								placeholder="Digite seu email"
								name="email"
								error={errors.email?.message}
								register={register}
							/>
						</div>
						<div className="mb-4">
							<Input
								type="password"
								placeholder="Digite sua senha"
								name="password"
								error={errors.password?.message}
								register={register}
							/>
						</div>

						<button className="bg-black w-full h-8 rounded-md text-white text-xl font-medium hover:bg-gray-700 transition-all"
							type="submit"
						>
							Acessar
						</button>

					</form>

					<Link to="/register">
						<p className="text-white hover:underline">
							Ainda não possui uma conta PrepCars? Crie aqui!
						</p>
					</Link>

				</div>

			</Container >
			<Footer />
		</>

	)
}

export default Login