import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import MyDiets from './pages/myDiets'
function App() {
 

  return (
    <>
      <NavBar/>
      <Outlet/>
      <MyDiets/>
    </>
  )
}

export default App
