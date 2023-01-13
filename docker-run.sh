#!/bin/bash

VERSION=$(cat lerna.json | jq -r '.version')
NAME=$(cat package.json | jq -r '.name')
HOST="ghcr.io"
TAG="${HOST}/kajyr/${NAME}:${VERSION}"

docker run --rm -p 7007:4445 $TAG
