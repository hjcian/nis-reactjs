.PHONY: reset-db, run-jsonserver, reset-jsonserver

reset-db:
	@cp ./tests/data/db.json .

run-jsonserver:
	@json-server -c ./tests/data/json-server.json --watch db.json

reset-jsonserver:reset-db
reset-jsonserver:run-jsonserver