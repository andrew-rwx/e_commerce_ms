import {before,beforeEach,afterEach,describe,it} from "mocha";
import {expect} from "chai";
import sinon from "sinon";
import axios from "axios";

import{ submitData } from "../src/components/login/Login"

//Unity test della funzione submitData
describe("submitData",function(){
    let username;let password;let axiosStub;
    
    before(function(){
        username="valid_username";
        password="valid_password";
    })

    beforeEach(function(){
        axiosStub=sinon.stub(axios,"post");
    })

    afterEach(function(){
        axiosStub.restore()
    })

    it("Dovrebbe inserire un token nel localStorage se l'autenticazione ha avuto successo e restituire true",async function(){

        const response_token="a_valid_token";
        axiosStub.resolves({
            status:200,
            data: response_token

        });

        const localStorageStub=sinon.stub(localStorage,"setItem");
        
        const success_login=await submitData(username,password);

        sinon.assert.calledWith(axiosStub,"http://nginx:80/api/login" ,{
            username:username,
            password:password
        })
        sinon.assert.calledWith(localStorageStub,"token",response_token);
        sinon.assert.callOrder(axiosStub,localStorageStub);
        expect(success_login).to.equal(true);

        localStorageStub.restore();
        
    })

    it("Dovrebbe restituire false se la risposta del backend ha status 400",async function(){
        
        const message="Username o password errati"
        axiosStub.resolves({
            status: 400,
            data: message
        });

        const success_login=await submitData(username,password);

        sinon.assert.calledWith(axiosStub,"http://nginx:80/api/login" ,{
            username:username,
            password:password
        })
        expect(success_login).to.equal(false);

    });

    it("Dovrebbe restituire response.data quando se la risposta backend ha status 500",async function(){

        const error="Qualcosa è andato storto!";
        axiosStub.resolves({
            status:500,
            data: error
        })

        const success_login=await submitData(username,password);
        
        sinon.assert.calledWith(axiosStub,"http://nginx:80/api/login" ,{
            username:username,
            password:password
        });

        expect(success_login).to.equal(error)
    })

})
