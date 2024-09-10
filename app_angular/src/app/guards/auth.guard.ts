import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from 'app/servicios/usuarios.service';
import { SharedService } from 'app/servicios/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usuariosService: UsuariosService, 
    private router: Router,
    private sharedService: SharedService
  ) {}

  canActivate(): boolean {
    if (this.usuariosService.isAuthenticated()) {
      const userId = this.usuariosService.getUserId();
      if (userId !== null) {
        this.sharedService.setUserId(userId);
      }
      return true;
    } else {
      alert('AuthGuard: User is not authenticated, redirecting to /login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}