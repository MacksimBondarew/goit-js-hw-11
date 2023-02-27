export default class NewsApiService {
    constructor() {
        this.name = '';
        this.page = 1;
    }

    get query() {
        return this.name;
    }

    set query(newQuery) {
        this.name = newQuery;
    }
}