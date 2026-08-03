up:
	docker compose up

i-s:
	cd server && npm install $(filter-out $@,$(MAKECMDGOALS))
	docker compose exec backend npm install $(filter-out $@,$(MAKECMDGOALS))

i-sd:
	cd server && npm install -D $(filter-out $@,$(MAKECMDGOALS))
	docker compose exec backend npm install -D $(filter-out $@,$(MAKECMDGOALS))

i-c:
	cd client && npm install $(filter-out $@,$(MAKECMDGOALS))
	docker compose exec frontend npm install $(filter-out $@,$(MAKECMDGOALS))


i-cd:
	cd client && npm install -D $(filter-out $@,$(MAKECMDGOALS))
	docker compose exec frontend npm install -D $(filter-out $@,$(MAKECMDGOALS))

mongo:
	docker compose exec mongo mongosh -u admin -p secret --authenticationDatabase admin
	
redis:
	docker compose exec redis redis-cli

redis-flush:
	docker compose exec redis redis-cli FLUSHALL

rs-init:
	docker compose 	exec mongo mongosh -u admin -p secret --authenticationDatabase admin --eval "rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: 'mongo:27017' }] })"

recreate:
	docker compose up -d --force-recreate $(filter-out $@,$(MAKECMDGOALS))

runStartUp:
	docker compose exec backend npx tsx src/scripts/startUpScript.ts

%:
	@: