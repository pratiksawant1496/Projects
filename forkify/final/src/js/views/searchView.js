import { elements } from './base';

export const getInput = () => elements.searchInput.value;    //named exports     //return keyword is not required here for returning

export const clearInput = () => {
    elements.searchInput.value = '';     //clearing the input fields as soon as results are displayed
};

export const clearResults = () => {         //clearing the previous result
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

/*
// 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato','and']
acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato','and','spinach']
*/
export const limitRecipeTitle = (title, limit = 17) => {    //displaying the title in a single line & if not fits then show dots after one line
    const newTitle = [];
    if (title.length > limit) {        //checking the length of the title
        title.split(' ').reduce((acc, cur) => {      //splitting the string wih space
            if (acc + cur.length <= limit) {
                newTitle.push(cur);       //pushing the news word of string into the new array
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;     //returning the result using join method
    }
    return title;
}

const renderRecipe = recipe => { //here we use template string 
    //handling the DOM elements & printing the results
    const markup = `           
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>       
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li> 
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);   //printing each of the element 
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {      //rendering the buttons dor pagination
    const pages = Math.ceil(numResults / resPerPage);        //calculating the no. of pages
        //ceil is used to round up the result to the next integer
    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {     //displaying the results per page using pagination
    // render results of currente page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);    //slice metohos is used for selecting the parts of an array

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};
