import{before,beforeEach,afterEach,describe,it}from "mocha";
import sinon from "sinon";
import { expect} from "chai";
import item from "./DB/Item.js";
import getAll_Items from "./helpers/getAll_Items.js";
describe("/showCatalog getAll_Items",function(){
    let findStub;
    let test_items;

    before(function(){
        test_items=[
            {
                categoria: "Abbigliamento",
                nome: "Maglione",
                immagine: "maglione.jpg",
                costo: 39.99,
                descrizione: "Un maglione caldo e confortevole per l'inverno."
            },
            {
                categoria: "Elettronica",
                nome: "Smartphone",
                immagine: "smartphone.jpg",
                costo: 499.99,
                descrizione: "Un potente smartphone con fotocamera avanzata."
            }
        ]
    })

    beforeEach(function(){
        findStub=sinon.stub(item,"find");
    })

    afterEach(function(){
        findStub.restore();
    })

    it("Dovrebbe restituire una lista di oggetti item",async function(){

        findStub.resolves(test_items);
        const catalog=await getAll_Items();
        expect(catalog).to.deep.equal(test_items);
    })
    it("dovrebbe thoware l'errore a livello di endpoint se si verifica",async function(){

        const getAll_Items_Spy=sinon.spy(getAll_Items);

        const error_with_find=new Error("Si è verificato un errore durante la query");
        findStub.rejects(error_with_find);
        const catalog=await getAll_Items();
        sinon.assert.calledOnce(findStub);
        sinon.assert.threw(getAll_Items_Spy,error_with_find);
        getAll_Items_Spy.restore();
    })




})