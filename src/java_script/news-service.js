export default class NewsApiService {
    constructor() {
        this.name = '';
        this.page = 1;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.name;
    }

    set query(newQuery) {
        this.name = newQuery;
    }
}