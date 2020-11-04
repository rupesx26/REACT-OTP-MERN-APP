
build:
	cd backend && $(MAKE) build
	cd client && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down