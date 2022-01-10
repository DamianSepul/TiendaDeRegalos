const url = 'http://localhost:3000/productos/'
const contenedor = document.getElementById('productContainer')
let resultados = ''

const mostrar = (productos) => {
    productos.forEach(producto => {
        resultados += ` <div  class="product_box col">
                            <img src="http://localhost:3000/${producto.images}" class="img-thumbnail" width="150px">
                            <strong>${producto.nombre}</strong>
                            <span class="price">${producto.precio}</span>
                            <input type="number" class="form-control" value="1" min="1">
                            <button class="cart_btn">
                                <i class="fas fa-cart-plus"></i> Añadir al carrito
                            </button>
                        </div>
                    `
    });
    contenedor.innerHTML = resultados
}
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))