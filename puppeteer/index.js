const puppeteer = require('puppeteer')

class puppteer {

  setHtml = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.green4t.com/')
    const html = await page.$eval('.lista-press', (el) => el.innerHTML);
    await browser.close()
    return html;
  }

}

module.exports = new puppteer();


