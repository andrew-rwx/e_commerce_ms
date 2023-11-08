import axios from "axios";
import { useState } from "react";
async function submitRegister(){
    axios.post("http://localhost/login_service/api/registrati",user_dataToSend)
}

function Registrati(){
    const[registrationData,useRegistrationData]=useState({
        username:"",
        email:"",
        password:""
    });
    function setRegistrationValue(event){
        useRegistrationData({
            ...registrationData,
            [event.target.name]:event.taget.value
        })
    }
    async function handleSignUp(){

        await submitRegister()
    }
    return( 
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                        </p>
                        <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                            <input
                                type="text"
                                id="form3Example1c"
                                className="form-control"
                                name="username"
                                value={registrationData.username}
                                onChange={setRegistrationValue}
                            />
                            <label className="form-label" htmlFor="form3Example1c">
                                Username
                            </label>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                            <input
                                type="email"
                                id="form3Example3c"
                                className="form-control"
                                name="email"
                                value={registrationData.email}
                                onChange={setRegistrationValue}
                            />
                            <label className="form-label" htmlFor="form3Example3c">
                                Email
                            </label>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw" />
                            <div className="form-outline flex-fill mb-0">
                            <input
                                type="password"
                                id="form3Example4c"
                                className="form-control"
                                name="password"
                                value={useRegistrationData.password}
                                onChange={setRegistrationValue}

                            />
                            <label className="form-label" htmlFor="form3Example4c">
                                Password
                            </label>
                            </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                            <input
                            className="form-check-input me-2"
                            type="checkbox"
                            defaultValue=""
                            id="form2Example3c"
                            />
                            <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                            </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="button" className="btn btn-primary btn-lg" onClick={handleSignUp}>
                            Register
                            </button>
                        </div>
                        </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img
                        src=""
                        className="img-fluid"
                        alt="Sample image"
                        />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}
export{Registrati};