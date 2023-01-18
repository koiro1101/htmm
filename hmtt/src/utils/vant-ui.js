import {
  Button,
  Icon,
  Tabbar,
  TabbarItem,
  NavBar,
  Field,
  Form,
  Toast
} from 'vant'
import Vue from 'vue'
const arr = [Button, Icon, Tabbar, TabbarItem, NavBar, Field, Form, Toast]
arr.forEach((x) => Vue.use(x))
