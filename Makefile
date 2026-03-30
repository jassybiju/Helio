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

%:
	@: