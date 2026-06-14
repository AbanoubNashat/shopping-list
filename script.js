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


// add item function
const addItem = (e) => {
  e.preventDefault();
  const item = itemInput.value.trim();
  if (!item) {
    alert('Please Add Valid Item');
    itemInput.value = '';
    return;
  }

  const li = createLi(itemInput.value);
  itemsList.appendChild(li);
  checkUI()
  // to clear and focus on input again.
  itemInput.value = '';
  itemInput.focus();
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

// event listener on form submit;
itemForm.addEventListener('submit', addItem);
// event listener to delete an item using event delegation.
itemsList.addEventListener('click', removeItem);
// event listener to clear all items
clearBtn.addEventListener('click', removeItems);
// event listener to filter items
filterItem.addEventListener('input', itemFilter);

// to run after the page loads at the first time.
checkUI();
