// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DatabaseService {
//   private apiUrl = 'http://localhost:8000/api'; // URL de API de Laravel

//   constructor(private http: HttpClient) { }

//   // Métodos para interactuar con la API de Empleados
//   obtenerEmpleados(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/empleado`);
//   }

//   agregarEmpleado(empleado: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/empleado`, empleado);
//   }

//   actualizarEmpleado(nombre: string, empleado: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/empleado/${nombre}`, empleado);
//   }

//   eliminarEmpleado(nombre: string): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/empleado/${nombre}`);
//   }

//   // Métodos para interactuar con la API de Productos
//   obtenerProductos(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/producto`);
//   }

//   agregarProducto(producto: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/producto`, producto);
//   }

//   actualizarProducto(clave: number, producto: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/producto/${clave}`, producto);
//   }

//   eliminarProducto(clave: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/producto/${clave}`);
//   }

//   // Métodos para interactuar con la API de Ventas
//   obtenerVentas(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/venta`);
//   }

//   agregarVenta(venta: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/venta`, venta);
//   }

//   actualizarVenta(folio: number, venta: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/venta/${folio}`, venta);
//   }

//   eliminarVenta(folio: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/venta/${folio}`);
//   }

//   // Métodos para interactuar con la API de DetalleVenta
//   obtenerDetallesVenta(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/detalle-venta`);
//   }

//   agregarDetalleVenta(detalleVenta: any): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/detalle-venta`, detalleVenta);
//   }

//   actualizarDetalleVenta(id: number, detalleVenta: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/detalle-venta/${id}`, detalleVenta);
//   }

//   eliminarDetalleVenta(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/detalle-venta/${id}`);
//   }
// }