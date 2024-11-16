import { Component, OnInit } from '@angular/core';

interface Empleado {
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  rfc: string;
  fechaNacimiento: string;
  curp: string;
}

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadoSeleccionado: Empleado = {
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    rfc: '',
    fechaNacimiento: '',
    curp: ''
  };
  indiceSeleccionado: number = -1;
  modalAgregarAbierto: boolean = false;
  modalEditarAbierto: boolean = false;
  modalEliminarAbierto: boolean = false;
  fechaMinima: string = '';
  fechaMaxima: string = '';


  constructor() { 
    // Obtener la fecha actual
    const fechaActual = new Date();
    // Formatear la fecha actual en el formato 'YYYY-MM-DD'
    this.fechaMaxima = fechaActual.toISOString().split('T')[0];
    // Establecer la fecha mínima como '1950-01-01'
    this.fechaMinima = '1950-01-01';
  }
    
  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  guardarEmpleados() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  abrirModalAgregar() {
    this.limpiarFormulario();
    this.modalAgregarAbierto = true;
  }

  cerrarModalAgregar() {
    this.modalAgregarAbierto = false;
  }

  agregarEmpleado() {
    this.empleados.push({ ...this.empleadoSeleccionado });
    this.guardarEmpleados();
    this.cerrarModalAgregar();
    this.limpiarFormulario();
  }

  abrirModalEditar(index: number) {
    this.indiceSeleccionado = index;
    this.empleadoSeleccionado = { ...this.empleados[index] };
    this.modalEditarAbierto = true;
  }

  cerrarModalEditar() {
    this.modalEditarAbierto = false;
  }

  actualizarEmpleado() {
    this.empleados[this.indiceSeleccionado] = { ...this.empleadoSeleccionado };
    this.guardarEmpleados();
    this.cerrarModalEditar();
    this.limpiarFormulario();
  }

  abrirModalEliminar(index: number) {
    this.indiceSeleccionado = index;
    this.empleadoSeleccionado = { ...this.empleados[index] };
    this.modalEliminarAbierto = true;
  }

  cerrarModalEliminar() {
    this.modalEliminarAbierto = false;
  }

  eliminarEmpleado() {
    this.empleados.splice(this.indiceSeleccionado, 1);
    this.guardarEmpleados();
    this.cerrarModalEliminar();
  }

  limpiarFormulario() {
    this.empleadoSeleccionado = {
      nombre: '',
      apPaterno: '',
      apMaterno: '',
      rfc: '',
      fechaNacimiento: '',
      curp: ''
    };
  }

  convertirMayusculas(campo: string) {
    if (campo === 'curp') {
      this.empleadoSeleccionado.curp = this.empleadoSeleccionado.curp.toUpperCase();
    } else if (campo === 'rfc') {
      this.empleadoSeleccionado.rfc = this.empleadoSeleccionado.rfc.toUpperCase();
    }
  }
}