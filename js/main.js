let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecMarcas = document.getElementById('selecMarcas')
const buscador = document.getElementById('search')



selecMarcas.addEventListener('change', () => {

    if (selecMarcas.value == 'all') {
        mostrarProductos(stockProductos)
    } else {
        let arrayNuevo = stockProductos.filter(item => item.marca == selecMarcas.value)

        mostrarProductos(arrayNuevo)
    }
})


mostrarProductos(stockProductos)

function mostrarProductos(array) {

    contenedorProductos.innerHTML = ""

    for (const el of array) {

        let div = document.createElement('div')
        div.className = 'producto'
        div.innerHTML = ` <div class="card">
                                <div class="card-image">
                                    <img src="${el.img}">
                                    <span class="card-title">${el.nombre}</span>
                                    <a id="boton${el.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                                </div>
                                <div class="card-content">
                                    <p>Marca: ${el.marca}</p>
                                    <p> $ ${el.precio}</p>
                                </div>
                            </div>`

        contenedorProductos.appendChild(div)

        let btnAgregar  =document.getElementById(`boton${el.id}`)

        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(el.id);
        })

    }


}



function agregarAlCarrito(id) {
    let yaExiste = carritoDeCompras.find(elemento => elemento.id == id)

    if (yaExiste) {
        yaExiste.cantidad = yaExiste.cantidad + 1
        document.getElementById(`cantidad${yaExiste.id}`).innerHTML = `<p id="cantidad${yaExiste.id}">Cantidad: ${yaExiste.cantidad}</p>`
        actualizarCarrito()
    } else {
        let productoAgregar = stockProductos.find(ele => ele.id === id)
        productoAgregar.cantidad = 1
        carritoDeCompras.push(productoAgregar)
        actualizarCarrito()
        mostrarCarrito(productoAgregar)
    }

}



function mostrarCarrito(productoAgregar) {

    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `<p>${productoAgregar.nombre}</p>
                <p>Precio: $${productoAgregar.precio}</p>
                <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    btnEliminar.addEventListener('click', () => {
        if (productoAgregar.cantidad == 1) {
            btnEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(item => item.id !== productoAgregar.id)
            actualizarCarrito()
        } else {
            productoAgregar.cantidad = productoAgregar.cantidad - 1
            document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>`
            actualizarCarrito()
        }
    })
}




function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
    let productoJson = JSON.stringify(stockProductos)
    localStorage.setItem("Productos", productoJson)
}





