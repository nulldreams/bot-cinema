const rp = require('request-promise')
const cheerio = require('cheerio')
const FILMES = require('../services/cinema_filmes')

const header = {
    name: 'cinema',
    type: ['pvt'],
    description: 'Exibe os filmes em cartaz na cidadede Maringá',
    examples: [
        '!cinema',
        '!cinema <Número do filme listado pelo comando "!cinema">'
    ]
}


var VerificarFilmesHoje = (cb) => {
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
                    programacao: $('.listarFilmes').eq(i).find('.programacaoFilme').text().trim().replace('Av.', '\nAv.'),
                    capa: $('.listarFilmes').eq(i).find('.imagemFilme').find('img').eq(0).attr('src'),
                    sinopse: $('.listarFilmes').eq(i).find('.descricaoFilme').parent().find('p').eq(0).text().trim()
                })
            }
            MontarMensagem(filmes, (mensagem) => {

                cb(mensagem)
            })

        })
}

var CapturarUrlIMDB = (filme, cb) => {
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

var ConsultarResumoFilme = (indice) => {
    return new Promise((resolve, reject) => {
        let fields = []
        FILMES.get(parseInt(indice), (err, filme) => {
            if (!filme) return reject('Opa, não encontrei esse filme, veja se o número que digitou estava entre os filmes disponíveis no comando `!cinema` :thinking_face:')
            fields.push({
                title: `${filme.dados.nome}`,
                value: `${filme.dados.genero}`,
                short: true
            })

            CapturarUrlIMDB(filme.dados.nome, (err, url) => {

                var attachments = [{
                    title: '',
                    fields: fields,
                    image_url: filme.dados.capa
                }, {
                    title: 'IMDB',
                    text: `<${url}>`
                }, {
                    title: 'Sinópse',
                    text: filme.dados.sinopse
                }, {
                    title: 'Trailer',
                    text: `<${filme.dados.trailer}>`
                }, {
                    title: 'Programação',
                    text: filme.dados.programacao
                }]

                resolve(attachments)
            })
        })
    })
}


var MontarMensagem = (filmes, cb) => {
    let fields = []
    FILMES.remove((err, removed) => {
        for (let i = 0; i < filmes.length; i++) {
            if (!err)
                FILMES.add((i + 1), filmes[i], (err, doc) => {})

            fields.push({
                title: `#${(i+1)} ${filmes[i].nome}`,
                value: `${filmes[i].genero}`,
                short: true
            })
        }

        var attachments = [{
            fallback: 'Attachment 1 Fallback',
            author_name: '',
            color: "#69327F",
            title: 'Filmes',
            fields: fields,
            image_url: '',
            footer: `Filmes disponíveis hoje`
        }]

        cb(attachments)
    })

}

function handler(source, chat, input, done) {
    chat.sendMessage(source.channelId, ':movie_camera: Pesquisando...')

    if (input.trim().length === 0) {
        VerificarFilmesHoje((mensagem) => {
            return chat.sendMessage(source.channelId, '', mensagem)
            done()
        })
    } else {

        if (isNaN(input.trim())) {

            return chat.sendMessage(source.channelId, 'A consulta deve ser feita seguindo o padrão `!cinema <Número do filme que foi listado>` :fastparrot:')
            done()
        } else {

            let filmeNum = input.trim().match(/\d+/)[0]
            if (typeof filmeNum !== 'undefined') {
                ConsultarResumoFilme(filmeNum)
                    .then((mensagem) => {
                        chat.sendMessage(source.channelId, '', mensagem)
                        done()
                    })
                    .catch((mensagem) => {
                        chat.sendMessage(source.channelId, mensagem)
                        done()
                    })
            }
        }
    }


}

module.exports = {
    header,
    handler
}