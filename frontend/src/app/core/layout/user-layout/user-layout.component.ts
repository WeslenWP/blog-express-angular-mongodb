import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../types/user.types';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html'
})
export class UserLayoutComponent {
  isAdmin: boolean = false;
  user!: IUser;
  constructor(private _user: UserService) {
    this._user.user$.subscribe((user: any) => {


      this.isAdmin = (user.tipo === 'Admin');

    })
  }
}
