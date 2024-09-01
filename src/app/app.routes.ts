import { Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProductsTableComponent} from './components/products-table/products-table.component';
import {ProductsVisualizationComponent} from './components/products-visualization/products-visualization.component';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: 'table', component: ProductsTableComponent},
      {path: 'visualization', component: ProductsVisualizationComponent}
    ]}
];
