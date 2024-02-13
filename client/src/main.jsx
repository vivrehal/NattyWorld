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
import GenerateDiet from './pages/GenerateDiet.jsx';
import GenerateWorkout from './pages//GenerateWorkout.jsx';
import Workouts from './pages/workouts.jsx'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Diets from './pages/diets.jsx';
import Login from './pages/login.jsx';
import MyWorkouts from './pages/myWorkouts.jsx';
import BMI from "./pages/bmi.jsx"
import Signup from './pages/signup.jsx';
import MyProfile from './pages/myProfile.jsx';
import GymsNearby from './pages/gymsNearby.jsx';

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
      path:'gymsNearby',
      element: <GymsNearby/>
    },
    {
      path:'login',
      element: <Login/>
    },
    {
      path:'myProfile',
      element: <MyProfile/>
    },
    {
      path:'signup',
      element: <Signup/>
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
