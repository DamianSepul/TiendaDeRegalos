//const url = 'http://localhost:3000/'
const url = 'https://tienda-de-regalos-deerland.herokuapp.com/'
const contenedor = document.getElementById('productContainer')
const tablaProductos = document.getElementById('tablaProductos')
const tablaCarrito = document.getElementById('tablaCarrito')
let resultados = ''
let resultados2 = ''

/*const mostrar = (productos) => {
    productos.forEach(producto => {
        resultados += ` <div  class="product_box col" id="${producto.idProducto}">
                            
                            <img src="http://localhost:3000/${producto.images}" class="img-thumbnail" width="150px">
                            <strong>${producto.nombre}</strong>
                            <span class="price">${producto.precio}</span>
                            <input type="number" class="form-control" value="1" min="1">
                            <a class="btnAgregar cart_btn btn">
                                <i class=" fas fa-cart-plus"></i> Añadir al carrito
                            </a>
                        </div>
                    `
    });
    contenedor.innerHTML = resultados
}*/
const mostrar = (productos) => {
    productos.forEach(producto => {
        resultados += ` <tr class="text-center">
                                <td style="display:none">${producto.idProducto}</td>
                                <td><img src="http://localhost:3000/${producto.images}" class="img-thumbnail" width="150px"></td>
                                <td>${producto.nombre}</td>
                                <td><input id="inputCantidad" type="number" class="form-control" value="1" min="1"></td>
                                <td> $${producto.precio}</td>
                                <td><a class="btnAgregar cart_btn btn">
                                <i class=" fas fa-cart-plus"></i> Añadir al carrito
                            </a></td>
                        </tr>
                    `
    });
    tablaProductos.innerHTML = resultados
}

const mostrar2 = (carritos) => {
    carritos.forEach(carrito => {
        resultados2 += ` <tr class="text-center">
                                <td class="table">${carrito.nombre}</td>
                                <td class="table">$${carrito.precio}</td>
                                <td class="table">${carrito.cantidad}</td>
                                <td class="table"><a class="btnBorrar btn btn-danger"><i class="bi bi-x-lg"></i></a></td>
                        </tr>
                    `
    });
    tablaCarrito.innerHTML = resultados2
}

fetch(url+'productos')
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

fetch(url+'carrito')
    .then(response => response.json())
    .then(data => mostrar2(data))
    .catch(error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("Seguro que desea eliminar este producto?",
        function () {
            fetch(url+"carrito/Borrar/"+id, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => location.reload())
            alertify.success('Ok')
        },
        function () {
            alertify.error('Cancelado')
        });
})

//Agregar al carrito
on(document, 'click', '.btnAgregar', e => {
    const fila = e.target.parentNode.parentNode.firstElementChild.innerHTML
    fetch(url+'ventas/AgregarCarrito/'+fila, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            const nuevoProducto = []
            nuevoProducto.push(data)
            mostrar(nuevoProducto)
        })
        .then(response => location.reload())
})