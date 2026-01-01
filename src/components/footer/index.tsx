import logoImg from "../../assets/logo.png"
const Footer = () => {
    return (
        <footer className="bg-red-500 flex flex-col items-center text-white text-sm mt-4 bottom-0 w-full pt-3 ">
            <div className="flex flex-row w-4/5 justify-between max-sm:flex-col max-sm:text-center">
                <div className="max-sm:mb-5">
                    <p className="bg-black -skew-x-6 p-2 rounded-md font-medium">Suporte pelo contato:</p>
                    <p className="text-center">suportePrepCars@gmail.com</p>
                </div>

                <div>
                    <p className="bg-black -skew-x-6 p-2 rounded-md font-medium text-center">Desenvolvido por</p>
                    <div className="w-full justify-center flex">

                        <a className="hover:underline text-center"
                            href="https://www.linkedin.com/in/0tarsodev"
                            target="_blank"
                            rel='noopener noreferrer'>Tailison Ramos</a>
                    </div>
                </div>
            </div>

            <div className="bg-black w-full flex justify-center gap-4 items-center max-sm:flex-col py-4 mt-2">
                <div className="w-36">
                    <img src={logoImg} />

                </div>
                <p>PrepCars. {new Date().getFullYear()} - Todos os Direitos Reservados</p>
            </div>

        </footer>
    )
}

export default Footer