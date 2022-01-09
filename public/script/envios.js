const url = 'http://localhost:3000/envios/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const mostrar = (envios) => {
    envios.forEach(envio => {
        resultados += `<tr>
                            <td>${envio.idEnvio}</td>
                            <td>${envio.nHabitacion}</td>
                            <td>${envio.nombreDest}</td>
                            <td>${envio.fechaEnvio}</td>
                            <td>${envio.horaEnvio}</td>
                            <td>${envio.idVenta}</td>
                       </tr>
                    `
    });
    contenedor.innerHTML = resultados
}

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))
