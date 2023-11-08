import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import{
  createBrowserRouter,
  RouterProvider
}from "react-router-dom";

import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";

const router=createBrowserRouter([
  { path:"/",
    lazy:async()=>{
      const {Homepage}=await import("./components/homepage/Homepage");
      return({Component:Homepage})
    }
  },
  { path:"/catalogo",
    lazy:async()=>{
      const {Catalogo,loaderCatalogo}=await import("./components/catalogo/Catalogo");

      return({loader:loaderCatalogo,
              Component:Catalogo
      });
    }
  },
  { path:"/login",
    lazy:async()=>{
      const{Login}=await import("./components/login/Login");
      return({Component:Login});
    }

  },
  {
    path:"/registrati",
    lazy:async()=>{
      const{Registrati}=await import("./components/registrati/Registrati");
      return({Component:Registrati})
    }
  }


]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
