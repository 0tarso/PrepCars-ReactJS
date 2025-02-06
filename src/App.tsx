//React
import { createBrowserRouter } from "react-router-dom"

//Pages
import Car from "./pages/car"
import Home from "./pages/home"
import Layout from "./components/layout"
import Dashboard from "./pages/dashboard"
import NewCarRegister from "./pages/dashboard/new"
import Login from "./pages/login"
import Register from "./pages/register"
import Favorites from "./pages/favorites"

//Component
import { Private } from "./routes/Private"
import About from "./pages/about"
import Rules from "./pages/rules"



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/car/:id", element: <Car /> },
      { path: "/dashboard", element: <Private> <Dashboard /> </Private> },
      { path: "/dashboard/new", element: <Private> <NewCarRegister /> </Private> },
      { path: "/dashboard/fav", element: <Private> <Favorites /> </Private> },
      { path: "/about", element: <About /> },
      { path: "/rules", element: <Rules /> },
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
])

export default router
