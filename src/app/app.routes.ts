import {Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProductsTableComponent} from './components/products-table/products-table.component';
import {ProductsVisualizationComponent} from './components/products-visualization/products-visualization.component';
import {ProductFormComponent} from './components/product-form/product-form.component';


export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {path: '', redirectTo: 'table', pathMatch: 'full'},
      {path: 'table', component: ProductsTableComponent},
      {path: 'visualization', component: ProductsVisualizationComponent}
    ]
  },
  {path: 'new-product', component: ProductFormComponent}
];
