import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import ChatRoom from './components/pages/ChatRoom';
import ProductDetail from './components/pages/ProductDetail';
import Notification from './components/pages/Notification';
import "./App.css";

import { App, Views, View, Page, Navbar, Toolbar, Link } from 'framework7-react';
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";

const f7params = {
  // Array with app routes
  theme: 'ios',
  routes: [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/chatroom',
        component: ChatRoom,
    },
    {
        path: '/product/:productID',
        component: ProductDetail,
        options: {
          transition: 'f7-circle',
        },
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/notification',
        component: Notification,
    }
  ],
  // App Name
  name: '2Gaijin App',
  // App id
  id: 'com.2gaijin.app',
  // ...
};

export default () => (
  <App params={f7params}>
    <View main url="/" />
  </App>
)