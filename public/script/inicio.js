const url = 'http://localhost:3000/'
//const url = 'https://tienda-de-regalos-deerland.herokuapp.com/'
const contenedor = document.getElementById('productContainer')
const tablaProductos = document.getElementById('tablaProductos')
const tablaCarrito = document.getElementById('tablaCarrito')
const modalCompra = new bootstrap.Modal(document.getElementById('modalCompra'))
const tablaCompra = document.getElementById('tablaCompra')
const modalTotal = document.getElementById('modalTotal')
const formCompra = document.getElementById('formCompra')
const modalTarjeta = document.getElementById('modalTarjeta')
const modalMes = document.getElementById('modalMes')
const modalAno = document.getElementById('modalAno')
const modalCVV = document.getElementById('modalCVV')
let resultados = ''
let resultados2 = ''
let resultados3 = ''
let total = document.getElementById('inputTotal')



const mostrar = (productos) => {
    productos.forEach(producto => {
        resultados += ` <tr class="text-center">
                                <td style="display:none">${producto.idProducto}</td>
                                <td><img src="${url + producto.images}" class="img-thumbnail" width="150px"></td>
                                <td>${producto.nombre}</td>
                                <td><input id="inputCantidad" type="number" class="form-control w-auto" value="1" min="1" disabled></td>
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
                                <td style="display:none">${carrito.idCarrito}</td>
                                <td class="table">${carrito.nombre}</td>
                                <td class="table">$${carrito.precio}</td>
                                <td class="table">${carrito.cantidad}</td>
                                <td class="table"><a class="btnBorrar btn btn-danger"><i class="bi bi-x-lg"></i></a></td>
                        </tr>
                    `
                    total.value=parseInt(total.value,10)+parseInt(carrito.precio,10) 
                    console.log(total.value)
    });
    tablaCarrito.innerHTML = resultados2
}
let idProductoCompra
let cantidadCompra

const mostrar3 = (carritos) => {
    carritos.forEach(carrito => {
        resultados3 += ` <tr class="text-center">
                                <td style="display:none">${carrito.idCarrito}</td>
                                <td class="table">${carrito.nombre}</td>
                                <td class="table">$${carrito.precio}</td>
                                <td class="table">${carrito.cantidad}</td>
                        </tr>
                    `
                    idProductoCompra = carrito.idProducto
                    cantidadCompra = carrito.cantidad
    });
    tablaCompra.innerHTML = resultados3
}


fetch(url+'productos')
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

fetch(url+'carrito')
    .then(response => response.json())
    .then(data => mostrar2(data))
    .catch(error => console.log(error))

    fetch(url+'carrito')
    .then(response => response.json())
    .then(data => mostrar3(data))
    .catch(error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

btnComprar.addEventListener('click',() =>{
    modalCompra.show()
    modalTotal.value = total.value
})

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)
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

//Realizar compra
formCompra.addEventListener('submit', (e) => {
    let fecha = modalMes.value + '/' + modalAno.value
    //alert(modalTarjeta.value+modalCVV.value+fecha+modalTotal.value+idProductoCompra+cantidadCompra)
    fetch(url+"api/SolicitudTransferencia/1", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origin_account: modalTarjeta.value,
                cvv: modalCVV.value,
                exp_date: fecha,
                ammount: modalTotal.value,
                idProducto: idProductoCompra,
                cantidad: cantidadCompra
            })
        })
            .then(response => response.json())
            .then(data => {
                const nuevoProducto = []
                nuevoProducto.push(data)
                mostrar(nuevoProducto)
            })
            .then(response => location.reload())
})