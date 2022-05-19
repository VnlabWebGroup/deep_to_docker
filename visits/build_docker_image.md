Docker-compose
===

### Build our image by using Dockerfile
===

```
vagrant@vagrant:/vagrant/deep_to_docker/visits$ docker build -t visits .
Sending build context to Docker daemon  4.096kB
Step 1/6 : FROM node:14-alpine
 ---> cdea9aaabfd0
Step 2/6 : WORKDIR /app
 ---> Running in 7ef07b666325
Removing intermediate container 7ef07b666325
 ---> 8634a46e3255
Step 3/6 : COPY  package.json .
 ---> 9a724ccf8188
Step 4/6 : RUN npm install
 ---> Running in ae4282f921a1
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN app No description
npm WARN app No repository field.
npm WARN app No license field.

added 61 packages from 46 contributors and audited 61 packages in 4.568s

7 packages are looking for funding
  run `npm fund` for details

found 1 low severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
Removing intermediate container ae4282f921a1
 ---> ceb1dc381603
Step 5/6 : COPY  . .
 ---> 351766215377
Step 6/6 : CMD [ "npm", "start" ]
 ---> Running in 54a1030df146
Removing intermediate container 54a1030df146
 ---> bd1cefaaf3f0
Successfully built bd1cefaaf3f0
Successfully tagged visits:latest
```
docker-compose up
===
### start 2 services by using docker-compose file

```
vagrant@vagrant:/vagrant/deep_to_docker/visits$ docker-compose up
Creating network "visits_default" with the default driver
Pulling redis-server (redis:)...
latest: Pulling from library/redis
214ca5fb9032: Pull complete
9eeabf2ad250: Pull complete
b8eb79a9f3c4: Pull complete
0ba9bf1b547e: Pull complete
2d2e2b28e876: Pull complete
3e45fcdfb831: Pull complete
Digest: sha256:ad0705f2e2344c4b642449e658ef4669753d6eb70228d46267685045bf932303
Status: Downloaded newer image for redis:latest
Building node-app
Step 1/6 : FROM node:14-alpine
 ---> cdea9aaabfd0
Step 2/6 : WORKDIR /app
 ---> Using cache
 ---> 8634a46e3255
Step 3/6 : COPY  package.json .
 ---> 9ded482d6774
Step 4/6 : RUN npm install
 ---> Running in 931b1ae52f49
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN app No description
npm WARN app No repository field.
npm WARN app No license field.

added 61 packages from 46 contributors and audited 61 packages in 4.313s

7 packages are looking for funding
  run `npm fund` for details

found 1 low severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
Removing intermediate container 931b1ae52f49
 ---> 48dfcf02933d
Step 5/6 : COPY  . .
 ---> a0507483cc50
Step 6/6 : CMD [ "npm", "start" ]
 ---> Running in b0a9bf75cf39
Removing intermediate container b0a9bf75cf39
 ---> 0c5321d0f958
Successfully built 0c5321d0f958
Successfully tagged visits_node-app:latest
WARNING: Image for service node-app was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating visits_redis-server_1 ... done
Creating visits_node-app_1     ... done
Attaching to visits_node-app_1, visits_redis-server_1
```
note: 
```
Creating network "visits_default" with the default driver
``` 
when using docker-compose to start service, it'll create a network by itself if we not define.

docker-compose up -d
===
### start service and run back-ground

```
vagrant@vagrant:/vagrant/deep_to_docker/visits$ docker-compose up -d
Starting visits_node-app_1     ... done
Starting visits_redis-server_1 ... done
vagrant@vagrant:/vagrant/deep_to_docker/visits$ docker-compose down
Stopping visits_node-app_1     ... done
Stopping visits_redis-server_1 ... done
Removing visits_node-app_1     ... done
Removing visits_redis-server_1 ... done
Removing network visits_default
```

docker-compose down
===
### stop service
```
vagrant@vagrant:/vagrant/deep_to_docker/visits$ docker-compose down
Stopping visits_node-app_1     ... done
Stopping visits_redis-server_1 ... done
Removing visits_node-app_1     ... done
Removing visits_redis-server_1 ... done
Removing network visits_defaul
```

docker-compose up --build
===
### rebuild image and start service

