import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import ChatRoom from './components/pages/ChatRoom';
import ChatLobby from './components/pages/ChatLobby';
import ProductDetail from './components/pages/ProductDetail';
import Notification from './components/pages/Notification';
import SearchHistory from './components/pages/SearchHistory';
import "./App.css";

import { App, Views, View, Page, Navbar, Toolbar, Link } from 'framework7-react';
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Search from "./components/pages/Search/Search";
import MakeAppointment from "./components/pages/MakeAppointment/MakeAppointment";

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import CategorySelect from "./components/pages/CategorySelect/CategorySelect";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import Appointment from "./components/pages/Appointment/Appointment";

const f7params = {
  // Array with app routes
  theme: 'ios',
  routes: [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/search/:searchTerm',
        component: Search,
    },
    {
      path: '/chatlobby',
      component: ChatLobby,
    },
    {
        path: '/chatroom/:roomID',
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
    },
    {
        path: '/search_history',
        component: SearchHistory,
    },
    {
        path: '/appointment/:productID/:withDelivery',
        component: MakeAppointment,
    },
    {
        path: '/category-select',
        component: CategorySelect,
    },
    {
        path: '/add-product/:category',
        component: AddProduct,
    },
    {
        path: '/see-appointment',
        component: Appointment,
    },
  ],
  // App Name
  name: '2Gaijin App',
  // App id
  id: 'com.2gaijin.app',
  // ...
};

const initialState = {
  isRefreshing: false,
  selectedCategory: "",
}
function reducer(state = initialState, action) {
  switch(action.type) {
    case "SetRefresh":
      return {
        isRefreshing: true
      };
    case "UnsetRefresh":
      return {
        isRefreshing: false
      };
    default:
      return state;
  }
}
const store = createStore(reducer);
export default () => (
  <Provider store={store}>
    <App params={f7params}>
      <View main url="/" />
    </App>
  </Provider>
)