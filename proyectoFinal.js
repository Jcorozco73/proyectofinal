let productos = [
    {
        id: 11,
        nombre: "hp pavilion",
        categoria: "core i5",
        descripcion: "color plateado 8gb ram 256gb dd",
        precio: 70000,
        stock: 3,
        img: "hp1.jpg"

    },
    {
        id: 12,
        nombre: "acer",
        categoria: "core i7",
        descripcion: "color negro 16gb ram 1tb dd",
        precio: 90000,
        stock: 2,
        img: "acer.jpg" 
    },
    {
        id: 13,
        nombre: "lenovo",
        categoria: "core i3",
        descripcion: "color plateado 4gb ram 1tb dd",
        precio: 70000,
        stock: 1,
        img: "lenovo.jpg" 
    },
    {
        id: 14,
        nombre: "samsung",
        categoria: "core m3",
        descripcion:"color blanco pantalla tactil 4gb ram 64gb dd",
        precio: 100000,
        stock: 2,
        img: "samsung.jpg" 
    },
    {
        id: 15,
        nombre: "huawei",
        categoria: "core i5",
        descripcion: "color negro pantalla tactil 8gb ram 256gb dd",
        precio: 60000,
        stock: 2,
        img: "huawei .jpg" 
    },
    {
        id: 16,
        nombre:  "lg",
        categoria: "core i5",
        descripcion: "color plateado 8gb ram 256gb dd",
        precio: 90000,
        stock: 1,
        img: "lg.jpg" 
    },
    {
        id: 17,
        nombre: "dell",
        categoria: "core i5",
        descripcion: "color plateado 8gb ram 256gb dd",
        precio: 90000,
        stock: 3,
        img: "dell.jpg" 
    },
    {
        id: 18,
        nombre: "hp",
        categoria: "core i5",
        descripcion: "color plateado 8gb ram 256gb dd",
        precio: 90000,
        stock: 3,
        img: "hp1.jpg"    
    },
    {
        id: 19,
        nombre: "apple",
        categoria: "core i3",
        descripcion: "color negro 8gb ram 256gb dd",
        precio: 90000,
        stock: 3,
        img: "apple.jpg" 
    }
]




const carrito = document.querySelector("#carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const listaProductos = document.querySelector("#lista-productos")

let articulosCarrito = []


llamarEventListeners()

function llamarEventListeners() {
       // Cuando agregas un producto pulsando agregar carrito
       listaProductos.addEventListener("click", agregarCarrito)

       //Elimina productos del carrito

       carrito.addEventListener("click", eliminarProducto)

       document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || []

        carritoHTML()

       })

       vaciarCarrito.addEventListener("click", ()=>{
        //console.log("vaciandoCarrito")

        articulosCarrito = [] //reseteamos el arreglo

        limpiarHTML() //Eliminamos todo el HTML

        //Muestra los cursos en el localStorage
    
       })
}    


//Funciones

function agregarProducto(e) {
       e.preventDefault()

       if(e.target.classList.contains("agregar-carrito")) {

              const productoSeleccionado = e.target.parentElement.parentElement
              leerDatosProducto(productoSeleccionado)
       }
}       
// Elimina productos del carrito
function eliminarProducto() {
    //console.log(e.target.classList)
    if(e.target.classList.contains("borrar-curso")){
        const productoId = e.target.getAtributte("data-id")

        //Elimina del arreglo del carrito por id

        articulosCarrito = articulosCarrito.filter(producto => producto.id === productoId)

        carritoHTML() //itira sobre el carrito y mostrar su html
    }
}


//Lee el contenido del html haciendo click

function leerDatosProducto(producto) {
      //console.log(curso)

      // Crear un objeto con el contenido del curso actual
       const infoProducto = {
              imagen: producto.querySelector("img").src,
              precio: producto.querySelector(".precio").textContent,
              titulo: producto.querySelector("h4").textcontent,
              id:     producto.querySelector("a").getAtributte("data-id"),
              cantidad: 1
       }

       // verificar si un objeto esta en el carrito

       const existe = articulosCarrito.some(producto => producto.id === infoProducto.id)

       if(existe) {

        //agregamos la cantidad

        const productos = articulosCarrito.map(producto => {
            
            if(producto.id === infoProducto.id) {
                producto.cantidad++
                return producto // retorna el objeto actualizado
            } else {
                return producto // retorna los objetos que no son duplicados
            }
            
        })

       

        articulosCarrito = [...productos]

       } else {
        //agregamos el producto al carrito

        articulosCarrito = [...articulosCarrito, infoProducto]
       }

       
       

       console.log(infoProducto)
}
// Agregar articulos al carrito


console.log(articulosCarrito)

carritoHTML()

//Muestra al carrito de compras en el HTML

function carritoHTML() {

        //limpia el html
        limpiarHTML()


       articulosCarrito.forEach(producto => {
        const {imagen, nombre, precio, descripcion, categoria, stock, id} = producto      
        const row = document.createElement("div")
              row.innerHTML = 
              `
              <div>
              <img src= "${imagen}" width = "100">
              </div>
            <div>${nombre}</div>
            <div>${precio}</div>
            <div>${descripcion}</div>
            <div>${categoria}</div>
            <div>${stock}</div>
            <div>
                <a href ="#" class= "borrar-carrito" data-id "${id}"> X </a>
            </div>

              `
           contenedorCarrito.appendChild(row)
       })

       sincronozarStorage()

       
}

function sincronozarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
}

// Elimina los productos HTML

function limpiarHTML() {
    //forma lenta
   // contenedorCarrito.innerHTML = " "

   while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
   }

}
