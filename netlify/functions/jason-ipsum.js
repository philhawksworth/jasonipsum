
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

  
  
  const quantity = event.queryStringParameters.quantity || 2;
  
  console.log(`seasoning.length`, seasoning.length);
  console.log(`quantity`, quantity);

  // Each visit to the market will get us 100 items.
  // And we'll be going more than you expected
  const visitsToTheMarket = quantity * 10;
  
  let jasonIpsum = [];
  for (let visit = 0; visit <= visitsToTheMarket; visit++) {
    
    // Get some seasonal organic stock as a base for our dish
    let stock = visitFarmersMarket(organicStock).split(" ");
    
    // Garnish it with some delicious Lengstorfian items
    for (let item = 0; item <= 40; item++) {
      // choose a word at random form our stock
      // replace it with a random seasoning
      let season = visitFarmersMarket(seasoning);
      stock.splice(handPick(stock), 1, season);
    }
    jasonIpsum.push(stock.join(" "));
  }

  console.log(`jasonIpsum`, jasonIpsum);
  

  return {
    statusCode: 200,
    body: JSON.stringify({
      'words': jasonIpsum.join('\n\n').length,
      'ipsum': jasonIpsum.join('\n\n')
    }) 
  };

}