```
vagrant@vagrant:/vagrant/deep_to_docker/visits$ docker-compose up --build
Creating network "visits_default" with the default driver
Building node-app
Step 1/6 : FROM node:14-alpine
 ---> cdea9aaabfd0
Step 2/6 : WORKDIR /app
 ---> Using cache
 ---> 8634a46e3255
Step 3/6 : COPY  package.json .
 ---> Using cache
 ---> 9ded482d6774
Step 4/6 : RUN npm install
 ---> Using cache
 ---> 48dfcf02933d
Step 5/6 : COPY  . .
 ---> 70e6c038c4a6
Step 6/6 : CMD [ "npm", "start" ]
 ---> Running in fcb74c97ddaf
Removing intermediate container fcb74c97ddaf
 ---> 069354108f1f
Successfully built 069354108f1f
Successfully tagged visits_node-app:latest
Creating visits_redis-server_1 ... done
Creating visits_node-app_1     ... done
Attaching to visits_node-app_1, visits_redis-server_1
redis-server_1  | 1:C 18 May 2022 18:33:41.909 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
redis-server_1  | 1:C 18 May 2022 18:33:41.909 # Redis version=7.0.0, bits=64, commit=00000000, modified=0, pid=1, just started
redis-server_1  | 1:C 18 May 2022 18:33:41.909 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
redis-server_1  | 1:M 18 May 2022 18:33:41.913 * monotonic clock: POSIX clock_gettime
redis-server_1  | 1:M 18 May 2022 18:33:41.925 * Running mode=standalone, port=6379.
redis-server_1  | 1:M 18 May 2022 18:33:41.926 # Server initialized
redis-server_1  | 1:M 18 May 2022 18:33:41.926 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
redis-server_1  | 1:M 18 May 2022 18:33:41.927 * The AOF directory appendonlydir doesn't exist
redis-server_1  | 1:M 18 May 2022 18:33:41.927 * Ready to accept connections
node-app_1      |
node-app_1      | > @ start /app
node-app_1      | > node index.js
node-app_1      |
node-app_1      | Listening on port 8081
```
restart policies
===
### restart: 'no' => Do not automatically restart the container. (the default)
### restart: on-failure => Restart the container if it exits due to an error, which manifests as a non-zero exit code. Optionally, limit the number of times the Docker daemon attempts to restart the container using the :max-retries option.

```
redis-server_1  | 1:M 18 May 2022 18:33:41.927 * Ready to accept connections
node-app_1      |
node-app_1      | > @ start /app
node-app_1      | > node index.js
node-app_1      |
node-app_1      | Listening on port 8081
visits_node-app_1 exited with code 0
```
### restart: unless-stopped => Similar to always, except that when the container is stopped (manually or otherwise), it is not restarted even after Docker daemon restarts.
### restart: always => Always restart the container if it stops. If it is manually stopped, it is restarted only when Docker daemon restarts or the container itself is manually restarted. 

```
redis-server_1  | 1:M 18 May 2022 18:38:09.548 * Ready to accept connections
node-app_1      |
node-app_1      | > @ start /app
node-app_1      | > node index.js
node-app_1      |
node-app_1      | Listening on port 8081
node-app_1      |
node-app_1      | > @ start /app
node-app_1      | > node index.js
node-app_1      |
node-app_1      | Listening on port 8081
visits_node-app_1 exited with code 0
node-app_1      |
node-app_1      | > @ start /app
node-app_1      | > node index.js
node-app_1      |
node-app_1      | Listening on port 8081
```

docker-compose ps
===
```
vagrant@vagrant:/vagrant/deep_to_docker/visits$ docker-compose ps
        Name                       Command               State                    Ports
---------------------------------------------------------------------------------------------------------
visits_node-app_1       docker-entrypoint.sh npm start   Up      0.0.0.0:4001->8081/tcp,:::4001->8081/tcp
visits_redis-server_1   docker-entrypoint.sh redis ...   Up      6379/tcp
```
note: can only use this comment when we has docker-compose file in curent directory

```
vagrant@vagrant:/vagrant/deep_to_docker/visits$ cd ..
vagrant@vagrant:/vagrant/deep_to_docker$ docker-compose ps
ERROR:
        Can't find a suitable configuration file in this directory or any
        parent. Are you in the right directory?

        Supported filenames: docker-compose.yml, docker-compose.yaml
```