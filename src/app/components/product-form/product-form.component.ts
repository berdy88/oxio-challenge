import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';
import {Router, RouterLink} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  productForm: FormGroup;

  categories = [
    'beauty',
    'fragrances',
    'furniture',
    'groceries',
    'home-decoration',
    'kitchen-accessories',
    'laptops',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'mobile-accessories',
    'motorcycle',
    'skin-care',
    'smartphones',
    'sports-accessories',
    'sunglasses',
    'tablets',
    'tops',
    'vehicle',
    'womens-bags',
    'womens-dresses',
    'womens-jewellery',
    'womens-shoes',
    'womens-watches'
  ];


  constructor(private formBuilder: FormBuilder, public productsService: ProductsService, private router: Router) {
    this.productForm = formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      category: [undefined, Validators.required],
      price: [undefined, [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/), Validators.min(0)]],
      rating: [undefined, [Validators.required, Validators.pattern(/^\d+(\.\d{2})?$/), Validators.min(0)]],
    });
  }

  async submitProduct() {
    if (this.productForm.valid) {
      // send data
      this.productsService.addProduct(this.productForm.getRawValue()).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
