import {Injectable} from '@angular/core';
import {BehaviorSubject, finalize, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../types/product';


const API_URL = 'https://dummyjson.com';

interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  loading$ = new BehaviorSubject(false);
  private productsData = new BehaviorSubject<Product[]>([]);
  products$ = this.productsData.asObservable();

  constructor(private httpClient: HttpClient) {
    this.refresh();
  }

  refresh() {
    this.loading$.next(true);

    this.httpClient.get<ApiResponse>(`${API_URL}/products?select=title,category,price,rating`)
      .pipe(
        // catchError(),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(response => {
        this.productsData.next(response.products);
      })
  }

  addProduct(newProduct: Partial<Product>) {
    this.loading$.next(true);
    return this.httpClient.post<Product>(`${API_URL}/products/add`, newProduct).pipe(
      tap((addedProduct) => {
        // this.refresh();
        this.productsData.next([...this.productsData.getValue(), addedProduct]);
      }),
      // catchError(),
      finalize(() => this.loading$.next(false)));
  }
}
