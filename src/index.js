import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import Notiflix from 'notiflix';
//let debounce = require('lodash.debounce'); 

//axios.get('/users')
 // .then(res => {
 //   console.log(res.data);
 // });
const formEl = document.querySelector('.search-form'); 
const galleryEl = document.querySelector('.gallery'); 
//const galleryEl = document.createElement('div');
//galleryEl.classList.add('gallery');
//document.body.append(galleryEl);
let markup = "";
let counter;
let totalHits = 0;
document.body.insertAdjacentHTML("afterend", `<button type="button" class="load-more">Load more</button>`);
const btnNext = document.querySelector('.load-more');
btnNext.style.opacity = "0";

//const inputEl = document.querySelector('input[type=text]');
//const btnEl = document.querySelector('button[type="submit"]');
let getPixplay = function () {
    axios.get(`https://pixabay.com/api/?key=12869198-d37a15061ea84e81a1308e6dd&page=${counter}&q=${formEl[0].value}&per_page=40&image_type=photo&pretty=true`).then((response)=> {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    if (response.data.hits.length === 0) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');

    } else {
      
      response.data.hits.map((element) => {

      
      markup += `<div class="photo-card">
              <img src="${element.previewURL}"
               alt="${element.tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <bs>Likes ${element.likes}</b>
                </p>
                <p class="info-item">
                  <b>Views ${element.views}</b>
                </p>
                <p class="info-item">
                  <b>Comments ${element.comments}</b>
                </p>
                <p class="info-item">
                  <b>Downloads ${element.downloads}</b>S
                </p>
              </div>
            </div>`;
       }) 
       galleryEl.innerHTML = markup;
      document.querySelector('.load-more').style.opacity = "1";
      totalHits += response.data.length;
      if (totalHits === response.data.totalHits ) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      
      } 
     
      let lightbox = new SimpleLightbox('.photo-card', { /* options */ });
      lightbox.show();
      
      

    }  
    }).catch((error) => {
      console.log(error);
    });
 
  
    //galleryEl.insertAdjacentHTML("afterend", markup);
    //a = 0;
    //console.log('hgjhg');
} 


btnNext.addEventListener("click", () => {
  counter++;
  
  getPixplay();

  console.log("next ok");
  
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  markup = "";
  totalHits = 0;
  counter = 1;
  getPixplay();
   
});

window.addEventListener("scroll", () => {
   const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
});
