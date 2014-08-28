#!/bin/bash

ruby crawler_bikepoa_mapaestacao.rb | psql voudebike -c "TRUNCATE crawled_bikepoa_mapaestacao; COPY crawled_bikepoa_mapaestacao FROM STDIN CSV;" && psql voudebike -f import_bikepoa.sql
