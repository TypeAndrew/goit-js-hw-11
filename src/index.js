import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import Notiflix from 'notiflix';

const formEl = document.querySelector('.search-form');
formEl.style.background = "blue"; 
formEl.style.display = "flex";
formEl.style.justifycontent = "center";
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



const createMarckup = function (response) {
  
  response.data.hits.map((element) => {

      
    markup += `<div class="photo-card">
              <img src="${element.previewURL}"
               alt="${element.tags}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes </b>
                  <br>${element.likes}</br>
                </p>
                <p class="info-item">
                  <b>Views </b>
                  <br>${element.views}</br>
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  <br>${element.comments}</br>
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  <br>${element.downloads}</br>
                </p>
              </div>
            </div>`;
  });
  
  return markup;
} 

const fetchData = async () => {
  const response = await axios.get(`https://pixabay.com/api/?key=12869198-d37a15061ea84e81a1308e6dd&page=${counter}&q=${formEl[0].value}&per_page=40&image_type=photo&pretty=true`);
  return response;
}

const  getPixplay = function()  {
    
   fetchData().then((response) => {
    console.log(response.data);
   
    if (response.data.hits.length === 0) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');

    } else {
      
      galleryEl.innerHTML = createMarckup(response);
      document.querySelector('.load-more').style.opacity = "1";
      totalHits += response.data.length;
      
      if (totalHits === response.data.totalHits) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      
      } 
     
      
      
    }  
    }).catch((error) => {
      console.log(error);
    });
    let lightbox = new SimpleLightbox('.gallery', { /* options */ });
      lightbox.show();
      console.log("SIMPLE");
} 

btnNext.addEventListener("click", () => {
  counter++;
  
  getPixplay();

  //console.log("next ok");
  
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  markup = "";
  totalHits = 0;
  counter = 1;
  getPixplay();
   
});

galleryEl.addEventListener("click", (event) => {
    if (event.target.nodeName === "img") {


        let lightbox = new SimpleLightbox('.gallery', { /* options */ });

        lightbox.show();


    } else {
        console.log("border!!!!");
    }

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
