import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/products/products.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminProducts:Array <IProductResponse>=[];
  public adminCategories: Array<ICategoryResponse> = [];
  public productForm!:FormGroup;
  public editStatus = false;
  public uploadPercent =0;
  public isUploaded = false;
  private currentProductId!: number | string;
  public isOpen = false;

  constructor(
    private fb:FormBuilder,
    private categoryService: CategoryService,
    private productService:ProductService,
    private imageService:ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.initProductForm();
  }

  loadCategories(): void {
    //for json server
    // this.categoryService.getAll().subscribe(data => {
    //   this.adminCategories = data;
    //   this.productForm.patchValue({
    //     ctegory:this.adminCategories[0].id
    //   })
    // })
    //for firebase
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
  }

  loadProducts(): void {
    //for json server
    // this.productService.getAll().subscribe(data => {
    //   this.adminProducts = data;
    // })
    //for firebase
    this.productService.getAllFirebase().subscribe(data => {
      this.adminProducts = data as IProductResponse[];
    })
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count:[1]
    });
  }

  addProduct():void{
    if(this.editStatus){
      //for json server
      // this.productService.update(this.productForm.value, this.currentProductId).subscribe(() => {
      //   this.loadCategories();
      //   this.loadProducts();
      //   this.toastr.success('Товар успішно оновлено!');
      // })
      //for firebase
      this.productService.updateFirebase(this.productForm.value, this.currentProductId as string).then(()=>{
          this.loadCategories();
          this.loadProducts();
          this.toastr.success('Товар успішно оновлено!');
      })
    } else {
      //for json server
      // this.productService.create(this.productForm.value).subscribe(() => {
      //   this.loadCategories();
      //   this.loadProducts();
      //   this.toastr.success('Товар успішно додано!');
      // })
      //for firebase
      this.productService.createFirebase(this.productForm.value).then(() => {
        this.loadCategories();
        this.loadProducts();
        this.toastr.success('Товар успішно додано!');
      })
    }
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.isOpen = false;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadPercent = this.imageService.uploadPercent;
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        if (this.uploadPercent === 100){
          this.isUploaded = true;
      }
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

  editProduct(product: IProductResponse){
    this.productForm.patchValue({
      category:product.category,
      name: product.name,
      path: product.path,
      description:product.description,
      weight:product.weight,
      price:product.price,
      imagePath: product.imagePath
    });
    this.editStatus = true;
    this.currentProductId = product.id;
    this.isUploaded = true;
    this.isOpen = true;
    window.scroll({
      top:0,
      behavior:'smooth'
    })
  }

  deleteProduct(product: IProductResponse):void{
    //for json server
    // if (confirm('Видалити цей продукт?')){
    // this.productService.delete(product.id).subscribe(()=>{
    //   this.loadProducts();
    //   this.toastr.success('Товар успішно видалено!');
    // })}
    //for firebase
    if (confirm('Видалити цей продукт?')){
    this.productService.deleteFirebase(product.id as string).then(()=>{
      this.loadProducts();
      this.toastr.success('Товар успішно видалено!');
    })}
  }

  deleteImage():void{
    this.imageService.deleteUploadFile(this.valueByControl(
      'imagePath')).then(()=> {
        this.isUploaded=false;
        this.uploadPercent = 0;
        this.productForm.patchValue({imagepath:null});
      }).catch(err => {console.log(err);})
  }

  toggleOpenForm():void{
    this.isOpen=!this.isOpen;
    this.isUploaded = false;
    this.editStatus = false;
  }

}
