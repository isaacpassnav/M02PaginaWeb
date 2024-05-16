const { carritoCompra } = require("./index")

describe("class carritoCompra", () =>{

    it("clase carritoCompra debe de existir", () =>{
        expect(carritoCompra).toBeInstanceOf(Function)
    });
    it("A 'new' instancia de carritoCompra debe ser una instancia correcta", () =>{

        const newCarrito = new carritoCompra();
        expect(newCarrito).toBeInstanceOf(carritoCompra);
    });
    it("Clase carritoCompra debe incluir los siguientes metodos:", () =>{
        expect(carritoCompra.prototype.constructor).toBeDefined();
        expect(carritoCompra.prototype.agregarProducto).toBeDefined();
        expect(carritoCompra.prototype.calcularTotal).toBeDefined();
        expect(carritoCompra.prototype.aplicarDescuento).toBeDefined();
    })
});

describe("constructor", () =>{
    it("El constructor debe inicializar como un array vacio", () =>{
        const newCarrito = new carritoCompra();

        expect(newCarrito).toEqual({carrito:[]})
    })
});

describe("agregarProducto", () =>{
    it("Debe recibir un objeto y agregarlo en el carrito", () =>{
        const newCarrito = new carritoCompra();
        const producto = {
            nombre: "laptop",
            precio: 2000,
            cantidad: 3
        };
        newCarrito.agregarProducto(producto)

        const result = [
            {
            nombre: "laptop",
            precio: 2000,
            cantidad: 3
        }
    ]

        expect(newCarrito.carrito).toEqual(result);
    });
});

describe("calcularTotal", () =>{
    it("debe calcular el total del precio de los productos", () =>{
        const newCarrito = new carritoCompra();
        const arrayProductos = [
            {
                nombre: "laptop",
                precio: 2000,
                cantidad: 3
            },
            {
                nombre: "laptop2",
                precio: 3000,
                cantidad: 4
            }, 
            {
                nombre: "laptop3",
                precio: 4000,
                cantidad: 5
            }
        ]
        arrayProductos.forEach((producto) => newCarrito.agregarProducto(producto))

        expect(newCarrito.calcularTotal()).toBe(9000)
    });
});

describe("aplicar descuento", () =>{
    it("debe caplicar el descuento recibido", () =>{
        const newCarrito = new carritoCompra();
        const arrayProductos = [
            {
                nombre: "laptop",
                precio: 2000,
                cantidad: 3
            },
            {
                nombre: "laptop2",
                precio: 3000,
                cantidad: 4
            }, 
            {
                nombre: "laptop3",
                precio: 4000,
                cantidad: 5
            }
        ]
        arrayProductos.forEach((producto) => newCarrito.agregarProducto(producto))

        expect(newCarrito.aplicarDescuento(10)).toBe(8100)
    });
});
