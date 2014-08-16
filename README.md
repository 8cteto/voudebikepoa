[![Build Status](https://secure.travis-ci.org/umovers/voudebike.png?branch=master)](http://travis-ci.org/umovers/voudebike)

#Vou de Bike POA

Um aplicativo que permite traçar rota entre um ponto de partida e destino utilizando as bicicletas do BikePoa.

De onde eu estiver, poderei pedir para chegar a algum lugar utilizando as bicicletas do BikePoa.

O software irá me sugerir o ponto mais próximo de onde eu estiver para pegar uma Bike e o ponto mais próximo do destino para devolve-la, além da rota entre estes pontos.

Poderei também selecionar se gostaria de utilizar a rota mais rápida ou mais segura, utilizando assim as ciclovias e talvez dados de acidentes.
Temos ainda a possibilidade de sugerir pontos turísticos e culturais na rota do passeio.

Poderemos tentar facilitar também passeios de bike com sua própria bicicleta, permitindo utilizar os recursos de rota segura ou rápida entre pontos de partida e destino.

Dataset que utilizaremos (se implementadas todas as funcionalidades):
* http://datapoa.com.br/dataset/bikepoa
* http://datapoa.com.br/dataset/ciclovias-implantadas
* http://datapoa.com.br/dataset/espacos-culturais
* http://datapoa.com.br/dataset/acidentes-de-transito

## Running
* Install [Node.js](http://nodejs.org/)
* Install [PostgreSQL](http://www.postgresql.org/) locally
* Restore database backup (see below)
* Run `npm install` to install dependencies listed in package.json
* Run `node index.js` to run the app
* Run `npm test` to run tests

### To setup database
* create a database called 'voudebike'
* run the database script stored in 'resources/db.sql' psql or pgadmin III
* run vacuum `vacuumdb -U postgres -d voudebike -z`

## Resources
[Color palette](http://www.colourlovers.com/palette/155071/Rei_Ayanami)


## License
(The MIT License)

Copyright (C) 2014 VouDeBike Development Team

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.