import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import ChatLobby from './components/pages/ChatLobby';
import ProductDetail from './components/pages/ProductDetail';
import Notification from './components/pages/Notification';
import SearchHistory from './components/pages/SearchHistory';
import "./App.css";

import { App, Views, View, Page, Navbar, Toolbar, Link } from 'framework7-react';
import SignIn from "./components/pages/SignIn/SignIn";
import Register from "./components/pages/Register/Register";
import Search from "./components/pages/Search/Search";
import MakeAppointment from "./components/pages/MakeAppointment/MakeAppointment";

import CategorySelect from "./components/pages/CategorySelect/CategorySelect";
import CategoryListSelect from "./components/pages/CategoryListSelect/CategoryListSelect";
import AddProductPage1 from "./components/pages/AddProduct/AddProductPage1";
import AddProductPage2 from "./components/pages/AddProduct/AddProductPage2";
import AddProductPage3 from "./components/pages/AddProduct/AddProductPage3";
import ReviewProduct from "./components/pages/AddProduct/ReviewProduct";

import EditCategorySelect from "./components/pages/EditProduct/EditCategorySelect";
import EditCategoryListSelect from "./components/pages/EditProduct/EditCategoryListSelect";
import EditProductPage1 from "./components/pages/EditProduct/EditProductPage1";
import EditProductPage2 from "./components/pages/EditProduct/EditProductPage2";
import ReviewEditProduct from "./components/pages/EditProduct/ReviewEditProduct";

import Appointment from "./components/pages/Appointment/Appointment";
import Account from "./components/pages/Account/Account";
import Collections from "./components/pages/Account/Collections";
import ChattingRoom from './components/pages/ChattingRoom/ChattingRoom';
import ProfileForVisitor from "./components/pages/ProfileForVisitor/ProfileForVisitor";
import EmailConfirmation from "./components/pages/EmailConfirmation/EmailConfirmation";
import PhoneConfirmation from "./components/pages/PhoneConfirmation/PhoneConfirmation";
import Error from "./components/pages/Error/Error";
import Payment from "./components/pages/Payment";

import AuthService from "./services/auth.service.js";
import axios from "axios";
import SignUp from "./components/pages/SignUp/SignUp";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import UpdatePassword from "./components/pages/UpdatePassword/UpdatePassword";
import MakeAppointmentWithDelivery from "./components/pages/MakeAppointmentWithDelivery/MakeAppointmentWithDelivery";
import {isMobile} from "react-device-detect";

const f7params = {
  // Array with app routes
  theme: 'ios',
  routes: [
    {
      path: '/',
      component: Home,
      master: true,
    },
    {
      path: '/search/:searchTerm/:category?',
      component: Search,
      options: {
        reloadCurrent: true,
      },
    },
    {
      path: '/chatlobby',
      component: ChatLobby,
      options: {
        reloadCurrent: true,
      },
    },
    {
      path: '/chatroom/:roomID',
      component: ChattingRoom,
      options: {
        reloadCurrent: true,
      },
    },
    {
      path: '/product/:productID',
      component: ProductDetail,
      options: {
        transition: 'f7-circle',
      },
    },
    {
      path: '/sign-in/:redirectTo?',
      component: SignIn,
    },
    {
      path: '/sign-up/:redirectTo?',
      component: SignUp,
    },
    {
      path: '/reset-password',
      component: ResetPassword,
    },
    {
      path: '/update-password/:email/:resetToken',
      component: UpdatePassword,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/notification',
      component: Notification,
      options: {
        reloadAll: true,
      },
    },
    {
      path: '/search_history',
      component: SearchHistory,
      options: {
        reloadAll: true,
      },
    },
    {
      path: '/appointment/:productID/:withDelivery',
      component: MakeAppointment,
    },
    {
      path: '/appointment-with-delivery/:productID',
      component: MakeAppointmentWithDelivery,
    },
    {
      path: '/category-select',
      component: CategorySelect,
      options: {
        reloadAll: true,
      },
    },
    {
      path: '/category-list-select/:category',
      component: CategoryListSelect,
    },
    {
      path: '/add-product-1',
      component: AddProductPage1,
    },
    {
      path: '/add-product-2',
      component: AddProductPage2,
    },
    {
      path: '/add-product-3',
      component: AddProductPage3,
    },
    {
      path: '/review-product',
      component: ReviewProduct,
    },
    {
      path: '/edit-category-select',
      component: EditCategorySelect,
    },
    {
      path: '/edit-category-list-select/:category',
      component: EditCategoryListSelect,
    },
    {
      path: '/edit-product-1',
      component: EditProductPage1,
    },
    {
      path: '/edit-product-2',
      component: EditProductPage2,
    },
    {
      path: '/review-edit-product',
      component: ReviewEditProduct,
    },
    {
      path: '/see-appointment',
      component: Appointment,
      options: {
        //reloadAll: true,
      },
    },
    {
      path: '/account',
      component: Account,
      options: {
        //reloadAll: true,
      },
    },
    {
      path: '/profile/:userID',
      component: ProfileForVisitor,
    },
    {
      path: '/collections',
      component: Collections,
    },
    {
      path: '/payment/:months',
      component: Payment,
    },
    {
      path: '/confirm_email/:email/:token',
      component: EmailConfirmation,
    },
    {
      path: '/confirm_phone/:phone/:token',
      component: PhoneConfirmation,
    },
    {
      path: '/error/:type/:redirectTo?',
      component: Error,
    }
  ],
  on: {
    // each object key means same name event handler
    pageInit: function (page) {
      if(!isMobile) {
        window.location.href = "https://webbeta06012020.2gaijin.com"
      }
    }
  },
  // App Name
  name: '2Gaijin App',
  // App id
  id: 'com.2gaijin.app',
  // ...
};

export default () => (
  <App params={f7params}>
    <View main url="/" iosDynamicNavbar={false} pushState={true} pushStateSeparator='#!' />
  </App>
)