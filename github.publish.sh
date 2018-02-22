git worktree add dist production
(cd dist; git add .)
(git commit -m "Build output as of $(git log '--format=format:%H' master -1)")
git push origin production
