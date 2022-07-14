import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastMixix = Swal.mixin({
    timer: 3000,
    timerProgressBar: true,
    backdrop: `swal2-backdrop-hide`,
    position: 'top-end',
    showConfirmButton: false,
    toast: true,
    showClass: {
      popup: 'animate__animated animate__slideInRight animate__faster'
    },
  });

  constructor() { }

  show(message: string, type: SweetAlertIcon) {
    this.toastMixix.fire({
      title: `<span class='fs-5'>${message}</span>`,
      icon: type
    });
  }
}
