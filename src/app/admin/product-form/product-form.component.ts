import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: FirebaseListObservable<any[]>;
  product: Object = {};
  id: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {

    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).take(1).subscribe(p => {
        this.product = p;
      });
    }
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) {
      this.productService.update(product, this.id);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

}
