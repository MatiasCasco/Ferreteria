export const BASE_URL = 'http://localhost:8080/ferreteria'; // 'http://localhost:8080/casa.san.roque' ,'http://localhost:8080/ferreteria';

//Urls
export const CAJA_ADD = '/CajaAPI/addCaja';
export const CAJA_ADD_DETALLE = 'CajaAPI/addCajaDetalle';

export const FACTURAS_BY_EMPLEADO = '/CajaAPI/facturas/{idEmpleado}';

export const DETALLE_CAJA = '/CajaAPI/detalleCaja/{idDetalle}';

export const CARACTERISTICA_PRODUCTO_ADD = '/CaracteristicaProductoAPI/addCaracteristicaProducto';

export const CARACTERISTICA_PRODUCTO_ADDS = '/CaracteristicaProductoAPI/addCaracteristicaProductos';

export const CARACTERISTICA_PRODUCTO_UPD = '/CaracteristicaProductoAPI/updateCaracteristicaProducto';

export const CARACTERISTICA_PRODUCTO_DEL = '/CaracteristicaProductoAPI/deleteCaracteristicaProducto/{id}';

export const CARACTERISTICA_PRODUCTO_ID = '/CaracteristicaProductoAPI/{id}';

export const CARACTERISTICA_PRODUCTO_ALL = '/CaracteristicaProductoAPI/all';

export const DESCUENTO_ADD = '/DescuentoAPI/addDescuento';

export const DESCUENTO_ADDS = '/DescuentoAPI/addDescuentos';

export const DESCUENTO_UPD = '/DescuentoAPI/updateDescuento';

export const DESCUENTO_DEL = '/DescuentoAPI/deleteDescuento/{idDescuento}';

export const DESCUENTO_ALL = '/DescuentoAPI/all';

export const DESCUENTO_BY_ID = '/DescuentoAPI/descuentoById/{idDescuento}';

export const DESCUENTO_PRODUCTO_ID = '/DescuentoAPI/productoId/{idProducto}/cantidad/{cantidad}';

export const EMPRESA_ADD = '/EmpresaAPI/addEmpresa';

export const EMPRESA_UPD = '/EmpresaAPI/updateEmpresa';

export const EMPRESA_DEL = '/EmpresaAPI/deleteEmpresa';

export const EMPRESA_ID = '/EmpresaAPI/empresaById/{idEmpresa}';

export const EMPRESA_NAME = '/EmpresaAPI/empresaByName/{nombreEmpresa}';

export const EMPRESA_RUC_CI = '/EmpresaAPI/empresaByRucOrCi/{dataRucOCi}';

export const EMPRESA_ALL = '/EmpresaAPI/all';

export const FACTURA_VENTA_ADD = '/FacturaVenta/addFacturaVenta';

export const FACTURA_VENTA_ID = '/FacturaVenta/FacturaById/{idFactura}';

export const FACTURAS_VENTA_CLIENTE_EMPLEADO = '/FacturaVenta/FacturasByClienteAndEmpleado/{idCliente}/{idEmpleado}';

export const FACTURAS_VENTA_BY_CLIENTE = '/FacturaVenta/FacturasByCliente';

export const FACTURAS_VENTA_BY_EMPLEADO = '/FacturaVenta/FacturasPendientesByEmpleado/{idEmpleado}';

export const  FACTURAS_VENTA_BY_EMPLEADO_ALL = '/FacturaVenta/FacturasByEmpleado/{idEmpleado}';

export const FACTURAS_VENTA_ALL = '/FacturaVenta/all';

export const MARCA_ADD = '/MarcaAPI/addMarca';

export const MARCA_ADDS = '/MarcaAPI/addMarcas';

export const MARCA_UPD = '/MarcaAPI/updateMarca';

export const MARCA_DEL = '/MarcaAPI/deleteMarca/{idMarca}';

export const MARCA_ALL = '/MarcaAPI/all';

export const MARCA_ID = '/MarcaAPI/marcaById/{idMarca}';

export const ORIGEN_PRODUCTO_ADD = '/OrigenProductoAPI/addOrigenProducto';

export const ORIGEN_PRODUCTO_ADDS = '/OrigenProductoAPI/addOrigenProductos';

export const ORIGEN_PRODUCT_ADD = '/OrigenProductoAPI/addOrigenProduct';

export const ORIGEN_PRODUCT_ADDS = '/OrigenProductoAPI/addOrigenProducts';

export const ORIGEN_PRODUCTO_UPD = '/OrigenProductoAPI/updateOrigenProducto';

export const ORIGEN_PRODUCTO_DEL = '/OrigenProductoAPI/deleteOrigenProducto/{idOrigenProducto}';

