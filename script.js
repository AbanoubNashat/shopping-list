const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemsList = document.querySelector('#item-list');


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
const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark')
  button.appendChild(icon);
  return button;
}

// create icon button
const createIcon = (classes) => {
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
  // to clear and focus on input again.
  itemInput.value = '';
  itemInput.focus();
}


// even listener on form submit;
itemForm.addEventListener('submit', addItem);
