import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {
  public authForm!: FormGroup; 
  public isLogin = false;
  public loginSubscription!:Subscription;

  constructor(
    private toastr :ToastrService,
    private fb: FormBuilder,
    private dialogRef:MatDialogRef<AuthDialogComponent>,
    private auth:Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginUser():void{
    // this.dialogRef.close({
    //   formData:this.authForm.value
    // })
    const {email, password} = this.authForm.value;
    this.login(email, password).then(() => {
      this.toastr.success('Ви ввійшли в свій кабінет!');
      // this.dialogRef.close();
    }).catch(e => {
      console.log('error', e)
     this.toastr.error(e.message);
     
    })
  }

  async login(email:string, password:string):Promise <void>{
    const credential = await signInWithEmailAndPassword(this.auth, email , password);
    this.loginSubscription = docData(doc(this.afs, 'Users', credential.user.uid)).subscribe(user =>{
      // console.log('user', user)
      const currentUser = {...user, uid:credential.user.uid};
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user.role === ROLE.USER){
        this.router.navigate(['/user-profile'])
      }else if (user && user.role === ROLE.ADMIN){
         this.router.navigate(['/admin']);
      }
        this.accountService.isUserLogin$.next(true);
    },(e)=>{
       console.log('error', e)
      })
  }


  //create user
  registerUser(){
    const{ email, password } = this.authForm.value;
    this.emailSignUp(email,password).then(() => {
      this.toastr.success('Користувача успішно створено');
      this.isLogin = !this.isLogin;
      this.authForm.reset();
    }).catch (e => {
      this.toastr.error(e.message);
    })
  }
  
  async emailSignUp(email:string, password:string):Promise<any>{
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email:credential.user.email,
      firstName: '',
      lastName:'',
      phoneNumber:'',
      address:'',
      orders:[],
      role:'USER'
    }
    setDoc(doc(this.afs, 'Users', credential.user.uid), user);
    console.log("mail sign up", credential);
    
  }

  changeLogin(){
    this.isLogin = !this.isLogin;
  }


 


}
