CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

CREATE OR REPLACE FUNCTION nearest_bikestation(origin POINT)
RETURNS POINT AS
$$
	SELECT	point(latitude, longitude)
	FROM	estacoes_bikepoa
	ORDER	BY point(latitude, longitude) <-> origin
	LIMIT	1;
$$
LANGUAGE sql;

CREATE OR REPLACE FUNCTION nearest_bikestation_text(origin POINT)
RETURNS TEXT AS
$$
	SELECT	translate(nearest_bikestation(origin)::TEXT, '()', '');
$$
LANGUAGE sql;
