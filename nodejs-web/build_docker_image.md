Build nodejs image from node:14-alpine image
===

```
vagrant@vagrant:/vagrant/deep_to_docker/nodejs-web$ docker build -t nodejs-web .
Sending build context to Docker daemon  4.608kB
Step 1/5 : FROM node:14-alpine
14-alpine: Pulling from library/node
df9b9388f04a: Pull complete
14d1558fd437: Pull complete
949f6fd48f0a: Pull complete
4568a8ba57ea: Pull complete
Digest: sha256:fc6cc60ea4801619543bd11b7db798626e32ab921f2ff319e620b806637dea6d
Status: Downloaded newer image for node:14-alpine
 ---> cdea9aaabfd0
Step 2/5 : WORKDIR /usr/app
 ---> Running in c0736b94e688
Removing intermediate container c0736b94e688
 ---> fb5a7ee636a6
Step 3/5 : COPY  . .
 ---> 2b8bae3c3208        
Step 4/5 : RUN npm install
 ---> Running in 5eb12476a4f0
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN app No description
npm WARN app No repository field.
npm WARN app No license field.

added 57 packages from 42 contributors and audited 57 packages in 4.168s

7 packages are looking for funding
  run `npm fund` for details      

found 0 vulnerabilities

Removing intermediate container 5eb12476a4f0
 ---> 3ceab431dda5
Step 5/5 : CMD [ "npm", "start" ]
 ---> Running in 1377a17b3ec3
Removing intermediate container 1377a17b3ec3
 ---> 0812174d3a59
Successfully built 0812174d3a59
Successfully tagged nodejs-web:latest
```

docker run without port mapping
===

```
vagrant@vagrant:/vagrant/deep_to_docker/nodejs-web$ docker run nodejs-web

> @ start /usr/app
> node index.js   

Listening on port 8080
```

docker run with port mapping
===

```
vagrant@vagrant:/vagrant/deep_to_docker/nodejs-web$ docker run -p 8080:8080 nodejs-web

> @ start /usr/app
> node index.js

Listening on port 8080
```
Note: Port mapping makes the processes inside the container available from the outside.

Unnecessary Rebuilds
===

```
vagrant@vagrant:/vagrant/deep_to_docker/nodejs-web$ docker build -t nodejs-web .
Sending build context to Docker daemon  6.656kB
Step 1/6 : FROM node:14-alpine
 ---> cdea9aaabfd0
Step 2/6 : WORKDIR /usr/app
 ---> Using cache
 ---> fb5a7ee636a6
Step 3/6 : COPY  ./package.json .
 ---> a33c8ea3b207
Step 4/6 : RUN npm install
 ---> Running in 265506d58430
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN app No description
npm WARN app No repository field.
npm WARN app No license field.

added 57 packages from 42 contributors and audited 57 packages in 4.388s

7 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Removing intermediate container 265506d58430
 ---> f0423910a9fc
Step 5/6 : COPY  . .
 ---> 479f7a9bb83b
Step 6/6 : CMD [ "npm", "start" ]
 ---> Running in cd41ae7c52b6
Removing intermediate container cd41ae7c52b6
 ---> bc82e132da89
Successfully built bc82e132da89
Successfully tagged nodejs-web:latest
```


```
vagrant@vagrant:/vagrant/deep_to_docker/nodejs-web$ docker build -t nodejs-web .
Sending build context to Docker daemon   7.68kB
Step 1/6 : FROM node:14-alpine
 ---> cdea9aaabfd0
Step 2/6 : WORKDIR /usr/app      
 ---> Using cache
 ---> fb5a7ee636a6
Step 3/6 : COPY  ./package.json .
 ---> Using cache
 ---> a33c8ea3b207
Step 4/6 : RUN npm install       
 ---> Using cache
 ---> f0423910a9fc
Step 5/6 : COPY  . .
 ---> ddba26668a32
Step 6/6 : CMD [ "npm", "start" ]
 ---> Running in 0e1c2714033e
Removing intermediate container 0e1c2714033e
 ---> ff914f57ad9c
Successfully built ff914f57ad9c
Successfully tagged nodejs-web:latest
```