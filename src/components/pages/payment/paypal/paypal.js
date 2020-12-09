import React, { Component } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import fire from '../../../firebase';

class Paypal extends Component {

  createOrder(data, actions) {
      return actions.order.create('https://api-m.sandbox.paypal.com/v2/checkout/orders',{
        purchase_units: data ,
      });
    }
  
    onApprove(data, actions) {
      return actions.order.capture();
    }
    
    onError(err) {
      console.log(err);
    }

    getCurrentDate(){
      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      return month+"/"+date+"/"+year;
    }

    async saveTransaction(details,data){
      this.props.loadingState();            
      this.props.emptyCartState();
      await fire.database().ref("orders/"+data.orderID+"").set({
        id: data.orderID,
        userId: this.props.user.id,
        orderDate: this.getCurrentDate(),
        email: this.props.user.email,
        name: this.props.user.firstName+" "+this.props.user.lastName,
        payment: {
          paymentType: "PayPal",
          payerId: data.payerID,
          amountPaid: details.purchase_units[0].amount
        },
        shipping:{
          address: this.props.user.address
        }
      });
    }

    render() {
      return (
        <PayPalButton
          amount={(Number(this.props.totalSum) / 48).toFixed(2)}
          onSuccess={(details, data) => this.saveTransaction(details,data)}

          options={{
            clientId: "AcRHPKjmVr5fIparsoy4v1SbiXqPyFi3G7w_AUAE__rxCkiDfcKwRomuUEt0RG9amJ5Y8QmbceQil1rD"
          }}
        />
      );
    }
}

export default Paypal;
