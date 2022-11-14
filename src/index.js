import axios from "axios";
//import Notiflix from 'notiflix';
//let debounce = require('lodash.debounce'); 

//axios.get('/users')
 // .then(res => {
 //   console.log(res.data);
 // });
 const formEl = document.querySelector('.search-form');   
//const inputEl = document.querySelector('input[type=text]');
//const btnEl = document.querySelector('button[type="submit"]');

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
   
    axios.get('https://pixabay.com/api/?key=12869198-d37a15061ea84e81a1308e6dd&q=yellow+flowers&image_type=photo&pretty=true').then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
    a = 0;
    console.log('hgjhg');
});