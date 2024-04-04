import { Component, HostListener } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isMenuOpen: boolean = true;
  wasMenuHidden: boolean = false; // Adicione esta variável
  drawerMode: MatDrawerMode = 'side'; // Tipo correto para drawerMode

  constructor() {
    // Define o modo do drawer baseado no tamanho inicial da janela
    this.setDrawerMode(window.innerWidth);
  }

  toggleMenu() {
    if (!this.isMenuOpen) {
      this.wasMenuHidden = true; // Marca que o menu estava oculto
    }
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Verifica se a largura da janela é igual à largura da tela disponível
    if (window.innerWidth === window.screen.availWidth) {
      this.setDrawerMode(window.innerWidth);
    } else {
      this.setDrawerMode(event.target.innerWidth);
    }
  }
  
  setDrawerMode(windowWidth: number) {
    if (windowWidth < 560) {
      this.drawerMode = 'over' as MatDrawerMode; // Ajusta o tipo e valor
      if (!this.isMenuOpen) {
        this.wasMenuHidden = true; // Marca que o menu estava oculto
      }
    } else {
      // Verifica se o sidenav estava oculto em modo 'over' e a janela foi redimensionada para uma largura maior que 560
      if (this.drawerMode === 'over' && !this.isMenuOpen) {
        this.drawerMode = 'side' as MatDrawerMode; // Ajusta o tipo e valor para 'side'
        this.isMenuOpen = true; // Abre o menu
        this.wasMenuHidden = false; // Reseta a variável
      } else {
        this.drawerMode = 'side' as MatDrawerMode; // Ajusta o tipo e valor
      }
    }
  }
}
