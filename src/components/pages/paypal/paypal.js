import React, { Component } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import fire from '../../firebase';

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


    render() {
      return (
        <PayPalButton
          amount={(Number(this.props.totalSum) / 48).toFixed(2)}
          onSuccess={(details, data) => {
            // alert("Completed"+details.payer.name.given_name);
            // console.log(details);
            this.props.loadingState();            
            this.props.emptyCartState();
            fire.database().ref("orders/"+data.orderID+"").set({
              id: data.orderID,
              userId: this.props.user.uid,
              orderDate: this.getCurrentDate(),
              email: this.props.user.email,
              name: this.props.user.displayName,
              payment: {
                paymentType: "PayPal",
                payerId: data.payerID,
                amountPaid: details.purchase_units[0].amount
              },
              shipping:{
                address: details.purchase_units[0].shipping.address.address_line_1+" "+details.purchase_units[0].shipping.address.admin_area_1+" "+details.purchase_units[0].shipping.address.admin_area_2+", "+details.purchase_units[0].shipping.address.country_code+", "+details.purchase_units[0].shipping.address.postal_code
              }
            });
          }}

          options={{
            clientId: "AcRHPKjmVr5fIparsoy4v1SbiXqPyFi3G7w_AUAE__rxCkiDfcKwRomuUEt0RG9amJ5Y8QmbceQil1rD"
          }}
        />
      );
    }
}

export default Paypal;
