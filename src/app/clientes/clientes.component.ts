import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] | undefined;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  deleteCliente(cliente: Cliente): void{
    Swal.fire({
      title: 'Are you sure?',
      text: `Estás seguro que quieres eliminar el cliente ${cliente.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(cliente).subscribe(
          response => {
            this.clientes = this.clientes?.filter(c => c !== cliente)
            Swal.fire('Cliente ' + cliente.nombre + ' eliminado');
            console.log(response)
          }
        )
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }


}
