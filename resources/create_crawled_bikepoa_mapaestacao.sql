begin;

create extension unnacent;

alter table estacoes_bikepoa
	add status_online char(1),
	add status_operacao char(2),
	add vagas_ocupadas integer,
	add num_bicicletas integer,
	add endereco text;

create table bikepoa_mapaestacao (
	latitude float8,
	longitude float8,
	icone varchar,
	nome varchar,
	id_estacao integer,
	status_online char(1),
	status_operacao char(2),
	vagas_ocupadas integer,
	num_bicicletas integer,
	endereco varchar
);
