#Git pull with fast forward only
git pull --ff-only
#Remove node packages which are not in package.json
npm prune
#Install/update node packages from package.json
npm install
#Install bower dependecies
bower install
#Run grunt deploy task
grunt deploy:$ENV #production for prod
#Log
date >>log-deploy.txt
