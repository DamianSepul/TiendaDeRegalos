//const url = 'http://localhost:3000/'
const url = 'https://tienda-de-regalos-deerland.herokuapp.com/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const mostrar = (promociones) => {
    promociones.forEach(promocion => {
        resultados += `<tr class="text-center">
                            <td>${promocion.idProducto}</td>
                            <td>${promocion.descuentoPromo}</td>
                            <td>${promocion.fechaVenci}</td>
                       </tr>
                    `
    });
    contenedor.innerHTML = resultados
}

fetch(url+'promociones')
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))
