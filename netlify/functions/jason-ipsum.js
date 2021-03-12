const url = require('url');


// Our basic ipsum
const organicStock = require('../../lib/ipsum.json');

// Some Lengstorfian flourishes
const seasoning = require('../../lib/jason.json');


// Carefully identify the perfect item. 
// Not just blindly at random like we would at CostCo.
const handPick = (options) => {
  return Math.floor(Math.random() * Math.floor(options.length));
}

// Get something locally sourced and delicious from what is available
const visitFarmersMarket = (stall) => {
  let item = handPick(stall);
  return stall[item];
}


exports.handler = async (event, context) => {

  // support params in querystring or path
  let quantity;  
  if(event.queryStringParameters.quantity) {
    quantity =  event.queryStringParameters.quantity;
  } 
  else {
    quantity = event.path.split("ipsum/")[1];
  }  
  
  // always return something
  if(!quantity) {
    quantity = 1;
  }
  
  // Each visit to the market will get us 100 items.
  // And we'll be visiting 10 times more often than you'd expect :)
  const visitsToTheMarket = quantity * 10;

  let jasonIpsum = [];
  for (let visit = 0; visit < visitsToTheMarket; visit++) {
    
    // Get some seasonal organic stock as a base for our dish
    let stock = visitFarmersMarket(organicStock).split(" ");
    
    // Garnish it with some delicious Lengstorfian items
    for (let item = 0; item < 40; item++) {
      // choose a word at random form our stock
      // and replace it with some random seasoning
      let season = visitFarmersMarket(seasoning);
      stock.splice(handPick(stock), 1, season);
    }
    jasonIpsum.push(stock.join(" "));
  }

  const words = jasonIpsum.join('\n\n');
  return {
    statusCode: 200,
    body: JSON.stringify({
      'words': words.split(" ").length,
      'ipsum': words
    }) 
  };

}
