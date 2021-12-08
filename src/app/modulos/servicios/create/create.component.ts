import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router) { }

    fgValidacion = this.fb.group({
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });
  

  ngOnInit(): void {
  }

  store(){
    let servicio = new ServicioModelo();

    new Date(this.fgValidacion.controls["fecha"].value).toISOString();
    
    servicio.fecha = this.fgValidacion.controls["fecha"].value;
    servicio.hora = this.fgValidacion.controls["hora"].value;
    servicio.valor = this.fgValidacion.controls["valor"].value;
 
    this.servicioService.store(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
