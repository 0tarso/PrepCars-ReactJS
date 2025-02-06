import './index.css'

//React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'

//Context
import AuthProvider from './contexts/AuthContext.tsx'

//Component
import router from './App.tsx'

//Swiper
import { register } from "swiper/element/bundle"

register()

//@ts-expect-error para retirar o erro por enquanto
import 'swiper/css';

//@ts-expect-error para retirar o erro por enquanto
import 'swiper/css/navigation';

//@ts-expect-error para retirar o erro por enquanto
import 'swiper/css/pagination';

//@ts-expect-error para retirar o erro por enquanto
import 'swiper/css/scrollbar';

//@ts-expect-error para retirar o erro por enquanto
import 'swiper/css/effect-fade';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer theme='colored' autoClose={2000} position='bottom-right' />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
