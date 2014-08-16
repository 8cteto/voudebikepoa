CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

CREATE OR REPLACE FUNCTION nearest_bikestation(origin POINT, OUT name TEXT, OUT latitude FLOAT8, OUT longitude FLOAT8)
AS
$$
	SELECT	nome,
			latitude,
			longitude
	FROM	estacoes_bikepoa
	ORDER	BY point(latitude, longitude) <-> origin
	LIMIT	1;
$$
LANGUAGE sql;
