import { CLIENTES } from './clientes.json';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  createCliente(cliente: Cliente) : Observable<any>{
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Error al crear cliente',
          text: e.error.mensaje,
          showConfirmButton: false,
          timer: 5000
        })
        return trhowError(()=>e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => { 
        this.router.navigate(['/clientes']);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al obtener cliente',
          text: e.error.mensaje,
          showConfirmButton: false,
          timer: 5000
        })
        return trhowError(()=>e) as Observable<Cliente>;
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Error al actualizar',
          text: e.error.mensaje + e.error.error,
          showConfirmButton: false,
          timer: 5000
        })
        return trhowError(()=>e);
      })
    );
  }

  deleteCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${cliente.id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Error al eliminar',
          text: e.error.mensaje,
          showConfirmButton: false,
          timer: 5000
        })
        return trhowError(()=>e) as Observable<Cliente>;
      })
    );
  }
}
function trhowError(e: any): any {
  throw new Error('Function not implemented.');
}

