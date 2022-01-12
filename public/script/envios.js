//const url = 'http://localhost:3000/'
const url = 'https://tienda-de-regalos-deerland.herokuapp.com/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const mostrar = (envios) => {
    envios.forEach(envio => {
        resultados += `<tr class="text-center">
                            <td>${envio.idEnvio}</td>
                            <td>${envio.nHabitacion}</td>
                            <td>${envio.nombreDest}</td>
                            <td>${envio.fechaEnvio}</td>
                            <td>${envio.horaEnvio}</td>
                            <td>${envio.idVenta}</td>
                            <td class="text-center"><a class="btnBorrar btn btn-danger"><i class="bi bi-x-lg"></i> Borrar</a></td>
                       </tr>
                    `
    });
    contenedor.innerHTML = resultados
}

fetch(url+'envios')
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
    alertify.confirm("Eliminar envio?",
        function () {
            fetch(url +"envios/Borrar/"+id, {
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