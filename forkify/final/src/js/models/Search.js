import axios from 'axios';                 //importing a package
import { key, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {                    //handling the promises using the async & await function
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);   //adding API url inside the axios package
            this.result = res.data.recipes;                                                       
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}
