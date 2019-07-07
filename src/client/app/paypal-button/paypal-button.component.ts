import { Component, AfterViewChecked } from '@angular/core';
declare let paypal: any;
  
@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements AfterViewChecked {
  addScript: boolean = false;
  paypalLoad: boolean = true;
  finalAmount: number = 50.00;
  SB_CLIENT_ID='AZzmfRuo1IGXpa4ZCxlXFCYL8sOhqoVwbnUBXbN8pIa-1xKoaBi03cgcRNpNsUqURZhLARAxb2paPkYR'
  paypalConfig = {
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units:[{
          amount: { value: `${this.finalAmount}`}
        }]
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then((details) =>{
        //Show success message to buyer
        alert(`Transaction completed by ${details.payer.name.given_name}`);
        console.log(details);
        //call the server to save transaction
        //need to create api router to handl this request.
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

  ngAfterViewChecked():void {
    if(!this.addScript){
      this.addPaypalScript().then(() =>{
        paypal.Buttons(this.paypalConfig).render('#paypal-button-container');
        this.paypalLoad = false;
      });
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = `https://www.paypal.com/sdk/js?client-id=${this.SB_CLIENT_ID}&currency=USD`;
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
}
