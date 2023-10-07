import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

    titulo: string = "Formulario para crear cliente";
    public cliente: Cliente = new Cliente();

    constructor(private clienteService: ClienteService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.cargarCliente()
    }

    cargarCliente(): void{
        this.activatedRoute.params.subscribe(params => {
            let id = params['id']
            if(id) {
                this.clienteService.getCliente(id).subscribe(
                    cliente => this.cliente = cliente
                )

            }
        })

    }


    create(): void {
        console.log("Clicked");
        console.log(this.cliente);
        this.clienteService.createCliente(this.cliente).subscribe(
            response => {
                  
                this.router.navigate(['/clientes'])

                Swal.fire({
                    title: 'Nuevo Cliente!',
                    text: response.mensaje + ': ' + response.cliente.nombre,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
                console.log(response.nombre);
                  
            }
        );
    }

    update(): void{
    this.clienteService.updateCliente(this.cliente).subscribe(
        response => {
                  
            this.router.navigate(['/clientes'])

            Swal.fire({
                title: 'Cliente Actualizado',
                text: `Cliente ${response.cliente.nombre} actualizado con éxito`,
                icon: 'success',
                confirmButtonText: 'Cool'
              })
            console.log(response);
              
        }
    )
}

}