const ip = '192.168.56.1';
export async function BuscarEmpresa(){
    try{
        let url = 'http://'+ ip +':8084/FerreSoft/rest/EmpresaAPI/empresaByName/tigre s.a';
        let respuesta = await fetch(url, {
          "method": 'GET',
          "headers": {
            "Accept": 'application/json',
            //"Content-Type": 'application/json'
          }
        });
        let json = await respuesta.json();
        //debugger
        return json;
    }
    catch(ex){}         
}

export async function AllProductos(){
    try{
        let url = 'http://'+ ip +':8084/FerreSoft/rest/DetalleProductoAPI/all';
        let respuesta = await fetch(url, {
          "method": 'GET',
          "headers": {
            "Accept": 'application/json',
            //"Content-Type": 'application/json'
          }
        });
        let json = await respuesta.json();
        //debugger
        return json;
    }
    catch(ex){}         
}