import { Component } from '@angular/core';
import { ClienteService } from './servico/cliente.service'; // ✅ Caminho correto para o serviço
import { PrincipalComponent } from './principal/principal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PrincipalComponent], //
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private clienteService: ClienteService) {} // ✅ Apenas injeção no construtor
}
