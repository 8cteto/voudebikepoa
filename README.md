[![Build Status](https://secure.travis-ci.org/8cteto/voudebikepoa.png?branch=master)](http://travis-ci.org/8cteto/voudebikepoa)
#Vou de Bike POA

![Vou de Bike POA](https://raw.githubusercontent.com/8cteto/voudebikepoa/master/assets/images/logo2.png)

Vou de Bike POA é uma ferramenta de apoio para todas as pessoas que utilizam a bicicleta como meio de transporte e que praticam o ciclismo como um estilo de vida contribuindo para a redução dos problemas de mobilidade urbana e para o meio ambiente, além de ser um hábito que contribui para a saúde dos praticantes do ciclismo.
 
Nossa ideia é facilitar seu passeio, além de torná-lo mais seguro e divertido. Hoje nossa App atende a cidade de Porto Alegre e nossa ideia é atender também outras cidades do Brasil.

As principais funcionalidades que você encontrará aqui são:

* A localização de todas as estações do Bike Poa
* Criação de rotas, incluindo a estação Bike Poa mais da sua localização atual e do seu local de destino


Funcionalidades em planejamento/implementação:

* Criação de rotas para quem possui bicicleta e não necessita das informações do Bike POA 
* Criação de rotas seguras, incluindo as ciclovias e trajetos com menor incidência de  acidentes de trânsito
* Criação de rotas incluindo espaços culturais de acordo com suas preferências 
* Visualização da quantidade de bicicletas nas estações Bike POA
* Informações sobre o estado de funcionamento das bicicletas do Bike POA

Vou de Bike POA é um projeto open source criado pela equipe 8cteto e utiliza dados de fontes abertas da Prefeitura Municipal de Porto Alegre distribuídos no portal datapoa. Nossa ideia nasceu durante o evento GUDay 2014 promovido pela Sucesu-RS.

Se você se interessar, estamos abertos a novos colaboradores e novas ideias. Contribua!

Mande seu feedback através de nossa [fanpage](https://www.facebook.com/VouDeBikePOA)!

## Dataset abertos utilizados
* http://datapoa.com.br/dataset/bikepoa
* http://datapoa.com.br/dataset/ciclovias-implantadas
* http://datapoa.com.br/dataset/espacos-culturais
* http://datapoa.com.br/dataset/acidentes-de-transito

## Rodando localmente
* Instale o [Node.js](http://nodejs.org/)
* Instale o [PostgreSQL](http://www.postgresql.org/)
* Execute os passos para configurar o banco (veja abaixo)
* Execute `npm install` para instalar as dependencias listadas no package.json
* Execute `node index.js` para executar este aplicativo
* Execute `npm test` para executar os testes.

### Para configurar o banco
* Acesse o diretório do projeto
* Conecte no banco de dados através do utilitário `psql`. Note que o banco **voudebike será apagado**, assim, é necessário conectar em qualquer outro banco (como sugestão, utilize o banco `postgres`)
* Execute o `script resources/setup_db.psql` através do comando abaixo:
```
\i resources/setup_db.psql
```

## Licença
(The MIT License)

Copyright (C) 2014 VouDeBike Development Team

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
