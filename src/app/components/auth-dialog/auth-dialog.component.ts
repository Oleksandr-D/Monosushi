import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit {
  public authForm!: FormGroup;
  public registerForm!: FormGroup;
  public isLogin = false;
  public loginSubscription!: Subscription;
  public checkPassword = false;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private fr: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegisterForm();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  initRegisterForm(): void {
    this.registerForm = this.fr.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  loginUser(): void {
    // this.dialogRef.close({
    //   formData:this.authForm.value
    // })
    const { email, password } = this.authForm.value;
    if (email !== 'admin@gmail.com') {
      this.login(email, password)
        .then(() => {
          this.toastr.success('Ви ввійшли в свій кабінет!');
          // this.dialogRef.close();
        })
        .catch((e) => {
          console.log('error', e);
          this.toastr.error(e.message);
        });
    }
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    this.loginSubscription = docData(
      doc(this.afs, 'Users', credential.user.uid)
    ).subscribe(
      (user) => {
        // console.log('user', user)
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        if (user && user.role === ROLE.USER) {
          this.router.navigate(['/user-profile']);
        } else if (user && user.role === ROLE.ADMIN) {
          this.router.navigate(['/auth']);
        }
        this.accountService.isUserLogin$.next(true);
      },
      (e) => {
        console.log('error', e);
      }
    );
  }

  //create user
  registerUser() {
    const { email, password, firstName, lastName, phoneNumber } =
      this.registerForm.value;
    this.emailSignUp(email, password, firstName, lastName, phoneNumber)
      .then(() => {
        this.toastr.success('Користувача успішно створено');
        this.isLogin = !this.isLogin;
        this.registerForm.reset();
      })
      .catch((e) => {
        this.toastr.error(e.message);
      });
  }

  async emailSignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: number
  ): Promise<any> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = {
      email: credential.user.email,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      phoneNumber: this.registerForm.value.phoneNumber,
      address: '',
      orders: [],
      role: 'USER',
    };
    setDoc(doc(this.afs, 'Users', credential.user.uid), user);
  }

  changeLogin() {
    this.isLogin = !this.isLogin;
  }

  //check passwords
  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if (this.password.value !== this.confirmed.value) {
      this.registerForm.controls['confirmPassword'].setErrors({
        matchError: 'Паролі не співпадають!',
      });
    }
  }

  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  }

  get confirmed(): AbstractControl {
    return this.registerForm.controls['confirmPassword'];
  }

  //show errors
  checkVisibilityError(control: string, name: string): boolean | null {
    return this.registerForm.controls[control].errors?.[name];
  }
}
