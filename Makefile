.EXPORT_ALL_VARIABLES:
REACT_APP_BACKEND_SERVER ?=

.PHONY: reset-db, run-jsonserver, reset-jsonserver
reset-db:
	@cp ./tests/data/db.json .

run-jsonserver:
	@json-server -c ./tests/data/json-server.json --watch db.json

reset-jsonserver:reset-db
reset-jsonserver:run-jsonserver


run-app-with-fake-backend: REACT_APP_BACKEND_SERVER=http://localhost:3333
run-app-with-fake-backend:
	@npm run start

run-app-with-local-backend: REACT_APP_BACKEND_SERVER=http://localhost:8888
run-app-with-local-backend:
	@npm run start