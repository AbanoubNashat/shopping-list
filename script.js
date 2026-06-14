const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemsList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filterItem = document.querySelector('#filter');

// create the list item
const createLi = (itemText) => {
  const li = document.createElement('li');
  const text = document.createTextNode(itemText);
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(text);
  li.appendChild(button);
  return li;
}

// create the button itself
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark')
  button.appendChild(icon);
  return button;
}

// create icon button
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// displaying items from localstorage on page loading.
function displayItems() {
  const itemsFromStorage = getItemsFromLocalStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
}
// add item function
const addItemOnSubmit = (e) => {
  e.preventDefault();
  const itemName = itemInput.value.trim();
  if (!itemName) {
    alert('Please Add Valid Item');
    itemInput.value = '';
    return;
  }

  // adding item to dom first
  addItemToDom(itemName);
  // adding item to local
  addItemToLocalStorage(itemName);


  checkUI();
  // to clear and focus on input again.
  itemInput.value = '';
  itemInput.focus();
}

// add item to dom
function addItemToDom(itemName) {
  const li = createLi(itemName);
  itemsList.appendChild(li);
}

// getting items form localStorage this helper method checked for items if the parse method returned null we return the empty array if it returned data we return that array.
function getItemsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('items')) || [];
}


// add item to local storage to fetch it again on reload
function addItemToLocalStorage(itemName) {
  const itemsInLocalStorage = getItemsFromLocalStorage();

  itemsInLocalStorage.push(itemName);
  // local storage stores data in key value pairs so watch out for the keys when adding
  localStorage.setItem('items', JSON.stringify(itemsInLocalStorage));
}

// remove one item.
const removeItem = (e) => {
  // this what chat told me to follow as a common pattern as it will always targets the button right
  const button = e.target.closest('.remove-item');

  if (button) {
    if (confirm('Are You Sure ?')) {
      button.parentElement.remove();
    }
  }
  checkUI();
  // this solution of we added a span as a parent for the i element here the code breaks.
  // if (e.target.parentElement.classList.contains('remove-item')) {
  //   e.target.parentElement.parentElement.remove();
  // }
}

// remove all items
const removeItems = (e) => {
  // this what chatgpt asked me to do as it's more modern and less code to have
  if (confirm('Are You Sure ?')) {
    itemsList.replaceChildren();
  }
  checkUI();

  //perfectly fine to use it but more lines to do
  // while (itemsList.firstChild) {
  //   itemsList.firstChild.remove();
  // }
}

// adding filter function
function itemFilter(e) {
  const items = itemsList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach(item => {
    // the best practice is to put the text into a span then querying about it instead of relying on textNodes positions.
    const itemName = item.textContent.toLowerCase();
    // if (itemName.includes(text)) {
    //   item.style.display = 'flex';
    // }
    // else {
    //   item.style.display = 'none';
    // }
    //----------------
    // shorter version.
    const isMatched = itemName.includes(text);
    item.style.display = isMatched ? 'flex' : 'none';
  });
}

// checking the UI State to hide filter and clear button if the list is empty
function checkUI() {
  // we need to check every time we run the method if there is any lis to validate not in the global scope at all.
  const items = itemsList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    filterItem.style.display = 'none';
  }
  else {
    clearBtn.style.display = 'block';
    filterItem.style.display = 'block';
  }
}

function init() {
  // event listener on form submit;
  itemForm.addEventListener('submit', addItemOnSubmit);
  // event listener to delete an item using event delegation.
  itemsList.addEventListener('click', removeItem);
  // event listener to clear all items
  clearBtn.addEventListener('click', removeItems);
  // event listener to filter items
  filterItem.addEventListener('input', itemFilter);
  // event listener to load items on page loading
  document.addEventListener('DOMContentLoaded', displayItems);

  // to run after the page loads at the first time.
  checkUI();
}

init();


