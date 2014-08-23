BEGIN;
	TRUNCATE estacoes_bikepoa;
	ALTER SEQUENCE estacoes_bikepoa_id_seq RESTART WITH 1;
	INSERT INTO estacoes_bikepoa (numero, nome, latitude, longitude, status_online, status_operacao, vagas_ocupadas, num_bicicletas, endereco)
	SELECT id_estacao, replace(unaccent(nome), ' ', '_'), latitude, longitude, status_online, status_operacao, vagas_ocupadas, num_bicicletas, endereco FROM crawled_bikepoa_mapaestacao ORDER BY id_estacao;
COMMIT;

VACUUM ANALYZE VERBOSE estacoes_bikepoa;
