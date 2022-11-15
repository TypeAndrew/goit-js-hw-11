import axios from "axios";
import Notiflix from 'notiflix';
//let debounce = require('lodash.debounce'); 

//axios.get('/users')
 // .then(res => {
 //   console.log(res.data);
 // });
const formEl = document.querySelector('.search-form');  
const galleryEl = document.createElement('div');
galleryEl.classList.add('gallery'); 
//const inputEl = document.querySelector('input[type=text]');
//const btnEl = document.querySelector('button[type="submit"]');

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
   
    axios.get('https://pixabay.com/api/?key=12869198-d37a15061ea84e81a1308e6dd&q=yellow+flowers&image_type=photo&pretty=true').then((response)=> {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    if (response.data.hits.length = 0) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');

    } else {
      let markup = "";
      response.data.hits.map(() => {

      
      markup += `<div class="photo-card">
              <img src="" alt="" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                </p>
                <p class="info-item">
                  <b>Views</b>
                </p>
                <p class="info-item">
                  <b>Comments</b>
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                </p>
              </div>
            </div>`;
       }) 
      galleryEl.innerHTML = '';
      galleryEl.insertAdjacentHTML("afterend", markup);
      

    }  
    }).catch((error) => {
      console(error);
     });
    a = 0;
    console.log('hgjhg');
});