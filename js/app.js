'use strict';


let allItems = [];
let myContainer = document.querySelector('section');
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

let retrievedItems = localStorage.getItem('items');

if (retrievedItems) {
  let parsedItems = JSON.parse(retrievedItems);
  allItems = parsedItems;
} else{

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


}

function selectRandomItemIndex() {
  return Math.floor(Math.random() * allItems.length);
}

function renderRandomItems() {
  while (renderListArray.length < 6) {
    let uniqueProduct = selectRandomItemIndex();
    if (!renderListArray.includes(uniqueProduct)) {
      renderListArray.unshift(uniqueProduct);
    }
  }


  let itemOne = renderListArray.pop();
  let itemTwo = renderListArray.pop();
  let itemThree = renderListArray.pop();

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
    renderChart();
    let stringifiedItems = JSON.stringify(allItems);
    localStorage.setItem('items', stringifiedItems);
  }
}


function renderChart() {

  let itemNames = [];
  let itemViews = [];
  let itemClicks = [];
  for (let i = 0; i < allItems.length; i++) {
    itemNames.push(allItems[i].name);
    itemViews.push(allItems[i].views);
    itemClicks.push(allItems[i].clicks);
  }


  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [{
        label: 'Views',
        data: itemViews,
        backgroundColor: 'rgba(173, 223, 255, 1)',
        borderColor: 'black',
        borderWidth: 1,
      },
      {
        label: 'Clicks',
        data: itemClicks,
        backgroundColor: 'rgba(237, 237, 116, 0.8)',
        borderColor: 'black',
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


}

myContainer.addEventListener('click', handleItemClick);

