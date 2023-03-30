import Notiflix from 'notiflix';
import featchImages from './java_script/featcher';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './java_script/news-service';

const form = document.querySelector('#search-form');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
loadMore.style.display = 'none';

const lightbox = new SimpleLightbox(".gallery a", {'captionsData': 'alt', 'captionDelay': 250});
const newsApiService = new NewsApiService;

let per_page = 40;
let page = 0;


function mainEventInProject(event) {
    event.preventDefault()
    newsApiService.query = input.value;
    loadMore.style.display = 'none';
    gallery.innerHTML = '';
    page = 1;
    featchImages(newsApiService.query, page, per_page).then(name => {
        let totalPages = name.totalHits / per_page;
        if (name.hits.length > 0) {
            createMarkup(name);
            lightbox.refresh();
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

function createMarkup(name) {
    const markup = name.hits.map(hit => { 
        return `
        <div class="photo-card">
            <a href='${hit.largeImageURL}'>
                <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>likes</b>${hit.likes.toLocaleString()}
                </p>
                <p class="info-item">
                    <b>views</b>${hit.views}
                </p>
                <p class="info-item">
                    <b>comments</b>${hit.comments}
                </p>
                <p class="info-item">
                    <b> dowloads </b>${hit.downloads}
                </p>
            </div>
        </div>`
    }).join('');
    gallery.insertAdjacentHTML('beforeend', markup)
};

function addOnePoingPage() {
    page += 1;
    newsApiService.query = input.value;
    featchImages (newsApiService.query, page, per_page).then(name => {
        let totalPages = name.totalHits / per_page;
        createMarkup(name);
        lightbox.refresh();
        if (page >= totalPages) {
            loadMore.style.display = 'none';
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
    })
}

loadMore.addEventListener('click', addOnePoingPage);
form.addEventListener('submit', mainEventInProject);
