// import React from 'react'
import ReactDOM from 'react-dom/client'
import React from 'react';
import App from './App.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from './pages/home.jsx';
import MyDiets from './pages/myDiets.jsx';
import GenerateDiet from './pages/generateDiet.jsx';
import GenerateWorkout from './pages/generateWorkout.jsx';
import Workouts from './pages/workouts.jsx'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Diets from './pages/diets.jsx';
import Login from './pages/login.jsx';
import MyWorkouts from './pages/myWorkouts.jsx';
import BMI from "./pages/bmi.jsx"

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
    },
    {
      path: 'myWorkouts',
      element: <MyWorkouts/>
    },{
      path: 'bmi',
      element:<BMI/>
    }

  ]}
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routers}/>
  </React.StrictMode>,
)
