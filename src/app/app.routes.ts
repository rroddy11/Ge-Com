import { Routes } from '@angular/router';
import { LoginComponent } from './features/page/auth/pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/page/dashboard/dashboard.component';
import { VentessAndAchatsComponent } from './features/page/ventesAndAchats/pages/ventess-and-achats/ventess-and-achats.component';
import { InventairesComponent } from './features/page/inventaires/pages/inventaires/inventaires.component';
import { RapportsComponent } from './features/page/rapports/pages/rapports/rapports.component';
import { ParamettresComponent } from './features/page/paramettres/pages/paramettres/paramettres.component';
import { ClientsAndSuppliersComponent } from './features/page/clientAndFournisseurs/pages/clients-and-fornisseurs/clients-and-fornisseurs.component';
import { ViewDetailClientComponent } from './features/components/view/view-detail-client/view-detail-client.component';
import { ViewDetailSupplierComponent } from './features/components/view/view-detail-supplier/view-detail-supplier.component';
import { ViewDetailProductComponent } from './features/components/view/view-detail-product/view-detail-product.component';
import { ProductsComponent } from './features/page/products/products.component';

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
          { path: 'clients-details/:id', component: ViewDetailClientComponent },
          {
            path: 'supplier-details/:id',
            component: ViewDetailSupplierComponent,
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
