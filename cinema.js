const rp = require('request-promise')
const cheerio = require('cheerio')
const program = require('commander');
const colors = require('colors')
const { VerificarFilmesHoje, ConsultarResumoFilme } = require('./src/logic');
const cfonts = require('cfonts')

cfonts.say('BOT|filmes\!', {
    font: 'block',        
    align: 'left',        
    colors: ['white'],    
    background: 'Black',  
    letterSpacing: 1,     
    lineHeight: 1,        
    space: true,          
    maxLength: '0'        
})

program
  .version('0.0.1')
  .description('Contact management system');

program
  .command('listar')
  .description('Listar os filmes em cartaz')
  .action(() => {
    VerificarFilmesHoje((mensagem) => {
        console.info(mensagem)
    })
  });

program
  .command('info <número do filme>')
  .description('Exibe as informações de um filme')
  .action(indice => ConsultarResumoFilme(indice));

program.parse(process.argv);