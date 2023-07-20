import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { finalize } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from 'src/models/product.model';
import { UserProductService } from 'src/app/user-client/services/user-product.service';
import { AdminProductService } from '../services/admin-product.service';
import { AdminUploadService } from '../services/admin-upload.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  isQuerying = false;
  isSubmiting = false;
  isIdNotFound = false;
  readonly isNew: boolean = false;
  product?: Product;

  formGroup: FormGroup<{ [K in keyof Product]: any }>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminProductService: AdminProductService,
    private userProductService: UserProductService,
    private adminUploadService: AdminUploadService
  ) {
    this.formGroup = new FormGroup({
      category: new FormControl<string>('', [Validators.required]),
      content: new FormControl<string>(''),
      description: new FormControl<string>(''),
      id: new FormControl(),
      is_enabled: new FormControl<boolean>(false),
      num: new FormControl<number>(null as any, [Validators.required]),
      origin_price: new FormControl<number>(null as any, [Validators.required]),
      price: new FormControl<number>(null as any, [Validators.required]),
      title: new FormControl<string>('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      imageUrl: new FormControl(environment.demoImgUrl),
      imagesUrl: new FormArray([]),
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.isIdNotFound = true;
      return;
    } else if (id === 'new') {
      this.isNew = true;
    } else {
      this.queryProduct(id);
    }
  }

  ngOnInit(): void { }

  queryProduct(id: string) {
    this.isQuerying = true;

    this.userProductService.getProduct(id).pipe(finalize(() => this.isQuerying = false)).subscribe(res => {
      this.product = res;
      this.resetForm();
    });
  }

  resetForm() {
    const imagesUrlFormArr = this.formGroup.get('imagesUrl') as FormArray;
    imagesUrlFormArr.clear();

    const product = this.product ?? {} as Product;
    product.imagesUrl?.forEach(url => this.pushNewImgCtrlToArray())
    this.formGroup.patchValue(product);
  }

  pushNewImgCtrlToArray(imageUrl = '') {
    const imagesUrlFormArr = this.formGroup.get('imagesUrl') as FormArray;
    imagesUrlFormArr.push(new FormControl(imageUrl, [Validators.required]));
  }

  uploadImage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.length ? inputElement.files[0] : null;
    inputElement.files = null;

    if (file) {
      this.adminUploadService.uploadImage(file).subscribe(imageUrl => {
        this.pushNewImgCtrlToArray(imageUrl);
      });
    }
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      this.snackBar.open('尚有欄位未通過驗證!', '關閉', { duration: 1000 });
      return;
    }

    this.isSubmiting = true;

    const value = this.formGroup.value as Product;

    if (this.isNew) {
      this.adminProductService.postProduct(value).pipe(finalize(() => {
        this.isSubmiting = false;
      })).subscribe(res => {
        this.snackBar.open(res.message, '關閉', { duration: 2000 });
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    } else {
      this.adminProductService.putProduct(value).pipe(finalize(() => {
        this.isSubmiting = false;
      })).subscribe(res => {
        this.snackBar.open(res.message, '關閉', { duration: 2000 });
        this.queryProduct(this.product!.id);
      });
    }
  }
}
