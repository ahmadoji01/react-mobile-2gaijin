import React, { Component } from "react";
import { Page, List, ListItem, BlockTitle, Icon, Navbar, NavLeft, Link, NavTitle } from "framework7-react";
import "./Payment.scss";

class Payment extends Component {

    render() {
        return (
            <Page>
                <Navbar>
                <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Pay With</NavTitle>
                </Navbar>
                <BlockTitle>Choose your payment method</BlockTitle>
                <List>
                    <ListItem link="#" title="Credit Card" footer="Pay with your own credit card">
                        <Icon slot="media" icon="demo-list-icon"></Icon>
                    </ListItem>
                    <ListItem link="#" title="WeChat Pay" footer="Use your WeChat account for payment">
                        <Icon slot="media" icon="demo-list-icon"></Icon>
                    </ListItem>
                </List>
            </Page>
        );
    }

}

export default Payment;