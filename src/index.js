import Notiflix from 'notiflix';
import { featchImages } from './featcher';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'

const form = document.querySelector('#search-form');
const input = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

loadMore.style.display = 'none';

let per_page = 20;
let page = 0;
let name = input.value;

function mainEventInProject(event) {
    event.preventDefault()
    loadMore.style.display = 'none';
    gallery.innerHTML = '';
    name = input.value;
    page = 1;
    featchImages(name, page, per_page).then(name => {
        let totalPages = name.totalHits / per_page;
        
        if (name.hits.lenght > 0) {
            createMarkup(name);
            new SimpleLightbox(".gallery a");
            Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);
            if (page < totalPages) {
                loadMore.style.display = 'block';
            } else {
                loadMore.style.display = 'none';
                Notiflix.Notify.info(
                "We're sorry, but you've reached the end of search results."
                );
            }
        } else {
                gallery.innerHTML = '';
                Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        }  
    }).catch(error => console.log('ERROR: ' + error));
}

form.addEventListener('submit', mainEventInProject);

//function create markup img

function createMarkup(name) {
    const markup = name.hits.map(hit => { 
        return `<div class="photo-card">
            <a href='${hit.largeImageURL}'>
                <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>likes</b>${hit.likes}
                </p>
                <p class="info-item">
                    <b>views</b>${hit.views}
                </p>
                <p class="info-item">
                    <b>comments</b>${hit.comments}
                </p>
                <p class="info-item">
                    <b> dowloands </b>${hit.dowloands}
                </p>
            </div>
        </div>`
    }).join('');
    gallery.insertAdjacentElement('beforeend', markup);
};


