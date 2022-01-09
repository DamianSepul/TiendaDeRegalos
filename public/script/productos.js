const url = 'http://localhost:3000/productos/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalProductos = new bootstrap.Modal(document.getElementById('modalProducto'))
const modalImagenes = new bootstrap.Modal(document.getElementById('modalImagen'))
const formArticulo = document.getElementById('FormModal')
const formImagen = document.getElementById('FormImagen')
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
                            <td>
                                <img src="http://localhost:3000/${producto.images}" class="img-thumbnail" width="100px" alt="...">
                                <a class="btnImagen btn btn-primary"> Imagen</a></td>
                            <td class="text-center"><a class="btnEditar btn btn-primary"><i class="bi bi-pencil"></i> Editar</a> <a class="btnBorrar btn btn-danger"><i class="bi bi-x-lg"></i> Borrar</a></td>
                       </tr>
                    `
    });
    contenedor.innerHTML = resultados
}
//Mostrar
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
//Procedimiento borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("Seguro que desea eliminar este producto?",
        function () {
            fetch(url +"Borrar/"+id, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => location.reload())
            //alertify.success('Ok')
        },
        function () {
            alertify.error('Cancel')
        });
})

//Procedimiento Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nombreForm = fila.children[1].innerHTML
    const descripcionForm = fila.children[2].innerHTML
    const precioForm = fila.children[3].innerHTML
    const stockForm = fila.children[4].innerHTML
    nombre.value = nombreForm
    descripcion.value = descripcionForm
    precio.value = precioForm
    stock.value = stockForm
    opcion = 'editar'
    modalProductos.show()
})

on(document, 'click', '.btnImagen', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    modalImagenes.show()
    opcion = 'imagen'
})

//Procedimiento crear y editar

formImagen.addEventListener('submit', (e) =>{
    if (opcion == 'imagen'){
        fetch(url+"EditImagen/"+idForm, {
            method:'PUT'
        })
        .then(response => response.json())
        .then(response => location.reload())
    }
})

formArticulo.addEventListener('submit', (e) => {
    e.preventDefault()
    
    if (opcion == 'crear') {
        fetch('http://localhost:3000/productos/AgregarProducto', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre.value,
                descripcion: descripcion.value,
                precio: precio.value,
                stock: stock.value
            })
        })
            .then(response => response.json())
            .then(data => {
                const nuevoProducto = []
                nuevoProducto.push(data)
                mostrar(nuevoProducto)
            })
            .then(response => location.reload())
    }
    if (opcion == 'editar') {
        fetch(url+"Editar/"+idForm, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre.value,
                descripcion: descripcion.value,
                precio: precio.value,
                stock: stock.value
            })
        })
        .then(response => response.json())
        .then(response => location.reload())
    }
    modalProductos.hide()
})