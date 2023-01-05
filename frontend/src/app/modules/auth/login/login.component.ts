import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  signIn(): void {
    if (!this.isLoading) {
      this.isLoading = true
      this._authService.signIn(this.form.value).subscribe({
        next: () => this._router.navigateByUrl('/home'),
        error: (err) => {
          this.form.controls['senha'].setValue('');
          Object.keys(err.error).forEach((key: any) => this.form.controls[key].setErrors(err.error[key]));
          this.isLoading = false;
        }
      })
    }
  }

}
