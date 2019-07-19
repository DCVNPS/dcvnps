import { Component, AfterViewChecked, Input } from '@angular/core';
declare let paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements AfterViewChecked {
  addScript = false;
  paypalLoad = true;
  @Input() purchaseAmount = 50.00;
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
      shape: 'pill',
      label: 'pay',
      height: 30
    },
    createOrder: (data, actions) => {
      const finalAmount = this.purchaseAmount * 1.05;
      return actions.order.create({
        purchase_units: [{
          amount: { value: `${finalAmount}`, currency: 'USD' }
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
      // tslint:disable-next-line: max-line-length
      scripttagElement.src = `https://www.paypal.com/sdk/js?client-id=${this.SB_CLIENT_ID}&currency=USD&disable-funding=credit&commit=true&components=buttons`;
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
}
