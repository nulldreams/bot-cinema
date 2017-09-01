const FILMES = require('../services/cinema')
const rp = require('request-promise')
const cheerio = require('cheerio')
const cfonts = require('cfonts')

const VerificarFilmesHoje = (cb) => {
    var options = {
        method: 'GET',
        encoding: 'utf8',
        uri: `http://vivamaringa.odiario.com/cinema/`,
        transform: (body) => {
            return cheerio.load(body)
        }
    }

    rp(options)
        .then(($) => {
            let filmes = []
            for (let i = 0; i < $('.listarFilmes').length; i++) {
                filmes.push({
                    nome: $('.listarFilmes').eq(i).find('.tituloFilme').eq(0).text().trim(),
                    genero: $('.listarFilmes').eq(i).find('.descricaoFilme').parent().find('p').eq(3).text().trim().replace('Gênero: ', ''),
                    trailer: $('.listarFilmes').eq(i).find('.trailer').find('iframe').eq(0).attr('src'),
                    programacao: $('.listarFilmes').eq(i).find('.programacaoFilme').text().trim().replace(/Av./g, '\nAv.').replace(/\)/g, ')\n').replace(/Diariamente:/g, '\nDiariamente:').replace(/Sábado:/g, '\nSábado:').replace(/Quinta/g, '\nQuinta'),
                    capa: $('.listarFilmes').eq(i).find('.imagemFilme').find('img').eq(0).attr('src') || 'indisponível :c',
                    sinopse: $('.listarFilmes').eq(i).find('.descricaoFilme').parent().find('p').eq(0).text().trim()
                })
            }
            MontarMensagem(filmes, (mensagem) => {

                cb(mensagem)
            })

        })
}

const CapturarUrlIMDB = (filme, cb) => {
    let nome = filme.replace(/ /g, '+')

    var options = {
        method: 'GET',
        encoding: 'binary',
        uri: `https://www.google.com.br/search?q=${nome}+imdb`,
        transform: (body) => {
            return cheerio.load(body)
        }
    }
    rp(options)
        .then(($) => {
            let url = $('.g').eq(0).find('h3').eq(0).find('a').attr('href')
            url = url.substring(url.indexOf('/url?q=') + 7, url.indexOf('/&'))
            cb(null, url)
        })
}

var MontarMensagem = (filmes, cb) => {
    let fields = ''
    FILMES.remove((err, removed) => {
        for (let i = 0; i < filmes.length; i++) {
            if (!err)
                FILMES.add((i + 1), filmes[i], (err, doc) => {})

            fields += `${(i+1).toString().cyan} - ${filmes[i].nome} (${filmes[i].genero})\n`
        }

        cb(fields)
    })

}

const ConsultarResumoFilme = (indice) => {
    return new Promise((resolve, reject) => {
        let fields = ''
        FILMES.get(parseInt(indice), (err, filme) => {
            if (!filme) console.info('Opa, não encontrei esse filme, veja se o número que digitou estava entre os filmes disponíveis no comando `listar` :c')

            fields += `${filme.dados.nome} (${filme.dados.genero})\n\n`

            CapturarUrlIMDB(filme.dados.nome, (err, url) => {

                fields += `Capa` + `: ${filme.dados.capa}\n\n`
                fields += `IMDB` + `: ${url}\n\n`
                fields += `Sinópse` + `: ${filme.dados.sinopse}\n\n`
                fields += `Trailer` + `: ${filme.dados.trailer}\n\n`
                fields += `Programação` + `: ${filme.dados.programacao}\n\n`

                console.info(fields)
            })
        })
    })
}

module.exports = {
    VerificarFilmesHoje,
    ConsultarResumoFilme
}