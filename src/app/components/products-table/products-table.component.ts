import { Component } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {Product, ProductProperty} from '../../types/product';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    RouterLink
  ],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent {
  private sort$ = new BehaviorSubject<[ProductProperty, 'asc' | 'desc']>(['id', 'asc']);
  sortedProducts$: Observable<Product[]>;

  constructor(public productsService: ProductsService) {
    this.sortedProducts$ = combineLatest([
      this.sort$,
      this.productsService.products$
    ]).pipe(
      map(([[sortColumn, sortOrder], products]) => {
        // sorting
        products.sort((a, b) => {
          if (typeof a[sortColumn] === 'number') {
            return sortOrder === 'asc' ?
              a[sortColumn] - (b[sortColumn] as number) :
              (b[sortColumn] as number) - a[sortColumn]
          } else if (typeof a[sortColumn] === 'string') {
            return sortOrder === 'asc' ?
              a[sortColumn].localeCompare(b[sortColumn] as string) :
              (b[sortColumn] as string).localeCompare(a[sortColumn]);
          } else {
            return 0;
          }
        });

        return products;
      })
    );
  }

  sortColumn(columnToSort: ProductProperty) {
    const [sortedColumn, order] = this.sort$.getValue();

    if (sortedColumn === columnToSort) {
      this.sort$.next([columnToSort, order === 'asc' ? 'desc' : 'asc']);
    } else {
      this.sort$.next([columnToSort, 'asc']);
    }
  }
}
