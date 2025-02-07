import { Timestamp } from "firebase/firestore"

export interface LoginProps {
  email: string
  password: string
}

export interface FetchDataProps {
  to: "home" | "dashboard" | "car" | "favorites" | "carFavorites" | "search"
  id?: string
  search?: string
}


export interface CarsProps {
  id: string
  name: string
  brand?: string
  year: string
  uid: string
  price: string | number
  city: string
  km: string
  images: CarImageProps[]
}

export interface CarsDashProps {
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
  uid: string;
  favoriteCount: number | undefined
  created: Timestamp
}

export interface CarDetailsProps {
  id: string
  name: string
  model: string
  brand: string
  city: string
  year: string
  km: string
  description: string
  created: string
  price: string | number
  owner: string
  uid: string
  whatsapp: string
  images: CarImageProps[]
}

export interface CarImageProps {
  name: string
  uid: string
  url: string
}

export interface RuleCardProps {
  text: string
  title: string
}

export interface FavoriteCarProps {
  userID: string
  carID: string
}

export interface CarCardProps {
  car: CarsProps
  isFavPage?: boolean
  reloadPage?: () => void
}