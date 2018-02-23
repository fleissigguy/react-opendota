# remove previous publication
rm -rf dist
mkdir dist

# generate contents...
npm run build

# going to our gh-pages folder
cd dist
git init
git add .
git commit -m "publish to gh-pages branch"
git checkout -b gh-pages
git push --force --set-upstream https://$GH_TOKEN@github.com/js2me/opendota-webclient.git gh-pages
cd ..
rm -rf dist
