import {
  Component,
  OnInit,
  AfterViewChecked,
  AfterViewInit
} from '@angular/core';

declare let braintree: any;
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
    braintree: braintree,
    env: 'sandbox',
    client: {
      sandbox:
        'AVscrcenUyQSykVSBQJ6QOv3aR3umWGGT7MsJekCrZClVEvzRUaClk6Z1ra1N_tTrDiHHx5j4W6pR2C2',
      production: '<insert production client id>'
    },
    // commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, curreny: 'HKD' } }
          ]
        }
      });
    },

    onAuthorize: function(data, actions) {
      // Call your server with data.nonce to finalize the payment

      console.log('Braintree nonce:', data.nonce);

      // Get the payment and buyer details

      return actions.payment.get().then(function(payment) {
        console.log('Payment details:', payment);
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
      // scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.src =
        'https://js.braintreegateway.com/web/3.11.0/js/paypal-checkout.min.js';
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
