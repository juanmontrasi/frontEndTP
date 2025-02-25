import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  title: string = '';
  result: string = '';
  text: string = '';
  counter: number = 5;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const status = params['status'];
      const statusMessages: Record<string, { title: string; result: string }> = {
        success: { title: '¡Pago exitoso!', result: 'Pago realizado de forma exitosa' },
        failure: { title: '¡Pago rechazado!', result: 'El pago fue rechazado' },
        pending: { title: '¡Pago pendiente!', result: 'El pago está pendiente' }
      };

      if (statusMessages[status]) {
        this.title = statusMessages[status].title;
        this.result = statusMessages[status].result;
      } else {
        this.title = '¡Error!';
        this.result = 'Ha ocurrido un error inesperado';
      }

    });
    this.timer();
  }

  timer() {
    setInterval(() => {
      if (this.counter > 0) {
        this.text = `Serás redirigido en ${this.counter} segundos`;
        this.counter--;
      } else {
        this.router.navigate(['/']);
      }
    }, 1000);
  }
}
