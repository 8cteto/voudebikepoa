-- http://datapoa.com.br/dataset/bikepoa
drop table if exists Estacoes_bikePOA;
create table Estacoes_bikePOA ( id serial primary key, numero int, nome text,  latitude float8, longitude float8, latitude_t text, longitude_t text);

copy Estacoes_bikePOA (numero, nome, latitude_t, longitude_t) from '/tmp/voudebike/estacoes-bikepoa.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';

update Estacoes_bikePOA set longitude = replace(longitude_t, ',',  '.')::float where char_length(trim(longitude_t)) > 0;
update Estacoes_bikePOA set latitude = replace(latitude_t, ',', '.')::float where char_length(trim(latitude_t)) > 0;

alter table estacoes_bikepoa drop column latitude_t;
alter table estacoes_bikepoa drop column longitude_t;
-------------------
-- http://datapoa.com.br/dataset/ciclovias-implantadas
drop table if exists ciclovias_implantadas;
create table ciclovias_implantadas ( id serial primary key, gid int, nome text, regiao text, geojson_t text, geojson json);

copy ciclovias_implantadas (gid, nome, regiao, geojson_t) from '/tmp/voudebike/cicloviasimplantadas.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';

update ciclovias_implantadas set geojson = replace(replace(replace(geojson_t, '""', '"'), '"{', '{'), '}"', '}')::json;

alter table ciclovias_implantadas drop column geojson_t;
-------------------
-- http://datapoa.com.br/dataset/espacos-culturais
drop table if exists espacos_culturais;

create table espacos_culturais (id serial primary key, endereco text, complemento text, cidade text, estado varchar(2), codigo_postal varchar(9), name text, telefone text, bairro text, regiao text, url text, tipo text, categoria text, latitude float8, longitude float8, latitude_t text, longitude_t text, endereco_formatado text);

copy espacos_culturais (endereco, complemento, cidade, estado, codigo_postal, name, telefone, bairro, regiao, url, tipo, categoria, latitude_t, longitude_t, endereco_formatado) from '/tmp/voudebike/espacosculturais.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';

update espacos_culturais set longitude = replace(longitude_t, ',',  '.')::float where char_length(trim(longitude_t)) > 0;
update espacos_culturais set latitude = replace(latitude_t, ',', '.')::float where char_length(trim(latitude_t)) > 0;

alter table espacos_culturais drop column latitude_t;
alter table espacos_culturais drop column longitude_t;
--------------------
-- http://datapoa.com.br/dataset/acidentes-de-transito
drop table if exists acidentes_de_transito;
create table acidentes_de_transito (id serial primary key, gid int4, local_via text, log1 text, log2 text, predial1 text, local text, tipo_acidente text, data_hora timestamp, data_hora_t text, dia_semana text, feridos int, mortes int, morte_posterior int, fatais int, auto int, taxi int, lotacao int, onibus_urbano int, onibus_interurbano int, caminhao int, moto int, carroca int, bicicleta int, outro int, tempo text, noite_dia text, fonte text, boletin text, regiao text, dia int, mes int, ano int, faixa_hora int, contagem_acidente int, contagem_vitima int, UPS int, latitude float, longitude float, latitude_t text, longitude_t text);


copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2000.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2001.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2002.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2003.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2004.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2005.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2006.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2007.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2008.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2009.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2010.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2011.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2012.csv' WITH CSV HEADER DELIMITER ';' ENCODING 'UTF-8';
--copy acidentes_de_transito (gid, local_via, log1, log2, predial1, local, tipo_acidente, data_hora_t, dia_semana, feridos, mortes, morte_posterior, fatais, auto, taxi, lotacao, onibus_urbano, onibus_interurbano, caminhao, moto, carroca, bicicleta, outro, tempo, noite_dia, fonte, boletin, regiao, dia, mes, ano, faixa_hora, contagem_acidente, contagem_vitima, UPS, latitude_t, longitude_t) from '/tmp/voudebike/acidentes-2013.csv' WITH DELIMITER ';' ENCODING 'UTF-8';


update acidentes_de_transito set longitude = replace(longitude_t, ',',  '.')::float where char_length(trim(longitude_t)) > 0;
update acidentes_de_transito set latitude = replace(latitude_t, ',', '.')::float where char_length(trim(latitude_t)) > 0;

update acidentes_de_transito set data_hora = to_timestamp(data_hora_t, 'YYYYMMDD HH24:MI') where data_hora_t ~ '[0-9]{8} [0-9]{2}:[0-9]{2}';

alter table acidentes_de_transito drop column latitude_t;
alter table acidentes_de_transito drop column longitude_t;
alter table acidentes_de_transito drop column data_hora_t;