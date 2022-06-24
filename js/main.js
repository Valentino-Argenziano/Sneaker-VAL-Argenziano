let carritoDeCompras = []


const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecMarcas = document.getElementById('selecMarcas')
const buscador = document.getElementById('search')

window.addEventListener("DOMContentLoaded", () => {
    ProductosCarrito()
})



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

        let btnAgregar = document.getElementById(`boton${el.id}`)

        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(el.id);
        })

    }


}



function agregarAlCarrito(id) {
    let yaExiste = carritoDeCompras.find(elemento => elemento.id == id)
    let dataStorage = JSON.parse(localStorage.getItem(id))
    let productoAgregar = stockProductos.find(ele => ele.id === id)

    if (dataStorage) {
        dataStorage.cantidad = dataStorage.cantidad + 1
        dataStorage.precio = dataStorage.precio + productoAgregar.precio
        localStorage.setItem(id, JSON.stringify(dataStorage))
        ProductosCarrito()
    } else {
        productoAgregar.cantidad = 1
        localStorage.setItem(id, JSON.stringify(productoAgregar))
        ProductosCarrito()
    }
}



const renderCard = () => {
    let productosPanelVista = ''

    carritoDeCompras.forEach(producto => {
        {
            productosPanelVista +=

                `<p>${producto.nombre}</p>
                    <p>Precio: $${producto.precio}</p>
                            <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
                        <button  class="boton-eliminar"><i id="eliminar" data-id="${producto.id}" class="fas fa-trash-alt"></i></button>`
        }
    });
    contenedorCarrito.innerHTML = productosPanelVista
}




const ProductosCarrito = () => {
    try {
        carritoDeCompras.length = 0
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            typeof JSON.parse(localStorage.getItem(key)) == 'object' && carritoDeCompras.push(JSON.parse(localStorage.getItem(key)))
        }
        renderCard()
        actualizarCarrito()
    } catch (err) {
        console.error("Algo no salio como se esperaba", err)
    }
}



function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
}

contenedorCarrito.addEventListener("click", (e)=>{
    if(e.target.id==="eliminar"){
        borrarProducto(parseFloat(e.target.dataset.id))
    }
})

function borrarProducto(id){
    let dataStorage = JSON.parse(localStorage.getItem(id))
    if(dataStorage.cantidad > 1){
        dataStorage.cantidad = dataStorage.cantidad - 1
        localStorage.setItem(id, JSON.stringify(dataStorage))
        ProductosCarrito()
    }else{
        localStorage.removeItem(id)
        ProductosCarrito()
    }

}



