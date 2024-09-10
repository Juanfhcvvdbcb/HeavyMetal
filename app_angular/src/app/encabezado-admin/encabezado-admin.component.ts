import { Component } from '@angular/core';

@Component({
  selector: 'app-encabezado-admin',
  standalone: true,
  imports: [],
  templateUrl: './encabezado-admin.component.html',
  styleUrl: './encabezado-admin.component.scss'
})
export class EncabezadoAdminComponent {
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
