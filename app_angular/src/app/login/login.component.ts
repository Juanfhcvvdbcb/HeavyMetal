import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogueoService } from 'app/logueo.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AppRoutingModule } from 'app/app-routing.module';

interface AuthResponse {
  message: string;
  status: 'success' | 'failure';

}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [LogueoService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
  });

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(
    private http: HttpClient,
    public LogueoService: LogueoService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("Hola");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const usuario = this.loginForm.value.username ?? '';
      const password = this.loginForm.value.password ?? '';

      if (usuario && password) {
        this.logueo(usuario, password);
      } else {
        console.error('Username or password is null or undefined');
      }
    }
  }


  logueo(username: string, password: string) {

    this.LogueoService.get_loggin(username, password).subscribe(

      (result: AuthResponse) => {
        
        if (result.status === 'success') {


         localStorage.setItem('userId', username || '');
         this.router.navigate(['/index', username]);
       } else if (result.status === 'failure') {
         alert('Usuario o contraseña errada');
       }
      },
      error => {
       console.error('Error en el inicio de sesión', error);
      }
    );
  }
}
