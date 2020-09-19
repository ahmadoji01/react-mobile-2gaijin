import React, { Component } from "react";
import { Page, List, ListItem, BlockTitle, Icon, Navbar, NavLeft, Link, NavTitle } from "framework7-react";
import "./Payment.scss";
import axios from "axios";

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isPaymentSuccessful: true,
        }
        this.sendCardPayment = this.sendCardPayment.bind(this);
        this.sendKonbiniPayment = this.sendKonbiniPayment.bind(this);
    }

    componentWillMount() {
        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
        }

        return axios
        .get(`https://go.2gaijin.com/get_subscription_status`, config)
        .then(response => {
            if(response.data.status == "Success") {
                var isSubscribed = response.data.data.is_subscribed;
                if(isSubscribed) {
                    this.$f7.view.main.router.navigate("/category-select/");
                }
            } else {
                this.setState({ isError: true });
            }
        });
    }

    componentDidMount() {
        const { OmiseCard, Omise } = window;

        var charge = 110;
        var monthsSubscribed = parseInt(this.props.months);
        var total = monthsSubscribed * charge;

        OmiseCard.configure({
            publicKey: "pkey_test_5kg29vvml1oqwpclafj"
        });
        Omise.setPublicKey("pkey_test_5kg29vvml1oqwpclafj");

        var self = this;
        
        var creditCardBtn = document.querySelector("#creditCardBtn");
        creditCardBtn.addEventListener("click", (event) => {
            event.preventDefault();
            OmiseCard.open({
                amount: total,
                currency: "JPY",
                defaultPaymentMethod: "credit_card",
                onCreateTokenSuccess: (nonce) => {
                    if (nonce.startsWith("tokn_")) {
                        self.sendCardPayment(total, nonce, monthsSubscribed);
                    } else {
                        //form.omiseSource.value = nonce;
                    };
                }
            });
        });
    }

    sendCardPayment(amount, tokenString, monthsSubscribed) {
        var payload = {
            "amount": amount,
            "currency": "jpy",
            "token": tokenString,
            "months_subscribed": monthsSubscribed,
        }

        this.setState({ isPaymentSuccessful: true });

        return axios.post(`https://go.2gaijin.com/credit_card_payment`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token")
            }
        }).then(response => {
            if(response.data.status == "Success") {
                this.$f7.view.main.router.navigate("/category-select/");
            } else if(response.data.status == "Error") {
                this.setState({ isPaymentSuccessful: false });
            }
        });
    }

    sendKonbiniPayment(amount, sourceID, monthsSubscribed) {
        var payload = {
            "amount": amount,
            "currency": "jpy",
            "source_id": sourceID,
            "months_subscribed": monthsSubscribed,
        }

        return axios.post(`https://go.2gaijin.com/konbini_payment`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token")
            }
        }).then(response => {
            console.log(response.data);
        });
    }

    render() {
        return (
            <Page>
                <Navbar>
                <NavLeft>
                        <Link href="/"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Pay With</NavTitle>
                </Navbar>
                <BlockTitle>Choose your payment method</BlockTitle>
                <List>
                    <ListItem link="#" id="creditCardBtn" title="Credit Card" footer="Pay with your own credit card">
                        <Icon slot="media" icon="demo-list-icon"></Icon>
                    </ListItem>
                    { !this.state.isPaymentSuccessful && <ListItem id="creditCardBtn" title="Payment Unsuccessful" footer="You can try to pay again. Do not worry, your previous payment attempt is not charged">
                        <Icon slot="media" icon="demo-list-icon"></Icon>
                    </ListItem> }
                </List>
            </Page>
        );
    }

}

export default Payment;