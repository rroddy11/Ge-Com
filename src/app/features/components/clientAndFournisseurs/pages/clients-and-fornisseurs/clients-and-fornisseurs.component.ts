
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ClientsComponent } from '../../../clients/clients.component';
import { SuppliersComponent } from '../../../suppliers/suppliers.component';

@Component({
  selector: 'app-clients-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    ClientsComponent,
    SuppliersComponent,
    TranslateModule,
  ],
  templateUrl: './clients-and-fornisseurs.component.html',
  styleUrl: './clients-and-fornisseurs.component.scss',
})
export class ClientsAndSuppliersComponent {
  activeTab: 'clients' | 'suppliers' = 'clients';

  getTabClass(tab: string): string {
    return this.activeTab === tab ? 'tab-active' : 'tab-inactive';
  }

}
