import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsVisualizationComponent } from './products-visualization.component';

describe('ProductsVisualizationComponent', () => {
  let component: ProductsVisualizationComponent;
  let fixture: ComponentFixture<ProductsVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsVisualizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
