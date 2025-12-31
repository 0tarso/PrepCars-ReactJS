//Firebase
import { deleteObject, ref } from "firebase/storage"
import { auth, db, storage } from "../services/firebaseConnection"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"

//React
import { useContext } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

//Context
import { AuthContext } from "../contexts/AuthContext"

//Typescript interfaces
import { CarsDashProps, CarsProps, FavoriteCarProps, FetchDataProps, LoginProps } from "../types"
import api from "../api/api"


const useFirebase = () => {
  const { handleInfoUser, user, } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleFirebaseAuthError = (error: unknown) => {
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string }

      switch (firebaseError.code) {

        case "auth/invalid-credential":
          return "Email ou senha inválidos";

        case "auth/too-many-requests":
          return "Muitas tentativas falhas. Aguarde um momento e tente novamente.";

        case "auth/network-request-failed":
          return "Erro de conexão. Verifique sua internet.";

        case "auth/email-already-in-use":
          return "Email indisponível. Tente outro, por favor.";

        default:
          return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
      }
    }
  }



  const loginUser = async (data: LoginProps) => {

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      const firebaseUser = credential.user



      handleInfoUser({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
      })


      toast.success(`Bem-vindo(a) ${firebaseUser.displayName ?? ""}`)
      navigate("/dashboard", { replace: true })

    } catch (error) {
      const message = handleFirebaseAuthError(error)
      toast.error(message)
    }
  }


  const registerNewUser = async (data: LoginProps, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)

      const user = userCredential.user

      await updateProfile(user, { displayName: name })

      handleInfoUser({
        name: name,
        email: user.email,
        uid: user.uid
      })


      navigate("/dashboard", { replace: true })
      toast.success(`Bem-vindo(a), ${name}!`)
      toast.success("Conta criada com sucesso!")

    } catch (error) {
      const message = handleFirebaseAuthError(error)
      toast.error(message)
    }
  }


  const fetchData = async ({ to, id, search }: FetchDataProps) => {
    switch (to) {
      case "search": {
        const carsRef = collection(db, 'cars')
        let queryRef = query(carsRef, where("name", ">=", search), where("name", "<=", search + "\uf8ff"))

        const dataPerName = [] as CarsProps[]

        const snapshotName = await getDocs(queryRef)

        if (snapshotName.empty) {
          // console.log("Sem dados em 'name' ")
          // console.log("Buscando em 'brand' ")
          const dataPerBrand = [] as CarsProps[]

          queryRef = query(carsRef, where("brand", ">=", search), where("brand", "<=", search + "\uf8ff"))

          const snapshotBrand = await getDocs(queryRef)

          snapshotBrand.forEach(doc => {
            dataPerBrand.push({ id: doc.id, ...(doc.data() as Omit<CarsProps, "id">) })
          })

          return dataPerBrand
        }
        // console.log("Dados encontrados com 'name' ")

        snapshotName.forEach(doc => {
          dataPerName.push({ id: doc.id, ...(doc.data() as Omit<CarsProps, "id">) })
        })
        return dataPerName
      }

      case "home": {
        let data
        try {
          const response = await api.get("cars/all")

          if (response.data) {
            // console.log(response.data)
            data = response.data.content
          }

        } catch (error) {
          toast.error("Erro ao buscar veículos. Tente mais tarde.")
          console.log("Erro busca de veículos HOME: ", error)
        }

        return data
      }

      case "dashboard": {
        let listCars: CarsDashProps[] = []

        console.log("Dashboard")
        try {

          // console.log(id)
          const response = await api.get("/cars/dashboard")

          if (response.data) {
            listCars = response.data.content
          }


        } catch (error) {
          toast.error("Ops, erro ao buscar seus veículos. Vamos corrigir o mais rápido possível!")
          console.log("Erro busca de veículos DASHBOARD: ", error)
        }

        return listCars
      }

      case "car": {

        let data

        try {
          const response = await api.get(`cars/${id}`)

          if (response.data) {
            // console.log(response.data)
            data = response.data.content
          }

          return data

        } catch (error) {
          console.error("Erro ao buscar veículo no banco", error);
          toast.error("Erro ao buscar veículo");
        }

        break
      }

      case "carFavorites": {
        try {
          const isValidId = id ?? ""
          const docRef = doc(db, "cars", isValidId)
          const snapshot = await getDoc(docRef);

          if (!snapshot.exists()) {
            toast.error("Veículo não existe");
            navigate("/");
            return;
          }

          // console.log("Carro buscado do banco", snapshot.data());

          return { id: snapshot.id, ...snapshot.data() }
        } catch (error) {
          console.error("Erro ao buscar veículo no banco", error);
          toast.error("Erro ao buscar veículo");
        }
      }
    }

  }

  const deleteCarData = async (car: CarsDashProps) => {
    try {
      const docRef = doc(db, "cars", car.id)
      await deleteDoc(docRef)

      const deleteImagePromises = car.images.map(async (image) => {
        const imagePath = `images/${image.uid}/${image.name}`;
        const imageRef = ref(storage, imagePath);

        return deleteObject(imageRef).catch((error) => {
          console.error(`Erro ao deletar imagem ${image.name}:`, error);
          toast.error("Erro ao deletar uma ou mais imagens do veículo");
        });
      });

      await Promise.all(deleteImagePromises)
      toast.success(`Veículo ${car.name} deletado com sucesso!`)
      return car.id


    } catch (error) {
      console.log("Errooo", error)
    }
  }


  const addCarFavorite = async (carFavorite: FavoriteCarProps) => {
    console.log(carFavorite)

    try {
      await addDoc(collection(db, 'favorites'), carFavorite)

      const carRef = doc(db, "cars", carFavorite.carID)
      await updateDoc(carRef, { favoriteCount: increment(1) })


    } catch (error) {
      console.error("Erroooo: ", error)
    }
  }

  const removeCarFavorite = async (carFavorite: FavoriteCarProps) => {
    const favoritesRef = collection(db, "favorites")
    const queryDelete = query(favoritesRef, where("userID", "==", user?.uid), where("carID", "==", carFavorite.carID))

    const carRef = doc(db, "cars", carFavorite.carID)

    try {
      const querySnapshot = await getDocs(queryDelete)
      querySnapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "favorites", docSnap.id))
        await updateDoc(carRef, { favoriteCount: increment(-1) })
      })


    } catch (error) {
      console.log("erroooo", error)
    }

  }


  const loadFavs = async (car: CarsProps | null, to: "carCard" | "favorites") => {
    const favoritesRef = collection(db, "favorites")


    switch (to) {

      case "carCard": {

        const cardFavoritesQuery = query(favoritesRef, where("userID", "==", user?.uid), where("carID", "==", car?.id))

        let isFavorite: boolean = false

        try {
          const querySnapshot = await getDocs(cardFavoritesQuery)
          querySnapshot.forEach(async (docSnap) => {
            if (docSnap.exists())
              isFavorite = true
          })

          return isFavorite
        } catch (error) {
          console.log("errooo", error)
          toast.error("Erro ao buscar favoritos")
          return isFavorite
        }
      }

      case "favorites": {
        const favoritesID: string[] = []

        try {
          const favoritesQuery = query(favoritesRef, where("userID", "==", user?.uid))

          const querySnapshot = await getDocs(favoritesQuery)
          querySnapshot.forEach(async (docSnap) => {
            favoritesID.push(docSnap.data().carID)
          }
          )

          return favoritesID

        } catch (error) {
          toast.error("Erro ao buscar veículos. Tente mais tarde.")
          console.log("Erro busca de veículos FAVORITES: ", error)
        }
      }
    }

  }


  return { loginUser, registerNewUser, fetchData, deleteCarData, addCarFavorite, removeCarFavorite, loadFavs }
}

export default useFirebase;