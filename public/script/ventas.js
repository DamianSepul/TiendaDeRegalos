const url = 'http://localhost:3000/ventas/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const mostrar = (ventas) => {
    ventas.forEach(venta => {
        resultados += `<tr>
                            <td>${venta.idVenta}</td>
                            <td>${venta.fecha}</td>
                            <td>${venta.numTarjeta}</td>
                            <td>${venta.tipoVenta}</td>
                            <td>${venta.idCliente}</td>
                            <td>${venta.idTransaccion}</td>
                            <td>${venta.total}</td>
                            <td class="text-center"><a class="btnEnviar btn btn-primary"></i>Enviar</a></td>
                       </tr>
                    `
    });
    contenedor.innerHTML = resultados
}

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))
