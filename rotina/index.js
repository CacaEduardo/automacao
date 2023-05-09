const cheerio = require('cheerio')
const db = require('../db/db');
const puppteer = require('../puppeteer/index')


class rotina {


    start = async () => {

        const html = await puppteer.setHtml();

        const $ = cheerio.load(html) 
        const data = []

        $('div.post-item').each((i, element) => {
            const cheerioElement = $(element)
            const title = cheerioElement.find('.title').text()
            const url = cheerioElement.find('.img').find('a').attr('href')
            const url_img = cheerioElement.find('div.img img').attr('data-src')
            data.push({'title': title, 'url': url, 'url_img': url_img})

        })

        data.map(async (e, i) => {
            try {
                const query = `INSERT INTO teste.teste (title, url, url_img) VALUES('${e.title}', '${e.url}', '${e.url_img}')`
                await db.execute(query)

            }catch{
                console.log(`erro no insert dos dados da linha ${i}`)
            }
        })
        return console.log(`${data.length} adicionados ao banco com sucesso`)
        
    }

}

module.exports = new rotina()