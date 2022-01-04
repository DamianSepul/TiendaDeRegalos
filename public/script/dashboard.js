const contenedor = document.querySelector('tbody')
let resultados = ''

const modalProductos = new bootstrap.Modal(document.getElementById('modalProducto'))
const formArticulo = document.querySelector('form')
const nombre = document.getElementById('nombre')
const descripcion = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')
const imagen = document.getElementById('imagen')
let opcion = ''

btnCrear.addEventListener('click', () => {
    nombre.value = '';
    descripcion.value = '';
    precio.value = '';
    stock.value = '';
    imagen.value = '';
    modalProductos.show()
    opcion = 'crear'
})
//Funcion
const mostrar = (productos) => {
    productos.forEach(producto => {
        resultados += `<tr>
                            <td>${producto.idProducto}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.descripcion}</td>
                            <td>${producto.precio}</td>
                            <td>${producto.stock}</td>
                            <td>Imagen</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary"><i class="bi bi-pencil"></i> Editar</a> <a class="btnBorrar btn btn-danger"><i class="bi bi-x-lg"></i> Borrar</a></td>
                       </tr>
                    `
    });
    contenedor.innerHTML = resultados
}
//Mostrar
fetch('http://localhost:3000/productos/SelectProducto')
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))