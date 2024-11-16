import { Component, Input } from '@angular/core';
import { Venta, ProductoVenta } from '../ventas/ventas.component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent {
  @Input() venta: Venta;

  get cantidadTotal(): number {
    return this.venta.productos.reduce((total, producto) => total + producto.cantidad, 0);
  }

  constructor() {
    this.venta = {
      folio: 0,
      fecha: new Date(),
      idEmpleado: '',
      productos: [],
      monto: 0
    };
  }

  generarPDF() {
    const doc = new jsPDF();

    // Configurar estilos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 139); // Azul oscuro

    // Agregar título
    doc.text('Detalle de Venta', 105, 20, { align: 'center' });

    // Agregar información de la venta
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Negro
    doc.text(`ID: ${this.venta.folio}`, 20, 40);
    doc.text(`Folio: ${this.venta.folio}`, 20, 50);
    doc.text(`Fecha: ${new Date(this.venta.fecha).toLocaleDateString()}`, 20, 60);
    doc.text(`Empleado: ${this.venta.idEmpleado}`, 20, 70);

    // Agregar tabla de productos
    const tableData = this.venta.productos.map(producto => [producto.nombre, Number(producto.precio).toFixed(2), producto.cantidad]);
    (doc as any).autoTable({
      head: [['Producto', 'Precio', 'Cantidad']],
      body: tableData,
      startY: 80,
      headStyles: {
        fillColor: [0, 0, 139], // Azul oscuro
        textColor: [255, 255, 255], // Blanco
        fontSize: 12,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 10
      },
      theme: 'striped',
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 30, halign: 'right' },
        2: { cellWidth: 30, halign: 'center' }
      }
    });

    // Agregar cantidad total y monto total
    const totalY = (doc as any).previousAutoTable.finalY + 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Cantidad Total: ${this.cantidadTotal}`, 20, totalY);
    doc.text(`Total a Pagar: $${this.venta.monto.toFixed(2)}`, 120, totalY, { align: 'right' });

    // Agregar línea separadora
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 139); // Azul oscuro
    doc.line(20, totalY - 5, 190, totalY - 5);

    // Guardar el PDF
    doc.save('detalle_venta.pdf');
  }
}