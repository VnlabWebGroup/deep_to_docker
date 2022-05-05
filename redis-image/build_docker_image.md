COMMAND
docker build .
===
Log first build
===

```ending build context to Docker daemon  2.048kB
Step 1/4 : FROM alpine
latest: Pulling from library/alpine
df9b9388f04a: Pull complete 
Digest: sha256:4edbd2beb5f78b1014028f4fbb99f3237d9561100b6881aabbf5acce2c4f9454
Status: Downloaded newer image for alpine:latest
 ---> 0ac33e5f5afa
Step 2/4 : RUN apk add --update redis
 ---> Running in b97a81950ae0
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/community/x86_64/APKINDEX.tar.gz
(1/1) Installing redis (6.2.7-r0)
Executing redis-6.2.7-r0.pre-install
Executing redis-6.2.7-r0.post-install
Executing busybox-1.34.1-r5.trigger
OK: 8 MiB in 15 packages
Removing intermediate container b97a81950ae0
 ---> 7a0bf6713074
Step 3/4 : RUN apk add --update gcc
 ---> Running in f45dec9a578d
(1/11) Installing libgcc (10.3.1_git20211027-r0)
(2/11) Installing libstdc++ (10.3.1_git20211027-r0)
(3/11) Installing binutils (2.37-r3)
(4/11) Installing libgomp (10.3.1_git20211027-r0)
(5/11) Installing libatomic (10.3.1_git20211027-r0)
(6/11) Installing libgphobos (10.3.1_git20211027-r0)
(7/11) Installing gmp (6.2.1-r1)
(8/11) Installing isl22 (0.22-r0)
(9/11) Installing mpfr4 (4.1.0-r0)
(10/11) Installing mpc1 (1.2.1-r0)
(11/11) Installing gcc (10.3.1_git20211027-r0)
Executing busybox-1.34.1-r5.trigger
OK: 118 MiB in 26 packages
Removing intermediate container f45dec9a578d
 ---> 57632a2ddfee
Step 4/4 : CMD ["redis-server"]
 ---> Running in 3af13547ac54
Removing intermediate container 3af13547ac54
 ---> 21b8ee5f9a87
Successfully built 21b8ee5f9a87
```

===

21b8ee5f9a87 is image id

note the intermediate container created when build an image


===
Rebuild docker image with cache
===
```hau@hau-IdeaPad-Flex-5-14ALC05:~/source_code/web_group_vnlab/deep_to_docker/redis-image$ docker build .
Sending build context to Docker daemon  4.608kB
Step 1/4 : FROM alpine
 ---> 0ac33e5f5afa
Step 2/4 : RUN apk add --update redis
 ---> Using cache
 ---> 7a0bf6713074
Step 3/4 : RUN apk add --update gcc
 ---> Using cache
 ---> 57632a2ddfee
Step 4/4 : CMD ["redis-server"]
 ---> Using cache
 ---> 21b8ee5f9a87
Successfully built 21b8ee5f9a87
```
===
Note the using cache flag

===
Insert command disable cache from that command
===
```hau@hau-IdeaPad-Flex-5-14ALC05:~/source_code/web_group_vnlab/deep_to_docker/redis-image$ docker build .
Sending build context to Docker daemon   5.12kB
Step 1/5 : FROM alpine
 ---> 0ac33e5f5afa
Step 2/5 : RUN echo "xxxxxxxxxxxxxx"
 ---> Running in 6624473cfd94
xxxxxxxxxxxxxx
Removing intermediate container 6624473cfd94
 ---> b6e16284dd5f
Step 3/5 : RUN apk add --update redis
 ---> Running in 035c5e781d79
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/community/x86_64/APKINDEX.tar.gz
(1/1) Installing redis (6.2.7-r0)
Executing redis-6.2.7-r0.pre-install
Executing redis-6.2.7-r0.post-install
Executing busybox-1.34.1-r5.trigger
OK: 8 MiB in 15 packages
Removing intermediate container 035c5e781d79
 ---> 1716a13c6add
Step 4/5 : RUN apk add --update gcc
 ---> Running in 437b86361a93
(1/11) Installing libgcc (10.3.1_git20211027-r0)
(2/11) Installing libstdc++ (10.3.1_git20211027-r0)
(3/11) Installing binutils (2.37-r3)
(4/11) Installing libgomp (10.3.1_git20211027-r0)
(5/11) Installing libatomic (10.3.1_git20211027-r0)
(6/11) Installing libgphobos (10.3.1_git20211027-r0)
(7/11) Installing gmp (6.2.1-r1)
(8/11) Installing isl22 (0.22-r0)
(9/11) Installing mpfr4 (4.1.0-r0)
(10/11) Installing mpc1 (1.2.1-r0)
(11/11) Installing gcc (10.3.1_git20211027-r0)
Executing busybox-1.34.1-r5.trigger
OK: 118 MiB in 26 packages
Removing intermediate container 437b86361a93
 ---> 058810af2626
Step 5/5 : CMD ["redis-server"]
 ---> Running in 020d38271546
Removing intermediate container 020d38271546
 ---> 12780c7a3899
Successfully built 12780c7a3899
```

