import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {
  msg:boolean = true

  ngOnInit() {
    
  }
  
  mostrarConsola(name: string) {
    console.log(name)
  }

}
