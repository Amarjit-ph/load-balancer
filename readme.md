## Load Balancer
A load balancer is a tool or system that distributes incoming network traffic across multiple servers. Its main purpose is to improve the performance, reliability, and availability of applications or services by ensuring that no single server becomes overwhelmed with too many requests.

Key Points:
- Distributes Traffic: It spreads incoming requests among multiple servers.
- Enhances Performance: Balances the load to avoid bottlenecks and improve response times.
- Increases Reliability: Provides fault tolerance by rerouting traffic if a server fails.
- Scales Applications: Allows for scaling out (adding more servers) to handle increased traffic.

Load balancers can be implemented using hardware devices, software solutions, or cloud-based services.

## Understanding the Load Balancer Setup

NGINX Configuration
The provided NGINX configuration sets up a load balancer that distributes incoming requests between two backend servers.

```
events {
    worker_connections 1024;
}
```
events block: Configures the maximum number of simultaneous connections each worker process can handle. Here, it's set to 1024.

```
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
http block: Contains HTTP traffic settings.
upstream backend block: Defines a group of backend servers (Server 1 and Server 2) that NGINX will balance traffic across.
server block: Configures NGINX to listen on port 8080 for incoming HTTP requests.
location / block: Forwards all requests to the backend group and preserves original request headers.


nginx.conf
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
Example of 10 GET requests balanced in between the two server

Server 1 Terminal log:
```
node server1.js
[Server 1] Listening on port 3001
[Server 1] 09 August 2024 - 2:43:48 AM - Received GET request from ::ffff:127.0.0.1
[Server 1] 09 August 2024 - 2:43:50 AM - Received GET request from ::ffff:127.0.0.1
[Server 1] 09 August 2024 - 2:43:51 AM - Received GET request from ::ffff:127.0.0.1
[Server 1] 09 August 2024 - 2:43:52 AM - Received GET request from ::ffff:127.0.0.1
[Server 1] 09 August 2024 - 2:43:53 AM - Received GET request from ::ffff:127.0.0.1
```

Server 2 Terminal log:
```
node server2.js
[Server 2] Listening on port 3002
[Server 2] 09 August 2024 - 2:43:49 AM - Received GET request from ::ffff:127.0.0.1
[Server 2] 09 August 2024 - 2:43:50 AM - Received GET request from ::ffff:127.0.0.1
[Server 2] 09 August 2024 - 2:43:51 AM - Received GET request from ::ffff:127.0.0.1
[Server 2] 09 August 2024 - 2:43:52 AM - Received GET request from ::ffff:127.0.0.1
[Server 2] 09 August 2024 - 2:43:53 AM - Received GET request from ::ffff:127.0.0.1
```

## Summary
- NGINX acts as a load balancer, distributing incoming requests between Server 1 and Server 2.
- Server 1 and Server 2 log incoming requests with timestamps and client IP addresses.
- Logs illustrate how requests are routed and handled, verifying the load-balancing functionality.
