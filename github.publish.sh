# remove previous publication
rm -rf dist
mkdir dist

# clone gh-pages branch from the local repo into a repo located within "dist"
git clone .git --branch gh-pages dist

# generate contents...
npm run build

# commit the changes in the clone and push them back to the local gh-pages branch
cd dist && git add --all && git commit -m "Publishing to gh-pages" && git push origin gh-pages

# publish
git push upstream gh-pages
