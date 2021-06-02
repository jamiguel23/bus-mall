'use strict';

console.log('Hello');

let allItems = [];
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let clicks = 0;
let clicksAllowed = 25;

let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');

let renderListArray = [];


function Item(name, fileExtenstion = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtenstion}`;
  this.clicks = 0;
  this.views = 0;
  allItems.push(this);
}

new Item('bag');
new Item('banana');
new Item('bathroom');
new Item('boots');
new Item('breakfast');
new Item('bubblegum');
new Item('chair');
new Item('cthulhu');
new Item('dog-duck');
new Item('dragon');
new Item('pen');
new Item('pet-sweep');
new Item('scissors');
new Item('shark');
new Item('sweep', 'png');
new Item('tauntaun');
new Item('unicorn');
new Item('water-can');
new Item('wine-glass');


// imageThree.src = allItems[0].src;
// imageTwo.src = allItems[1].src;
// imageOne.src = allItems[2].src;
// allItems[0].views++;

function selectRandomItemIndex() {
  return Math.floor(Math.random() * allItems.length);
}

function renderRandomItems() {
  while(renderListArray.length<3) {
    let uniqueProduct = selectRandomItemIndex();
    while(!renderListArray.includes(uniqueProduct)){
      renderListArray.push(uniqueProduct);
    }
  }

  let itemOne = renderListArray.pop();
  let itemTwo = renderListArray.pop();
  let itemThree = renderListArray.pop();
  // while (itemOne === itemTwo || itemThree === itemTwo)
  //   itemTwo = selectRandomItemIndex();
  // while (itemThree === itemOne || itemTwo === itemOne)
  //   itemOne = selectRandomItemIndex();
  // while (itemTwo === itemThree || itemOne === itemThree)
  //   itemThree = selectRandomItemIndex();

  imageOne.src = allItems[itemOne].src;
  imageOne.alt = allItems[itemOne].name;
  allItems[itemOne].views++;

  imageTwo.src = allItems[itemTwo].src;
  imageTwo.alt = allItems[itemTwo].name;
  allItems[itemTwo].views++;


  imageThree.src = allItems[itemThree].src;
  imageThree.alt = allItems[itemThree].name;
  allItems[itemThree].views++;



}

renderRandomItems();

function handleItemClick(event) {
  if (event.target === myContainer) {
    alert('Click on one of the images');
  }

  clicks++;
  let clickedItem = event.target.alt;
  for (let i = 0; i < allItems.length; i++) {
    if (clickedItem === allItems[i].name) {
      allItems[i].clicks++;
    }
  }
  renderRandomItems();

  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleItemClick);
  }
}

function renderResult() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < allItems.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allItems[i].name} had ${allItems[i].views} views and was clicked ${allItems[i].clicks} times`;
    ul.appendChild(li);


  }
}


function handleButtonClick(event) {
  if (clicks === clicksAllowed) {
    renderResult();
  }

  myButton.removeEventListener('click', handleButtonClick );
}


myContainer.addEventListener('click', handleItemClick);
myButton.addEventListener('click', handleButtonClick);
