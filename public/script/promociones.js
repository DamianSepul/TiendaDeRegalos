const url = 'http://localhost:3000/promociones/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const mostrar = (promociones) => {
    promociones.forEach(promocion => {
        resultados += `<tr>
                            <td>${promocion.idProducto}</td>
                            <td>${promocion.descuentoPromo}</td>
                            <td>${promocion.fechaVenci}</td>
                       </tr>
                    `
    });
    contenedor.innerHTML = resultados
}

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))
