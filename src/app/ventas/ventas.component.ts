import { Component, OnInit } from '@angular/core';

export interface Venta {
  folio: number;
  fecha: Date;
  idEmpleado: string;
  productos: ProductoVenta[];
  monto: number;
}

interface Empleado {
  nombre: string;
}

interface Producto {
  nombre: string;
  precio: number;
}

export interface ProductoVenta {
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: Venta[] = [];
  empleados: Empleado[] = [];
  productos: Producto[] = [];
  ventaSeleccionada: Venta = {
    folio: 0,
    fecha: new Date(),
    idEmpleado: '',
    productos: [],
    monto: 0
  };
  productoSeleccionado: Producto = {
    nombre: '',
    precio: 0
  };
  cantidad: number = 1;

  constructor() { }

  ngOnInit() {
    this.cargarEmpleados();
    this.cargarProductos();
    this.cargarVentas();
  }

  cargarEmpleados() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
      this.productos = JSON.parse(productosGuardados);
    }
  }

  cargarVentas() {
    const ventasGuardadas = localStorage.getItem('ventas');
    if (ventasGuardadas) {
      this.ventas = JSON.parse(ventasGuardadas);
    }
  }

  guardarVentas() {
    localStorage.setItem('ventas', JSON.stringify(this.ventas));
  }

  agregarProducto() {
    if (this.productoSeleccionado && this.cantidad > 0) {
      const productoVenta: ProductoVenta = {
        nombre: this.productoSeleccionado.nombre,
        precio: this.productoSeleccionado.precio,
        cantidad: this.cantidad
      };
      this.ventaSeleccionada.productos.push(productoVenta);
      this.productoSeleccionado = {
        nombre: '',
        precio: 0
      };
      this.cantidad = 1;
    }
  }

  calcularMontoTotal(): number {
    return this.ventaSeleccionada.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  }

  agregarVenta() {
    const nuevoFolio = this.generarNuevoFolio();
    this.ventaSeleccionada.folio = nuevoFolio;
    this.ventaSeleccionada.fecha = new Date();
    this.ventaSeleccionada.monto = this.calcularMontoTotal();

    this.ventas.push({ ...this.ventaSeleccionada });
    this.guardarVentas();
    this.limpiarFormulario();
  }

  verDetalleVenta(index: number) {
    this.ventaSeleccionada = { ...this.ventas[index] };
  }

  eliminarVenta(index: number) {
    this.ventas.splice(index, 1);
    this.guardarVentas();
  }

  limpiarFormulario() {
    this.ventaSeleccionada = {
      folio: 0,
      fecha: new Date(),
      idEmpleado: '',
      productos: [],
      monto: 0
    };
    this.productoSeleccionado = {
      nombre: '',
      precio: 0
    };
    this.cantidad = 1;
  }

  generarNuevoFolio(): number {
    const maxFolio = Math.max(...this.ventas.map(v => v.folio), 0);
    return maxFolio + 1;
  }
}