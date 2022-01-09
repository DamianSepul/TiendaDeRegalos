const url = 'http://localhost:3000/ventas/'
const contenedor = document.querySelector('tbody')
let resultados = ''
const modalEnvios = new bootstrap.Modal(document.getElementById('modalEnvio'))
const habitacion = document.getElementById('habitacion')
const destinatario = document.getElementById('destinatario')
const formEnviar = document.getElementById('formEnviar')

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) { dd = '0' + dd }
if (mm < 10) { mm = '0' + mm }
today = yyyy + '-' + mm + '-' + dd;

const fecha = document.getElementById('fecha')
document.getElementById('fecha').setAttribute("min", today)
const hora = document.getElementById('hora')
let idVentaEnvio = 0
const mostrar = (ventas) => {
    ventas.forEach(venta => {
        resultados += `<tr class="text-center">
                            <td>${venta.idVenta}</td>
                            <td>${venta.fecha}</td>
                            <td>${venta.numTarjeta}</td>
                            <td>${venta.tipoVenta}</td>
                            <td>${venta.idCliente}</td>
                            <td>${venta.idTransaccion}</td>
                            <td>${venta.total}</td>
                            <td class="text-center"><a class="btnEnviar btn btn-primary"><i class="bi bi-send"></i> Enviar</a></td>
                       </tr>
                    `
    });
    contenedor.innerHTML = resultados
}

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

on(document, 'click', '.btnEnviar', e => {
    const fila = e.target.parentNode.parentNode
    idVentaEnvio = fila.children[0].innerHTML
    modalEnvios.show()
})

formEnviar.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url+'AgregarEnvioHotel/'+idVentaEnvio, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nHabitacion: habitacion.value,
            nombreDest: destinatario.value,
            fechaEnvio: fecha.value,
            horaEnvio: hora.value
        })
    })
        .then(response => response.json())
        .then(data => {
            const nuevoProducto = []
            nuevoProducto.push(data)
            mostrar(nuevoProducto)
        })
        .then(response => location.reload())
    modalProductos.hide()
})