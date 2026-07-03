#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vitepress/dist

git init
git add -A
git commit -m 'deploy'

# deploy to gh-pages
git push -f git@github.com:tangchao0106/tc-blog-vite.git main:gh-pages

cd -
