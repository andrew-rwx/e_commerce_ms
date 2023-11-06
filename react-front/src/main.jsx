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
      const{Login2}=await import("./components/login/Login2");
      return({Component:Login2});
    }

  },
  {
    path:"/registrati"
  }


]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
