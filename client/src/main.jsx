// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from './pages/home.jsx';
import MyDiets from './pages/myDiets.jsx';
import GenerateDiet from './pages/GenerateDiet.jsx';
import GenerateWorkout from './pages/generateWorkout.jsx';
import Workouts from './pages/workouts.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Diets from './pages/diets.jsx';
import Login from './pages/login.jsx';


const routers = createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {
      path:'',
      element:<Home/>
    },
    {
      path:'/myDiets',
      element:<MyDiets/>
    },
    {
      path:'/generateDiet',
      element:<GenerateDiet/>
    },
    {
      path:'/generateWorkout',
      element:<GenerateWorkout/>
    },
    {
      path:'allDiets',
      element: <Diets/>
    },
    {
      path:'login',
      element: <Login/>
    },
    {
      path: 'allWorkouts',
      element: <Workouts/>
    }

  ]}
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={routers}/>
  // </React.StrictMode>,
)