===
note that new image was created 12780c7a3899



===
Option no-cache
===
```Khi chạy lệnh docker build với 1 file Dockerfile lần đầu, 
docker sẽ chạy lần lượt từng Step từ trên xuống dưới giống như trong Dockerfile.
Tuy nhiên, kết quả của từng Step đó sẽ được cache lại (Lưu lại tạm thời trong máy tính).

Vì vậy, nếu chạy lại lệnh docker build với cùng 1 file Dockerfile và file Dockerfile đó không có thay đổi gì so với lần trước, 
thì docker sẽ ko chạy lại các Step trong Docker file mà sẽ lấy luôn kết quả đã được cache trước đó để build.

---> Có những lệnh mà kết quả run khác nhau giữa các lần chạy thì sẽ không được run.
---> Ví dụ: Lệnh apt-get update dùng để update lại apt-get mới nhất trước khi install package nào đó.
---> Khi chạy docker build với cùng 1 Dockerfie nhiều lần, nếu Dockerfile đó không có thay đổi thì lệnh apt-get update này sẽ bị bỏ qua.
---> Khi chạy docker build với cùng 1 Dockerfie nhiều lần, nếu muốn chạy lại toàn bộ step trong Dockerfile và không sử dụng data cache, 
thì thêm option --no-cache vào lệnh docker build như sau:
docker build --no-cache -t docker-whale .
```

===
Tag an image
===
```
hau@hau-IdeaPad-Flex-5-14ALC05:~/source_code/web_group_vnlab/deep_to_docker/redis-image$ docker build -t localhost/redis:latest .
Sending build context to Docker daemon  7.168kB
Step 1/5 : FROM alpine
 ---> 0ac33e5f5afa
Step 2/5 : RUN echo "xxxxxxxxxxxxxx"
 ---> Using cache
 ---> b6e16284dd5f
Step 3/5 : RUN apk add --update redis
 ---> Using cache
 ---> 1716a13c6add
Step 4/5 : RUN apk add --update gcc
 ---> Using cache
 ---> 058810af2626
Step 5/5 : CMD ["redis-server"]
 ---> Using cache
 ---> 12780c7a3899
Successfully built 12780c7a3899
Successfully tagged localhost/redis:latest

hau@hau-IdeaPad-Flex-5-14ALC05:~/source_code/web_group_vnlab/deep_to_docker/redis-image$ docker images
REPOSITORY            TAG       IMAGE ID       CREATED          SIZE
localhost/redis       latest    12780c7a3899   18 minutes ago   124MB
```

===
docker commit disadvantage
===
```1. Sau khi cài đặt, cấu hình mọi thứ cần thiết vào container, ta có thể build 1 image mới dựa vào container đã có.

2. Tuy nhiên, việc build image từ container có sẵn là VIỆC KHÔNG NÊN LÀM.

3. Lý do là vì chúng ta không thể kiểm soát được, chúng ta đã cài đặt, cấu hình gì vào container trước đó. Không có gì lưu lại các command mà chúng ta đã chạy trước đó ở container.

4. Theo tư tưởng "Infra as code", chuẩn nhất thì vẫn là viết ra Dockerfile để build image docker. Vì nhìn vào Dockerfile, chúng ta có thể biết rõ và kiểm soát được những gì được cài đặt và cấu hình trong image.
```

===
docker exec -it
===
```docker run --name status-test -it alpine /bin/sh

Option -it có nghĩa như sau:

-i : interactive : Tạo ra tương tác 2 chiều giữa máy host và container. 
Giúp container có thể nhận dữ liệu từ bàn phím của máy host, và máy host có thể nhận dữ liệu được gửi từ container để hiển thị ra MH.

-t : TTY : Giúp máy host hiển thị dữ liệu nhận được từ container 1 cách trực quan, dễ hiểu.

-> Combo lệnh --it + /bin/sh rất hay được sử dụng cùng nhau. 
Giúp bật terminal của container, nhận và gửi dữ liệu từ máy host tới container, 
sau đó hiển thị dữ liệu nhận được từ container 1 cách trực quan đẹp mắt trên MH máy host
```