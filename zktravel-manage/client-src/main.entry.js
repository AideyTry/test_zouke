import '@local/babel-helper';
import 'babel-polyfill'
import Vue from 'vue';
import router from './routes';
import App from './zkApp';
import store from './stores';
import 'bootstrap/dist/css/bootstrap.css';
// import './common/base.css';
const AppComponent = Vue.extend(App);
console.log(store);
const app = new AppComponent({
    el: '#app',
    router,
    store
})
