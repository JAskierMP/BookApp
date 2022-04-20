let bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
console.log(bookTemplate);
const listaKsiazek = document.getElementsByClassName('books-list');
console.log(listaKsiazek);
const booksListElement = listaKsiazek.item(0);

function render() {
  for (let book of dataSource.books) {
    const generatedHTML = bookTemplate(book);
    const DOMElement = utils.createDOMFromHTML(generatedHTML);
    booksListElement.appendChild(DOMElement);
  }
}

render();

////////////////////////////////

const favoriteBooks = [];
const initActions = function () {
  // const listaOkładek = document.getElementsByClassName('book__image');
  //const listaOkładekTablica = Array.from(listaOkładek);
  //console.log(listaOkładekTablica);

  const booksList = document.querySelector('.books-list');
  console.log(booksList);
  //for (let okładka of listaOkładekTablica) {
  booksList.addEventListener('dblclick', function (event) {
    event.preventDefault();
    //const clickedElement = okładka;
    const clickedElement = event.target;
    const clickedElementParent = clickedElement.offsetParent;
    console.log(clickedElementParent);

    if (clickedElementParent.classList.contains('book__image')) {
      console.log(clickedElementParent);
      const dataID = clickedElementParent.getAttribute('data-id');
      console.log(dataID);

      if (!favoriteBooks.includes(dataID)) {
        favoriteBooks.push(dataID);
        clickedElement.classList.add('favorite');
      } else {
        clickedElementParent.remove('favorite');
        const index = favoriteBooks.indexOf(dataID);
        console.log('index of removed element', index);
        favoriteBooks.splice(index, 1);
        console.log(clickedElement);
      }
      console.log(favoriteBooks);
    }
  });
  // }
};


initActions();