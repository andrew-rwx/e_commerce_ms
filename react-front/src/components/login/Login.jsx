import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
//utils per il componente Login
async function submitData(username,password){
  const user_dataToSend={
    username:username,
    password:password
  }
  //la funzione deve contattare il container contenente il servizio di autenticazione
  axios.post("http://reverse_proxy:80/login_service/api/login",user_dataToSend)
    .then((response)=>{
      if(response.status===200){
        //inserisce il token jwt ricevuto nel localStorage dello user
        localStorage.setItem("token",response.data);
        //comunica alla funzione handleLogin che l'autenticazione ha avuto successo
        return true;
      }

      if(response.status===400){
        //comunica alla funzione handleLogin che l'autenticazione non ha avuto successo {message: messaggio}
        return false; //
      }

      if(response.status===500){
        //si è verificato un errore nell'applicazione del container login_service
        //comunica all'utente che si è verificato un errore
        return response.data;
      }
    })
    .catch((e)=>{
      throw e;
    })
}


function Login(){
    //stato per il triggher dell'ErrorBoundary
    const navigate=useNavigate();
    const[error,setError]=useState("")
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");

    function handleUsername(event){
      setUsername(event.target.value)
    }

    function handlePassword(event){
      setPassword(event.target.value)
    }

    async function handleLogin(){
      try{
        const success_login=await submitData(username,password);
        if(success_login===true){
          navigate("/"); //porta l'utente autenticato alla home
        }
        if(!success_login){
          //comunica all'utente che ha immesso credenziali errate
        }
        else{
          //comunica all'utente che qualcosa è andato storto! (lato backend)
        }
      }
      catch(e){
        setError(()=>{
          throw e; //triggher dell'errorBoundary
        })
      }
    }

    return(
        <form>
          {/* Username input*/}
          <div className="form-outline mb-4">
            <input id="form2Example1" className="form-control" value={username} onChange={handleUsername} />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>
          {/* Password input */}
          <div className="form-outline mb-4">
            <input type="password" id="form2Example2" className="form-control" value={password} onChange={handlePassword} />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>
          {/* 2 column grid layout for inline styling */}
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              {/* Checkbox */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="form2Example31"
                  defaultChecked=""
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>
            <div className="col">
              {/* Simple link */}
              <a href="#!">Forgot password?</a>
            </div>
          </div>
          {/* Submit button */}
          <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleLogin}>
            Sign in
          </button>
          {/* Register buttons */}
          <div className="text-center">
            <p>
              Not a member? <a href="#!">Register</a>
            </p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f" />
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google" />
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter" />
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github" />
            </button>
          </div>
        </form>
    )
}
      
export{Login,submitData};