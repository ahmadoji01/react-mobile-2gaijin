import React, { Component } from 'react';
import { Page, Button, Navbar, NavRight } from "framework7-react";
import SomethingWrongIllustration from "../../illustrations/SomethingWrongIllustration.png";
import UnauthorizedIllustration from "../../illustrations/UnauthorizedIllustration.png";

class Error extends Component {

   render() {
      if(typeof(this.props.type) !== "undefined") {
         var type = this.props.type;
         var loginRedirect = this.props.redirectTo;
         if(type == "Unauthorized") {
            return (
               <Page>
                  <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                        <div>
                           <div style={{display: 'table', margin: '0 auto'}}><img style={{ maxWidth: 300 }} src={UnauthorizedIllustration} /></div>
                           <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>Email has been Confirmed!</b></h3></div>
                           <div className="appointment-sent-text">
                              You have to be signed in to do this action
                           </div>
                        </div>
                  </div>
                  <div style={{height: '10%', width: '100%', padding: 5}}>
                        <Button href={`/sign-in/${loginRedirect}`} className="general-btn" style={{color: '#fff'}} raised fill round>Sign in here</Button>
                  </div>
               </Page>
            );
         } else {
            return (
               <Page>
                  <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                        <div>
                           <div style={{display: 'table', margin: '0 auto'}}><img style={{ maxWidth: 300 }} src={UnauthorizedIllustration} /></div>
                           <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>Oops... Something went wrong</b></h3></div>
                           <div className="appointment-sent-text">
                              Don't worry. It was from us. You can try this action again...
                           </div>
                        </div>
                  </div>
                  <div style={{height: '10%', width: '100%', padding: 5}}>
                        <Button href="/" className="general-btn" style={{color: '#fff'}} raised fill round>Back to Home</Button>
                  </div>
               </Page>
            );
         }
      }
   }

}
 
export default Error;