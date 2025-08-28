import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { ProductsComponent } from './features/products/pages/products/products.component';
import { ClientsAndFornisseursComponent } from './features/clientAndFournisseurs/pages/clients-and-fornisseurs/clients-and-fornisseurs.component';
import { VentessAndAchatsComponent } from './features/ventesAndAchats/pages/ventess-and-achats/ventess-and-achats.component';
import { InventairesComponent } from './features/inventaires/pages/inventaires/inventaires.component';
import { RapportsComponent } from './features/rapports/pages/rapports/rapports.component';
import { ParamettresComponent } from './features/paramettres/pages/paramettres/paramettres.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        children: [
          { path: 'accueil', component: DashboardComponent },
          { path: 'product', component: ProductsComponent },
          {
            path: 'client&fournisseur',
            component: ClientsAndFornisseursComponent,
          },
          { path: 'vente&achat', component: VentessAndAchatsComponent },
          { path: 'inventaire', component: InventairesComponent },
          { path: 'rapport', component: RapportsComponent },
          { path: 'parametre', component: ParamettresComponent },
          { path: '', redirectTo: 'accueil', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: 'dashboard/accueil', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
