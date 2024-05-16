class carritoCompra{
    constructor(){
        this.carrito = [];
    }
    agregarProducto(producto){
      this.carrito.push(producto)
    };
    calcularTotal(){
        return this.carrito.reduce((acum, producto) => acum += producto.precio, 0 );
    };


    aplicarDescuento(descuento){
        const precioTotal = this.carrito.reduce((acum, producto) => acum += producto.precio, 0 )

        return precioTotal - (precioTotal * descuento) / 100
    };

}

const newCarrito = new carritoCompra()



module.exports = {
    carritoCompra
}
