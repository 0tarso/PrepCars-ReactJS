// React
import { createContext, ReactNode, useEffect, useState } from "react"

// Firebase
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebaseConnection"

interface AuthProviderProps {
    children: ReactNode
}

interface UserProps {
    uid: string
    name: string | null
    email: string | null
}

type AuthContextData = {
    signed: boolean
    loadingAuth: boolean
    user: UserProps | null
    handleInfoUser: (user: UserProps) => void
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null)

    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                })

            } else {
                setUser(null)
            }

            setLoadingAuth(false)
        })

        return () => unsub()
    }, [])

    function handleInfoUser({ uid, name, email }: UserProps) {
        setUser({ uid, name, email })
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                loadingAuth,
                user,
                handleInfoUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
