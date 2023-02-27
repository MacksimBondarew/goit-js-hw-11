import axios from "axios";

export default async function featchImages(name, page, perPage) {
    const library = 'https://pixabay.com/api/';
    const key = '33933963-4f485d9798c483eb0ad8732f3';
    try {
        const response = await axios.get(`${library}?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
        return response.data;
    } catch (error) {
        console.log("YOU TAKE ERROR " + error);
    }
}