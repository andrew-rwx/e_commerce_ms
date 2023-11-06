import axios from "axios";
function Catalogo(){
    return(<div>

    </div>)
}

async function loaderCatalogo(){
    const tipo_catalogo=location.param
    //parla con l'endpoint del microservizio catalog
    try{
        axios.post("http/catalog_service:3003/showCatalog").then(function(response){
            if(response.status===200){
                return response.data; //catalogo dei prodotti
            }
            if(response.status===500){
                throw new Error; //errore dal backend
            }
        }
        )
    }
    catch(e){
        throw e; //lanciato all'errorElement
    }
}

export {Catalogo,loaderCatalogo};