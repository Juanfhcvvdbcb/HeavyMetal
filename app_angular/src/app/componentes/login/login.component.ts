import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AppRoutingModule } from 'app/app-routing.module';
import { UsuariosService } from 'app/servicios/usuarios.service';
import { SharedService } from 'app/servicios/shared.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [UsuariosService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorVisible = false;
  isPasswordVisible: boolean = false;
  loginForm = new FormGroup({
    'identificacion': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    'password': new FormControl('', Validators.required),
  });


  constructor(
    private http: HttpClient, 
    private router: Router,
    private UsuariosService: UsuariosService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    console.log("Hola");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const identificacionControl = this.loginForm.get('identificacion');
      const passwordControl = this.loginForm.get('password');

      if (identificacionControl && passwordControl) {
        const id_usuario = +identificacionControl.value!;
        const contraseña = passwordControl.value!;

        this.UsuariosService.authenticateUser(id_usuario, contraseña).subscribe(
          (response) => {
            console.log("Detail es: ",response.detail);
            if (response.detail === 'OK') {
              this.UsuariosService.getUserData(id_usuario).subscribe(
                userData => {
                  console.log('Datos del usuario:', userData);
                  if (userData.id_rol === 1) {
                    this.router.navigate(['/admin']);
                  } else {
                    this.router.navigate([`/index/${id_usuario}`]);
                  }
                  this.UsuariosService.setAuthenticated(true);
                  this.UsuariosService.setUserId(id_usuario);
                  this.sharedService.setUserId(id_usuario);
                  this.sharedService.setUserRole(userData.id_rol.toString());
                },
                error => {
                  console.error('Error al obtener los datos del usuario:', error);
                }
              );
            } else {
              this.showError();
              console.error('Autenticación fallida');
            }
          },
          (error) => {
            console.error('Error en la autenticación:', error);
            this.showError();
          }
        );
      } else {
        console.error('Form controls are not present');
      }
    } else {
      console.error('Formulario no es válido');
    }
  }

  showError() {
    this.errorVisible = true;
  }

  closeError() {
    this.errorVisible = false;
  }

  

}
