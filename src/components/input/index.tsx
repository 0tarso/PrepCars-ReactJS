import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

const Input = ({ name, type, placeholder, register, rules, error }: InputProps) => {
    return (
        <div className="transition-all">
            <input
                className="w-full border-2 rounded-md h-11 px-2"
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
                id={name}

            />

            {error
                ? <p className="text-red-400 text-sm transition-all">{error}</p>
                : <div className="h-4"></div>
            }
        </div>
    )
}

export default Input