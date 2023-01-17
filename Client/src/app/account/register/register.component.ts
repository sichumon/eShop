// import { Component, OnInit } from '@angular/core';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { finalize } from 'rxjs/operators'
// import { UserRegistration } from 'src/app/shared/models/user';
// import { AccountService } from '../account.service';


// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit {

//   success: boolean;
//   error: string;
//   userRegistration: UserRegistration = { name: '', email: '', password: ''};
//   submitted: boolean = false;

//   constructor(private authService: AccountService, private spinner: NgxSpinnerService) {

//   }

//   ngOnInit() {
//   }

//   onSubmit() {

//     this.spinner.show();

//     this.authService.register(this.userRegistration)
//       .pipe(finalize(() => {
//         this.spinner.hide();
//       }))
//       .subscribe({
//         next:(result)=>{
//           if(result) {
//             this.success = true;
//           }
//         },
//         error:(err)=>{
//           this.error = err;
//           console.log('An error occurred during registration process');
//           console.log(err);
//         }
//       });
//   }
// }
