import {
  Component,
  OnInit,
  AfterViewChecked,
  AfterViewInit
} from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements AfterViewChecked {
  public scriptLoaded: boolean;

  public loading: boolean;

  public finalAmount: number;

  public paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox:
        'AVscrcenUyQSykVSBQJ6QOv3aR3umWGGT7MsJekCrZClVEvzRUaClk6Z1ra1N_tTrDiHHx5j4W6pR2C2',
      production: '<insert production client id>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, curreny: 'HKD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(() => {
        console.log('Payment Success');
      });
    }
  };

  constructor() {
    this.scriptLoaded = false;
    this.loading = true;
  }

  public loadPaypalScript() {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
      this.scriptLoaded = true;
    });
  }

  ngAfterViewChecked() {
    if (!this.scriptLoaded) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
      });
    }
  }
}
