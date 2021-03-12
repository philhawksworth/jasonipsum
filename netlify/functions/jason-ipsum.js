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
  // Each visit to the market will get us 100 items.
  let visitsToTheMarket;  
  if(event.queryStringParameters.quantity) {
    visitsToTheMarket =  event.queryStringParameters.quantity;
  } 
  else {
    visitsToTheMarket = event.path.split("ipsum/")[1];
  }  

  // always return something
  if(!visitsToTheMarket) {
    visitsToTheMarket = 1;
  }
  
  let jasonIpsum = [];
  for (let visit = 0; visit < visitsToTheMarket; visit++) {
    
    // Get some seasonal organic stock as a base for our dish
    let stock = visitFarmersMarket(organicStock).split(" ");
    
    // Garnish it with some delicious Lengstorfian items
    for (let item = 0; item < 40; item++) {
      // choose a place at random form our stock
      // and enhance it with some random seasoning
      let season = visitFarmersMarket(seasoning);
      stock.splice(handPick(stock), 0, season);
    }
    jasonIpsum.push(stock.join(" "));
  }

  const words = jasonIpsum.join('\n\n');

  return {
    statusCode: 200,
    body: JSON.stringify({
      'words': words.length,
      'ipsum': words
    }) 
  };

}
