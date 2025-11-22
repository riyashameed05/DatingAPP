import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {
    this.createToastContainer();
   }

  private createToastContainer() {
    if(!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-end toast-bottom';
      document.body.appendChild(container);
    }
  }

  private createToastElement(message: string, alertClass: string, duration = 5000) {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');
    toast.innerHTML = `
        <span>${message}</span>
        <button class="btn btn-sm btn-ghost ml-4">✕</button>
    `;

    toast.querySelector('button')?.addEventListener('click', () => {
      container.removeChild(toast);
    });

    setTimeout(() => {
      if(container.contains(toast)){
        container.removeChild(toast);
      }
    }, duration);

    container.appendChild(toast);
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, 'alert-error', duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }

    info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info', duration);
  }
  
}