export const ORIGEN_PRODUCTO_ID = '/OrigenProductoAPI/OrigenProductoById/{idOrigenProducto}';

export const ORIGEN_PRODUCTO_BY_DETALLE_PRODUCTO = '/OrigenProductoAPI/OrigenProductoByDetalleProducto/{idDetalle}';

export const ORIGEN_PRODUCTO_BY_PRODUCTO = '/OrigenProductoAPI/OrigenProductoByProducto/{idProducto}';

export  const ORIGEN_PRODUCTO_BY_EMPRESA = '/OrigenProductoAPI/OrigenProductoByEmpresa/{idEmpresa}';

export const ORIGEN_PRODUCTO_BY_PRODUCTO_EMPRESA = '/OrigenProductoAPI/OrigenProductoByProductoAndEmpresa/empresa/{idEmpresa}/producto/{idProducto}';

export const ORIGEN_PRODUCTO_ALL = '/OrigenProductoAPI/all';

export const PERSONA_ADD = '/PersonaAPI/addPersona';

export const PERSONA_ADDS = '/PersonaAPI/addPersonas';

export const  PERSONA_UPD = '/PersonaAPI/updatePersona';

export const PERSONA_DEL = '/PersonaAPI/deletePersona/{id}';

export const PERSONA_ID = '/PersonaAPI/{id}';

export const EMPLEADOS = '/PersonaAPI/empleados';

export const CLIENTES = '/PersonaAPI/clientes';

export const PERSONA_ALL = '/PersonaAPI/all';

export const PERSONA_RUC_CI = '/PersonaAPI/persona/{rucOci}';

export const PERSONA_RAZON_SOCIAL = '/PersonaAPI/persona/razon_social/{razon}';

export const PRODUCTO_ADD = '/ProductoAPI/addProducto';

export const PRODUCTO_ADDS = '/ProductoAPI/addProductos';

export const PRODUCTO_UPD = '/ProductoAPI/updateProducto';

export const PRODUCTO_DEL = '/ProductoAPI/deleteProducto/{idProducto}';

export const PRODUCTO_ALL = '/ProductoAPI/all';

export const PRODUCTO_ID = '/ProductoAPI/productoById/{idProducto}';

export const PRODUCTO_BY_MARCA = '/ProductoAPI/productoByMarca/{idMarca}';

export const PRODUCTO_BY_CATEGORIA = '/ProductoAPI/productoByCategoria/{idCategoria}';

export const UNIDAD_MEDIDA_ID = '/UnidadMedidaAPI/metricaById/{metricaId}';

export const UNIDAD_DE_MEDIDAS = '/UnidadMedidaAPI/metricas';

export const UNIDAD_MEDIDA_CONVERSION = '/UnidadMedidaAPI/conversionById/{conversionId}';

export const CONVERSIONES_BY_PRODUCTO = '/UnidadMedidaAPI/conversionesByProductoId/{productoId}';

export const CATEGORIA_ADD = '/CategoriaAPI/addCategoria';
export const CATEGORIA_ADDS = '/CategoriaAPI/addCategorias';

export const CATEGORIA_UPD = '/CategoriaAPI/updateCategoria';

export const CATEGORIA_DEL = '/CategoriaAPI/deleteCategoria/{idCategoria}';

export const CATEGORIA_ALL = '/CategoriaAPI/all';

export const CATEGORIA_BY_ID = '/CategoriaAPI/categoriaById/{idCategoria}';

export const RECEPCION_ALL = '/RecepcionAPI/all';

export const RECEPCION_ADD = 'RecepcionAPI/addRecepcion';

export const RECEPCION_ADDs = '/RecepcionAPI/addRecepciones';

export const RECEPCION_UPD = '/RecepcionAPI/updateRecepcion';

export const RECEPCION_BY_ID = '/RecepcionAPI/recepcionById/{idRecepcion}';

export const RECEPCION_DEL = '/RecepcionAPI/deleteRecepcion/{idRecepcion}';

export const FACTURA_COMPRA_ADD = '/FacturaCompra/addFacturaCompra';

export const FACTURA_COMPRA_UPD = '/FacturaCompra/updateFacturaCompra';

export const FACTURA_COMPRA_ID = '/FacturaCompra/FacturaById/{idFactura}';

export const FACTURAS_COMPRA_BY_EMPRESA = '/FacturaCompra/FacturasPendientesByEmpresa/{idEmpresa}';

export const FACTURAS_COMPRA_BY_EMPLEADO = '/FacturaCompra/FacturasByEmpleado/{idEmpleado}';

export const FACTURAS_COMPRA_ALL = '/FacturaCompra/all';
