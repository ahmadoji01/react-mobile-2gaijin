import React, { Component } from "react";
import { Page, List, ListItem, BlockTitle, Icon, Navbar, NavLeft, Link, NavTitle } from "framework7-react";
import "./Payment.scss";
import axios from "axios";

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
        this.sendCardPayment = this.sendCardPayment.bind(this);
        this.sendKonbiniPayment = this.sendKonbiniPayment.bind(this);
    }

    componentDidMount() {
        const { OmiseCard, Omise } = window;

        var charge = 100;
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

        return axios.post(`https://go.2gaijin.com/credit_card_payment`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token")
            }
        }).then(response => {
            console.log(response.data);
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
                </List>
            </Page>
        );
    }

}

export default Payment;