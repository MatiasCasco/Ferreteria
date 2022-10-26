const ip = '192.168.43.69';//'192.168.56.1';
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

export async function ProveedorByProducto(ProductoId) {
  let data = {idProducto: ProductoId};
  try{
      let url = 'http://'+ ip +':8084/FerreSoft/rest/OrigenProductoAPI/opByProducto';
      let respuesta = await fetch(url, {
        "method": 'POST',
        "headers": {
          "Accept": 'application/json',
          //"Content-Type": 'application/json'
        },
        body: JSON.stringify(data),
      });
      let json = await respuesta.json();
      //debugger
      return json;
  }
  catch(ex){}         
}

export async function ProveedorByDetalle(Detalle) {
  try{
      let url = 'http://'+ ip +':8084/FerreSoft/rest/OrigenProductoAPI/opByDetalleProducto/' + Detalle;
      let respuesta = await fetch(url, {
        "method": 'GET',
        "headers": {
          "Accept": 'application/json',
          //"Content-Type": 'application/json'
        },
      });
      let json = await respuesta.json();
      //debugger
      return json;
  }
  catch(ex){}         
}