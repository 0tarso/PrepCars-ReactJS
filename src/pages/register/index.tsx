import logoImg from "../../assets/logo.png"

//React
import { useEffect } from "react"
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
import { toast } from "react-toastify"
import useFirebase from "../../hooks/useFirebase"

const schema = z.object({
	name: z.string().nonempty("O campo nome é obrigatório"),
	email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
	password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres").nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>

const Register = () => {
	const { registerNewUser } = useFirebase()

	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: "onChange"
	})

	useEffect(() => {
		const handleLogout = async () => {
			if (auth.currentUser !== null) {
				await signOut(auth)
				toast.info("Por segurança, deslogamos sua conta. Por favor, entre novamente.")
			}
		}

		handleLogout()
	}, [])


	const onSubmit = async (data: FormData) => {
		registerNewUser(data, data.name)
	}

	return (
		<Container>
			<div className="w-full min-h-screen flex justify-center items-center flex-col gap-4 transition-all">
				<Link to="/" className="mb-6 max-w-sm w-full" >
					<img
						src={logoImg}
						alt="Logo do Site PrepCars"
						className="w-full"
					/>
				</Link>


				<form className="bg-gray-100 max-w-xl w-full px-4 py-4 transition-all rounded-tl-md rounded-tr-2xl rounded-bl-2xl rounded-br-md"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="mb-4">
						<Input
							type="text"
							placeholder="Seu nome completo"
							name="name"
							error={errors.name?.message}
							register={register}
						/>
					</div>
					<div className="mb-4">
						<Input
							type="text"
							placeholder="Seu melhor email"
							name="email"
							error={errors.email?.message}
							register={register}
						/>
					</div>
					<div className="mb-4">
						<Input
							type="password"
							placeholder="Uma senha forte"
							name="password"
							error={errors.password?.message}
							register={register}
						/>
					</div>

					<button className="bg-black w-full h-8 rounded-md text-white text-xl font-medium hover:bg-gray-700 transition-all"
						type="submit"
					>
						Criar Conta
					</button>


				</form>

				<Link to="/login">
					<p className="text-white hover:underline">Já possui uma conta? Faça login aqui!</p>
				</Link>
			</div>
		</Container>
	)
}

export default Register