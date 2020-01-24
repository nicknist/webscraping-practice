const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');

nightmare
  .goto('https://www.amazon.com/')
  .type('#twotabsearchtextbox', 'cowboy wisdom by David Stevenson University of St Andrews')
  .click('input[class*="nav-input"]')
  .wait('span[class*="a-size-medium"]')
  .click('span[class*="a-size-medium"]')
  .wait('span[class*="tmm-olp-links"]')
  .evaluate(() => {
    let prices = document.querySelector('span[class*="olp-used"]').innerText;
    prices += document.querySelector('span[class*="olp-new"]').innerText;
    return prices;
  })
  .end()
  .then(result => {
    fs.writeFileSync('output.json', JSON.stringify(result))
    console.log('DONE!')
  })
  .catch(error => console.error('Search failed: ', error))
