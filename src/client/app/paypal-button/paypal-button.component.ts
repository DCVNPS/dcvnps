import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { paypalDescription } from '../models/paypal.descriptiont';
import { ApiService } from '../services/api.service';
declare let paypal;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements OnInit {
  @Input() private purchaseAmount = 50.00;
  @Input() private purchaseDescription = paypalDescription.donation;
  @ViewChild('paypal') paypalElement: ElementRef;
  private authToken: any;
  private addScript = false;
  public paidFor = false;
  public paypalLoad = true;
  private SB_CLIENT_ID = 'AdyZCufrFNpgaWEz-y6CvOSLbzmDQNHuoAATdZqgCaNPVGUcxR0EETGv_JyaPQJCngKkWytVdo0j9Ezj'
  private paypalConfig = {
    style: {
      color: 'gold',
      shape: 'pill',
      label: 'paypal',
      height: 30
    },
    createOrder: (data, actions) => {
      const finalAmount = this.purchaseAmount * 1.05;
      return actions.order.create({
        purchase_units: [{
          "description": this.purchaseDescription,
          "amount": { value: `${finalAmount}`, currency: 'USD' }
        }]
      });
    },
    onApprove: async (data, actions) => {
      const order = await actions.order.capture();
      if (order.error === 'SENDER_EMAIL_UNCONFIRMED') {
        console.log(order);
        return actions.restart();
      }
      // console.log(data);
      console.log( JSON.stringify(order));
      this.paidFor = true;
      // Call server side to save the transaction contained in the order object.
      this.api.post('paypaltransactioncomplete',order)
      .subscribe(result =>{
        console.log(result);
      },
      error =>{
        console.log(error);
      });
    },
    onCancel: (data) => {
      if (data) {
        console.log(data.orderID);
      }
      alert('Payment canceled.');
    },
    onError: (err) => {
      console.log(err);
      alert(err);
    }
  };
  constructor(private api: ApiService) {
   }

  ngOnInit(): void {
    // console.log(this.purchaseDescription);
   // This way is used in the react development.
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Buttons(this.paypalConfig).render(this.paypalElement.nativeElement);
        this.paypalLoad = false;
      });
    }
  }
  // This way is used in the react development.
  // for the simplicity, add script to the <body> of the index.html is good enough to move forward
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      // tslint:disable-next-line: max-line-length
      scripttagElement.src = `https://www.paypal.com/sdk/js?client-id=${this.SB_CLIENT_ID}&currency=USD&disable-funding=credit,card&commit=true&components=buttons`;
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
}
