import { Routes } from '@angular/router';
import { LoginComponent } from './features/components/auth/pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/components/dashboard/dashboard.component';
import { ProductsComponent } from './features/components/products/pages/products/products.component';
import { VentessAndAchatsComponent } from './features/components/ventesAndAchats/pages/ventess-and-achats/ventess-and-achats.component';
import { InventairesComponent } from './features/components/inventaires/pages/inventaires/inventaires.component';
import { RapportsComponent } from './features/components/rapports/pages/rapports/rapports.component';
import { ParamettresComponent } from './features/components/paramettres/pages/paramettres/paramettres.component';
import { ViewDetailProductComponent } from './features/components/view-detail-product/view-detail-product.component';
import { ClientsAndSuppliersComponent } from './features/components/clientAndFournisseurs/pages/clients-and-fornisseurs/clients-and-fornisseurs.component';

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
            component: ClientsAndSuppliersComponent,
          },
          { path: 'vente&achat', component: VentessAndAchatsComponent },
          { path: 'inventaire', component: InventairesComponent },
          { path: 'rapport', component: RapportsComponent },
          { path: 'parametre', component: ParamettresComponent },
          {
            path: 'product-details/:id',
            component: ViewDetailProductComponent,
          },
          { path: '', redirectTo: 'accueil', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: 'dashboard/accueil', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
