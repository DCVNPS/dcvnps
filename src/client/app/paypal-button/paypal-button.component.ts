import { Component, AfterViewChecked } from '@angular/core';
import { SafeMethodCall } from '@angular/compiler';
declare let paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements AfterViewChecked {
  addScript = false;
  paypalLoad = true;
  finalAmount = 50.00;
  private SB_CLIENT_ID = 'AZzmfRuo1IGXpa4ZCxlXFCYL8sOhqoVwbnUBXbN8pIa-1xKoaBi03cgcRNpNsUqURZhLARAxb2paPkYR'
  // FAIL_DATA = {
  //   sender_batch_header: {
  //     sender_batch_id: '1524086406556',
  //     email_subject: 'This email is related to simulation'
  //   },
  //   purchase_units: [{
  //     recipient_type: 'EMAIL',
  //     receiver: 'payouts-simulator-receiver@paypal.com',
  //     note: 'ERRPYO002',
  //     sender_item_id: '15240864065560',
  //     amount: { value: `${this.finalAmount * 1.05}`, currency: 'USD' }
  //   }]
  // };
  paypalConfig = {
      style: {
      color: 'gold',
      shape: 'rect',
      label: 'pay',
      height: 30
    },
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: { value: `${this.finalAmount * 1.05}`, currency: 'USD' }
        }]
      });
    },
    onApprove: (data, actions) => {
      console.log(data);
      return actions.order.capture().then((details) => {
        if (details.error === 'SENDER_EMAIL_UNCONFIRMED') {
          console.log(details);
          return actions.restart();
        }
        // Show success message to buyer
        alert(`Transaction completed by ${details.payer.name.given_name}`);
        console.log(details);
        // call the server to save transaction
        // need to create api router to handl this request.
        // return fetch('/paypal-transaction-complete', {
        //   method: 'post',
        //   headers: {
        //     'content-type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     odrderID: data.orderID
        //   })
        // });
      });
    }
  };
  constructor() { }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Buttons(this.paypalConfig).render('#paypal-button-container');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = `https://www.paypal.com/sdk/js?client-id=${this.SB_CLIENT_ID}&currency=USD&disable-funding=credit`;
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
}
