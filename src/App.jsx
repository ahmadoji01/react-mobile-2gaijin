import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import ChatRoom from './components/pages/ChatRoom';
import "./App.css";

import { App, View, Page, Navbar, Toolbar, Link } from 'framework7-react';

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
        path: '/product',
        component: ChatRoom,
    },
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