import {Component} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {map, Observable} from 'rxjs';
import {DataPoint} from '../../types/data-point';
import {ChartComponent} from './components/chart/chart.component';


interface CategorizedProducts {
  [category: string]: {
    products: number,
    rating: number
  }
}

@Component({
  selector: 'app-products-visualization',
  standalone: true,
  imports: [
    ChartComponent
  ],
  templateUrl: './products-visualization.component.html',
  styleUrl: './products-visualization.component.scss'
})
export class ProductsVisualizationComponent {
  productsData$: Observable<DataPoint[]>
  ratingData$: Observable<DataPoint[]>
  private categorizedProducts$: Observable<CategorizedProducts>;

  constructor(private productsService: ProductsService) {
    this.categorizedProducts$ = this.productsService.products$.pipe(
      map(products => {
        return products.reduce<CategorizedProducts>((categorized: CategorizedProducts, product) => {
          if (!categorized[product.category]) {
            categorized[product.category] = {products: 0, rating: 0};
          }

          categorized[product.category].products += 1;
          categorized[product.category].rating += product.rating;

          return categorized;
        }, {});
      }),
      map((summedRatingData) => {
        const averagedRatingData: CategorizedProducts = {};

        for (const category in summedRatingData) {
          averagedRatingData[category] = {
            products: summedRatingData[category].products,
            rating: parseFloat((summedRatingData[category].rating / summedRatingData[category].products).toFixed(2))
          };
        }

        return averagedRatingData;
      })
    );

    this.productsData$ = this.categorizedProducts$.pipe(
      map(data => {
        let categoryProducts: DataPoint[] = [];

        for (let category in data) {
          categoryProducts.push({name: category, y: data[category].products});
        }

        return categoryProducts;
      })
    );

    this.ratingData$ = this.categorizedProducts$.pipe(
      map(data => {
        let categoryRating: DataPoint[] = [];

        for (let category in data) {
          categoryRating.push({name: category, y: data[category].rating});
        }

        return categoryRating;
      })
    );
  }
}
