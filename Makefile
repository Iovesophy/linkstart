.PHONY: build
build:
	docker compose build

.PHONY: up
up:
	docker compose down && docker compose up --force-recreate -d

.PHONY: clean
clean:
	docker-compose down --rmi all --volumes --remove-orphans

.PHONY: bundle
bundle:
	docker run -v $(PWD):/app -t denoland/deno:latest bash -c "cd /app/linkstart && deno bundle js/src/main.js js/build/main.bundle.js"

FILENAME=template/s3.yml
STACKNAME=
BUCKETNAME=
.PHONY: deploy
deploy:
	aws cloudformation deploy \
	--stack-name $(STACKNAME) \
	--template-file $(FILENAME) \
	--parameter-overrides S3BucketName=$(BUCKETNAME)

