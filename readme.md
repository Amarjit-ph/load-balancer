
NGINX CONFIG
```
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
    }

    server {
        listen 8080;

        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```


SERVER 1 TERMINAL
```
node server1.js
[Server 1] Listening on port 3001
[Server 1] 09 August 2024 - 2:43:48 AM - Received GET request from ::ffff:127.0.0.1
[Server 1] 09 August 2024 - 2:43:50 AM - Received GET request from ::ffff:127.0.0.1
[Server 1] 09 August 2024 - 2:43:51 AM - Received GET request from ::ffff:127.0.0.1
[Server 1] 09 August 2024 - 2:43:52 AM - Received GET request from ::ffff:127.0.0.1
[Server 1] 09 August 2024 - 2:43:53 AM - Received GET request from ::ffff:127.0.0.1
```

SERVER 2 TERMINAL

```
node server2.js
[Server 2] Listening on port 3002
[Server 2] 09 August 2024 - 2:43:49 AM - Received GET request from ::ffff:127.0.0.1
[Server 2] 09 August 2024 - 2:43:50 AM - Received GET request from ::ffff:127.0.0.1
[Server 2] 09 August 2024 - 2:43:51 AM - Received GET request from ::ffff:127.0.0.1
[Server 2] 09 August 2024 - 2:43:52 AM - Received GET request from ::ffff:127.0.0.1
[Server 2] 09 August 2024 - 2:43:53 AM - Received GET request from ::ffff:127.0.0.1
```
