#!/bin/bash

yarn install
yarn link vue-ui
yarn link rails-api
npx -y playwright@1.47.1 install --with-deps
