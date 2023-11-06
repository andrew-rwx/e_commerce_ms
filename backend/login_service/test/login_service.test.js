import { describe,it,beforeEach,afterEach } from "mocha";
import sinon from "sinon";
import { expect } from "chai";
import bcrypt from "bcrypt";
import validateUser from ("./helpers/validateUser");
import user from ("./DB/User");
import * as createToken from ("../helpers/createToken"); //modulo



describe("validateUser",function(){
    let userFindStub;
    let input_username;
    let input_password;

    beforeEach(function(){
        userFindStub=sinon.stub(user,"find")
    });

    afterEach(function(){
        userFindStub.restore();
    })


    it("Dovrebbe eseguire l'auth di un utente che inserisce le credenziali corrette e generare un jwt",
        async function(){
            const salt="salt of password"
            const bcryptCompareStub=sinon.stub(bcrypt,"compare");
            bcryptCompareStub.resolves(salt);

            /*************/
            const payload={
                username: input_username
            }
            const valid_token="a valid token";
            const createTokenStub=sinon.stub(createToken,"createToken");
            createTokenStub.resolves(valid_token)
            
            /************/
            input_username="user";
            input_password="psw";
            const user_found={
                username:input_username,
                password: "hashed_password"
            }
            userFindStub.resolves(user_found);
            /***********/
            const token=await validateUser(input_username,input_password);

            sinon.assert.calledOnce(userFindStub);
            sinon.assert.calledWith(userFindStub,input_username);
            sinon.assert.calledOnce(bcryptCompareStub);
            sinon.assert.calledWith(bcryptCompareStub,input_password);
            sinon.assert.calledOnce(createTokenStub);
            sinon.assert.calledWith(createTokenStub,payload);
            sinon.assert.callOrder(userFindStub,bcryptCompareStub,createTokenStub);
            expect(token).to.equal(valid_token);

            createTokenStub.restore();
            bcryptCompareStub.restore()
        }
    );

    it("Dovrebbe non eseguire l'autenticazione di un utente che inserisce il NOME UTENTE errato restituendo false",
        async function(){
            input_username="not_username"
            input_password="a password"
            userFindStub.resolves(null);
            /************/
            const token=await validateUser(input_username,input_password);
            sinon.assert.calledOnce(userFindStub);
            sinon.assert.calledWith(userFindStub,input_username);
            expect(token).to.equal(false);
        }
    )

    it("Dovrenne non eseguire l'autenticazione di un utente che inserisce la PASSWORD errata restituendo false",
        async function(){
            const user_found={
                username:input_username,
                password: "hashed_password"
            }
            input_username="correct username"
            input_password="wrong password"
            userFindStub.resolves(user_found);
            /******************/
            const no_psw_matching="bcrypt says no matching"
            const bcryptCompareStub=sinon.stub(bcrypt,"compare");
            bcryptCompareStub.rejects(no_psw_matching);
            /*****************/
            const token=await validateUser(input_username,input_password);

            sinon.assert.calledOnce(userFindStub);
            sinon.assert.calledWith(userFindStub,input_username);
            sinon.assert.calledOnce(bcryptCompareStub);
            sinon.assert.calledWith(bcryptCompareStub,input_password);
            sinon.assert.callOrder(userFindStub,bcryptCompareStub);
            expect(token).to.equal(false);

            bcryptCompareStub.restore()

    })

    it("Dovrebbe gestire l'errore correttamente throwando l'errore al livello superiore",
        async function(){
            try{
                input_username="a username";
                input_password="a passwrod";
                userFindStub.throws(new Error("This is a DB error"));

                const token=await validateUser(input_username,input_password);
                sinon.assert.calledWith(userFindStub,input_username);
            }
            catch(e){
                expect(e.message).to.equal("This is a DB error");
            }
        }
    );
})

