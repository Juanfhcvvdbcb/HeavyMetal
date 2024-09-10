import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedService } from 'app/servicios/shared.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private sharedService: SharedService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.sharedService.getUserRole();

    if (userRole !== '2') { // Assuming '2' is the role for clients
      return true;
    } else {
       alert('Acceso denegado'); // Display an alert with "Acceso denegado"
      return false;
    }
  }
}