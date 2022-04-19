import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IDiscountResponse
} from 'src/app/shared/interfaces/discount/discount.interface';
import {
  DiscountService
} from 'src/app/shared/services/discount/discount.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public adminDiscounts: Array < IDiscountResponse > = [];
  public discountForm!: FormGroup;
  public currentDiscountId = 0;
  public uploadPercent = 0;
  public editStatus = false;
  public editID!: number;
  public currentDate = new Date();

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private imageService:ImageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadDiscounts();
  }
  //form controller initaalization
  initCategoryForm(): void {
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  //loading data
  loadDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data;
    })
  }

  //button "add" "save"
  addDiscount(): void {
    if (this.editStatus) {
      this.discountService.update(this.discountForm.value,
        this.currentDiscountId).subscribe(() => {
        this.loadDiscounts();
        this.toastr.success('Акцію успішно оновлено!');
      })
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.loadDiscounts();
        this.toastr.success('Акцію успішно додано!');
      })
    }
    this.editStatus = false;
    this.discountForm.reset();
    this.uploadPercent = 0;
     // this.isUploaded = false;
    // this.discountForm.reset;
    window.scroll({
      top:0,
      behavior:'smooth'
    })
  }

  //button 'edit'
  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath
    });
    this.editStatus = true;
    this.currentDiscountId = discount.id;
    window.scroll({
      top:0,
      behavior:'smooth'
    })
  }
 
  //button delete
  deleteDiscount(discount: IDiscountResponse): void {
    if(confirm('Відновити акцію буде неможливо. Видалити акцію?')){
      this.discountService.delete(discount.id).subscribe(() => {
        this.loadDiscounts();
        this.toastr.success('Акцію успішно видалено!');
      })
    }
  }

 //loading image in image service
  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.uploadPercent = this.imageService.uploadPercent;
        this.discountForm.patchValue({
          imagePath: data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
//showing image
  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }

}