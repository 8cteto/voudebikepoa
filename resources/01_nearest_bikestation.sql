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


CREATE OR REPLACE FUNCTION nearest_bikestation_json(origin POINT)
RETURNS JSON
AS
$$
	SELECT	row_to_json(a.*)
	FROM	nearest_bikestation(origin) AS a;
$$
LANGUAGE sql;
