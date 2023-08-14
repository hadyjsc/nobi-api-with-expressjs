const { default: axios } = require("axios")
const cheerio = require("cheerio");
const fs = require("fs");

/**
 * http://localhost:3000/api/v1/crawl/baby-name?knownFrom=false&gender=Perempuan
 * 
 * knowFrom = true | false
 * gender = Perempuan | Laki-laki
 */
class CrawlController {
    static async index(req, res) {
        const { knownFrom, gender } = req.query

        if (knownFrom == "0") {
            console.log("Kesini");
            let result = await CrawlController.justByGender(gender)
            res.send(result)
        } else {
            let totalUrl = 124
            let male = []
            let female = []
            for (let i = 0; i < totalUrl; i++) {
                let url = ""
                if( i == 0) {
                    url = "https://cekartinama.com/asal-bahasa/jepang.html"
                } else {
                    url = "https://cekartinama.com/asal-bahasa/Jepang-page-"+i+".html"
                }
    
                const { data } = await axios.get(url);
        
                const $ = cheerio.load(data);
                const listItems = $("table.elements_table tbody tr");
        
                listItems.each((idx, el) => {
                    const tds = $(el).find("td");
                    if ($(tds[3]).text()=="Jepang") {
                        let gender = $(tds[2]).text()
                        if(gender == "Perempuan") {
                            female.push(
                                {
                                    id: $(tds[0]).text(),
                                    name: $(tds[1]).text(),
                                    detail: $(tds[4]).text()
                                }
                            )
                        } else {
                            male.push({
                                id: $(tds[0]).text(),
                                name: $(tds[1]).text(),
                                detail: $(tds[4]).text()
                            })
                        }
                    }
                })
            }
    
            res.send(male)
        }
    }

    static async justByGender(gender) {
        const totalPage = 1208
        let result = []
        for (let i = 0; i < totalPage; i++) {
            let url = ""
            if( i == 0) {
                url = "https://cekartinama.com/cari-arti-nama-perempuan.html/"
            } else {
                url = "https://cekartinama.com/cari-arti-nama-perempuan-page-"+i+".html"
            }

            const { data } = await axios.get(url);
    
            const $ = cheerio.load(data);
            const listItems = $("table.elements_table tbody tr");
            
            listItems.each((idx, el) => {
                const tds = $(el).find("td");
                if ($(tds[2]).text() === gender) {
                    result.push(
                        {
                            id: $(tds[0]).text(),
                            name: $(tds[1]).text(),
                            gender: $(tds[2]).text(),
                            from: $(tds[3]).text(),
                            detail: $(tds[4]).text(),
                        }
                    )
                }
            })
        }
        return result
    }
}

module.exports = CrawlController