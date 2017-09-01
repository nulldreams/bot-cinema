# bot-cinema
Exibe os filmes em cartaz na cidade de Maringá.

# Como instalar?
  Utilize o comando `npm install` ou `npm i` para instalar os módulos necessários, que são:
  - cfonts
  - cheerio
  - colors
  - commander
  - moment
  - nedb
  - request
  - request-promise
  
  Alguns módulos são usados apenas para exibir as informações no console com uma cara mais "bonita".
  
  
# Como usar?
  Simples, depois de fazer a instalação utilize o comando `node cinema.js listar`
  
  Exemplo:
  
  ```
  C:\Bots\bot-cinema>node cinema.js listar


   ██████╗   ██████╗  ████████╗
   ██╔══██╗ ██╔═══██╗ ╚══██╔══╝
   ██████╔╝ ██║   ██║    ██║
   ██╔══██╗ ██║   ██║    ██║
   ██████╔╝ ╚██████╔╝    ██║
   ╚═════╝   ╚═════╝     ╚═╝

   ███████╗ ██╗ ██╗      ███╗   ███╗ ███████╗ ███████╗ ██╗
   ██╔════╝ ██║ ██║      ████╗ ████║ ██╔════╝ ██╔════╝ ██║
   █████╗   ██║ ██║      ██╔████╔██║ █████╗   ███████╗ ██║
   ██╔══╝   ██║ ██║      ██║╚██╔╝██║ ██╔══╝   ╚════██║ ╚═╝
   ██║      ██║ ███████╗ ██║ ╚═╝ ██║ ███████╗ ███████║ ██╗
   ╚═╝      ╚═╝ ╚══════╝ ╚═╝     ╚═╝ ╚══════╝ ╚══════╝ ╚═╝


  1 - Dupla explosiva (Comédia)
  2 - Emoji: O Filme (Animação)
  3 - Atômica (Ação)
  4 - João, O Maestro (Drama)
  5 - O estranho que nós amamos (Suspense)
  6 - A torre negra (Fantasia)
  7 - Bingo: O Rei das Manhãs (Drama)
  8 - Annabelle 2: A Criação do Mal (Terror)
  9 - Planeta dos macacos: a guerra (Ficção científica)
  10 - Meu Malvado favorito 3 (Animação)
  ```
  
  Para ver mais informações sobre um dos filmes, utilize o comando `node cinema.js info <número do filme>`
  
  Exemplo:
  ```
    C:\Bots\bot-cinema>node cinema.js info 3


   ██████╗   ██████╗  ████████╗
   ██╔══██╗ ██╔═══██╗ ╚══██╔══╝
   ██████╔╝ ██║   ██║    ██║
   ██╔══██╗ ██║   ██║    ██║
   ██████╔╝ ╚██████╔╝    ██║
   ╚═════╝   ╚═════╝     ╚═╝

   ███████╗ ██╗ ██╗      ███╗   ███╗ ███████╗ ███████╗ ██╗
   ██╔════╝ ██║ ██║      ████╗ ████║ ██╔════╝ ██╔════╝ ██║
   █████╗   ██║ ██║      ██╔████╔██║ █████╗   ███████╗ ██║
   ██╔══╝   ██║ ██║      ██║╚██╔╝██║ ██╔══╝   ╚════██║ ╚═╝
   ██║      ██║ ███████╗ ██║ ╚═╝ ██║ ███████╗ ███████║ ██╗
   ╚═╝      ╚═╝ ╚══════╝ ╚═╝     ╚═╝ ╚══════╝ ╚══════╝ ╚═╝


  Atômica (Ação)

  Capa: http://src.odiario.com/imagem/2017/08/30/atomica.jpg?w=410&h=500&mode=crop

  IMDB: http://www.imdb.com/title/tt2406566

  Sinópse: Lorraine Broughton (Charlize Theron), uma agente disfarçada do MI6, é enviada para Berlim durante a Guerra Fria para investigar o assassinato de um oficial e recuperar uma lista perdida de agentes duplos. A
  o lado de David Percival (James McAvoy), chefe da localidade, a assassina brutal usará todas as suas habilidades nesse confronto de espiões.

  Trailer: https://www.youtube.com/embed/Jc0_8kW8IGA

  Programação: A partir de 31/8
  Shopping Maringá Park
  Av. São Paulo, 1099, Centro
  Sala 5 (LEG)

  Diariamente: 16h40, 19h20, 21h50Sábado e domingo: 14h10, 16h40, 19h20, 21h50
  ***
  Shopping Catuaí Maringá
  Av. Colombo, 9161, PQ Industrial Bandeirantes
  Sala 5 (DUB)

  Diariamente: 16h, 19h, 21h15
  ```
  
  Basicamente foi feito um `crawler` na página `http://vivamaringa.odiario.com/cinema/` que é da minha cidade, você pode utilizar o código para fazer uma consulta para os dados de sua cidade e também usar essa mesma lógica para bots no `slack` 😄
