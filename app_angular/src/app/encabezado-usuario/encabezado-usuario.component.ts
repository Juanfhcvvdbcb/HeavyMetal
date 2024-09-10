import { Component } from '@angular/core';

@Component({
  selector: 'app-encabezado-usuario',
  standalone: true,
  imports: [],
  templateUrl: './encabezado-usuario.component.html',
  styleUrl: './encabezado-usuario.component.scss'
})
export class EncabezadoUsuarioComponent {
  appTitle = 'heavy-metal';
  toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('show-sidebar');
    }
  }

  toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    const arrow = document.querySelector('.profile .arrow');
    if (dropdown) {
      dropdown.classList.toggle('show-dropdown');
    }
    if (arrow) {
      arrow.classList.toggle('up');
    }
  }

  toggleSubmenu(event: Event, submenuId: string): void {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    const submenu = document.getElementById(submenuId);
    if (submenu) {
      submenu.classList.toggle('show');
    }
  }
}
