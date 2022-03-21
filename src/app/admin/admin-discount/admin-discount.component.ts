import {
  Component,
  OnInit
} from '@angular/core';
import { getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  IDiscountResponse
} from 'src/app/shared/interfaces/discount/discount.interface';
import {
  DiscountService
} from 'src/app/shared/services/discount/discount.service';

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
    private storage:Storage,
    private fb: FormBuilder,
    private discountService: DiscountService
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
      imagePath: ['']
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
      })
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.loadDiscounts();
      })
    }
    this.editStatus = false;
    this.discountForm.reset();
    // this.isUploaded = false;
    this.uploadPercent = 0;
    this.discountForm.reset;
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
      })
    }
  }

  //loading image in firebase
  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if(file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }
 //loading image
  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
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