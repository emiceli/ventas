import { Component, OnInit } from '@angular/core';
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPrecioFormatter]'
})
export class PrecioFormatterDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const value = event.target.value;
    const formattedValue = this.formatPrice(value);
    this.el.nativeElement.value = formattedValue;
  }

  private formatPrice(value: string): string {
    // Eliminar todos los caracteres no numéricos excepto el punto decimal
    const cleanedValue = value.replace(/[^0-9.]/g, '');

    // Verificar si el valor contiene un punto decimal
    const decimalIndex = cleanedValue.indexOf('.');

    if (decimalIndex !== -1) {
      // Obtener la parte entera y decimal del valor
      const integerPart = cleanedValue.slice(0, decimalIndex);
      let decimalPart = cleanedValue.slice(decimalIndex + 1);

      // Agregar un cero al final de la parte decimal si solo tiene un dígito
      if (decimalPart.length === 1) {
        decimalPart += '0';
      }

      // Limitar la parte decimal a dos dígitos
      decimalPart = decimalPart.slice(0, 2);

      // Combinar la parte entera y decimal formateada
      return `${integerPart}.${decimalPart}`;
    }

    // Si el valor no contiene un punto decimal, agregar ".00" al final
    return `${cleanedValue}.00`;
  }
}
interface Producto {
  clave: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoSeleccionado: Producto = {
    clave: 0,
    nombre: '',
    descripcion: '',
    precio: 0
  };
  indiceSeleccionado: number = -1;
  modalAgregarAbierto: boolean = false;
  modalEditarAbierto: boolean = false;
  modalEliminarAbierto: boolean = false;

  constructor() { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
      this.productos = JSON.parse(productosGuardados);
    }
  }

  guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  abrirModalAgregar() {
    this.limpiarFormulario();
    this.modalAgregarAbierto = true;
  }

  cerrarModalAgregar() {
    this.modalAgregarAbierto = false;
  }

  agregarProducto() {
    const nuevaClave = this.generarNuevaClave();
    this.productoSeleccionado.clave = nuevaClave;
    this.productos.push({ ...this.productoSeleccionado });
    this.guardarProductos();
    this.cerrarModalAgregar();
    this.limpiarFormulario();
  }

  abrirModalEditar(index: number) {
    this.indiceSeleccionado = index;
    this.productoSeleccionado = { ...this.productos[index] };
    this.modalEditarAbierto = true;
  }

  cerrarModalEditar() {
    this.modalEditarAbierto = false;
  }

  actualizarProducto() {
    this.productos[this.indiceSeleccionado] = { ...this.productoSeleccionado };
    this.guardarProductos();
    this.cerrarModalEditar();
    this.limpiarFormulario();
  }

  abrirModalEliminar(index: number) {
    this.indiceSeleccionado = index;
    this.productoSeleccionado = { ...this.productos[index] };
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar() {
    this.modalEliminarAbierto = false;
  }

  eliminarProducto() {
    this.productos.splice(this.indiceSeleccionado, 1);
    this.guardarProductos();
    this.cerrarModalEliminar();
  }

  limpiarFormulario() {
    this.productoSeleccionado = {
      clave: 0,
      nombre: '',
      descripcion: '',
      precio: 0
    };
  }

  generarNuevaClave(): number {
    const maxClave = Math.max(...this.productos.map(p => p.clave), 0);
    return maxClave + 1;
  }
}