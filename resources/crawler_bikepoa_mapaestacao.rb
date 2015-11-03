#!/bin/ruby

require 'net/http'

content = Net::HTTP.get(URI('http://ww2.mobilicidade.com.br/bikepoa/mapaestacao.asp'))
content_encoded = content.force_encoding("ISO-8859-1").encode('utf-8')

content_encoded.gsub(/\n|\r/, '').scan(/exibirEstacaMapa\(([\w\s\.\,\-\/\"\/\u00C0-\u02B0]+)\);/).each do |match| 
	puts match.first
end
