---
id: traefik
title: Omada Controller behind traefik
---

Few things to consider and requirements,

- traefik in the Docker
- Valid Domain required
- Cloudflare is Authoritative DNS server

Above things can be manipulated based on the requirements

## Install docker

Install docker with the following, 

```shell
curl -sSL https://get.docker.com | sh -
```

Post docker installation documentation can be found [here](https://docs.docker.com/engine/install/linux-postinstall/).

## traefik

Before deploying traefik, we need few things. First create a directory traefik in home directory with `mkdir trafik`. Everything will be inside this directory.

### traefik config

Create `traefik.yaml` and add following content modify the given details

```yaml
api:
  dashboard: true
  debug: true
entryPoints:
  http:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: https
          scheme: https
  https:
    address: ":443"
  dnsovertls:
    address: ":853"
serversTransport:
  insecureSkipVerify: true
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
  file:
    directory: /config
    watch: true
certificatesResolvers:
  cloudflare:
    acme:
      email: email@example.com
      storage: acme.json
      dnsChallenge:
        provider: cloudflare
        resolvers:
          - "1.1.1.1:53"
          - "1.0.0.1:53"
```

What's going on inside

- Dashboard is exposed
- Debugging is enabled for troubleshooting.
- Here 2 entry points are defined,  `http` at port `80` and `https` at port `443`. 
- `http` is redirecting to entry point `https`.
- Using `docker` provider at `/var/run/docker.sock`.
- Using file config for defining routes, services & entrypoints and stored in `/config` directory.
- Using Cloudflare for certificate resolution. Update with actual email.

### network

Create a network for traefik usage.

```shell
docker network create proxy
```

### docker compose 

traefik deployment with compose as following

```yaml
---

services:
  traefik:
    image: traefik:latest
    container_name: traefik
    restart: always
    security_opt:
      - no-new-privileges:true
    networks:
      - proxy
    ports:
      - 80:80
      - 443:443
    dns:
      - 1.1.1.1
      - 1.0.0.1
    environment:
      - CF_API_EMAIL=${CF_API_EMAIL}
      # - CF_API_KEY=${CF_API_KEY}
      - CF_API_TOKEN=${CF_API_TOKEN}
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./traefik.yml:/traefik.yml:ro
      - ./data/acme.json:/acme.json
      - ./data/config:/config:ro
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.traefik.entrypoints=http"
      - "traefik.http.routers.traefik.rule=Host(`traefik.example.com`)"
      - "traefik.http.middlewares.traefik-auth.basicauth.users=<user:password>"
      - "traefik.http.middlewares.traefik-https-redirect.redirectscheme.scheme=https"
      - "traefik.http.middlewares.sslheader.headers.customrequestheaders.X-Forwarded-Proto=https"
      - "traefik.http.routers.traefik.middlewares=traefik-https-redirect"
      - "traefik.http.routers.traefik-secure.entrypoints=https"
      - "traefik.http.routers.traefik-secure.rule=Host(`traefik.example.com`)"
      - "traefik.http.routers.traefik-secure.middlewares=traefik-auth"
      - "traefik.http.routers.traefik-secure.tls=true"
      - "traefik.http.routers.traefik-secure.tls.certresolver=cloudflare"
      - "traefik.http.routers.traefik-secure.tls.domains[0].main=example.com"
      - "traefik.http.routers.traefik-secure.tls.domains[0].sans=*.example.com"
      - "traefik.http.routers.traefik-secure.service=api@internal"

networks:
  proxy:
    external: true
```

Few things before deploying this.

### Cloudflare Credentials

Generate Cloudflare token with `Zone` and `DNS` scopes or Use legacy `API key` with `Email`. Save them in `.env` file.

```ini
CF_API_EMAIL=
CF_API_KEY=
CF_API_TOKEN=
```

### Config

Create a directory `data` with 

```shell
mkdir data
```

Create a `acme.json` to store cert data

```shell
touch data/acme.json
```
:::warning
Do not edit `acme.json` file.
:::

Create config directory and `omada.yaml` to store file config for defining routes and etc

```shell
mkdir data/config
touch data/config/omada.yaml
```

### Basic auth for traefik dashboard

Generate `username`/`password` pair with following

```shell
echo $(htpasswd -nB user) | sed -e s/\\$/\\$\\$/g
```

Update the labels in `compose` file

```yaml
labels:
  - "traefik.http.middlewares.traefik-auth.basicauth.users=<user:password>"
```

## Deploy traefik

To deploy traefik

```shell
docker compose up -d
```

This will deploy the traefik container and completes `acme` challenge and generates certificate from `Let's Encrypt`. This config can be found on [GitHub](https://github.com/kdpuvvadi/homelab/tree/main/traefik).

:::info

If anything goes wrong, check container logs.

:::

## Omada routes

Add the following content to `data/config/omada.yaml`

```yaml
---
http:
  routers:
    oc-router:
      entryPoints:
        - "https"
      service: oc-service
      rule: "Host(`omada.example.com`)" # change it to actual address
      tls: {}
      middlewares:
        - default-headers
        - https-redirect

  services:
    oc-service:
      loadBalancer:
        servers:
          - url: https://10.20.20.119:8043 # change it to actual ip of the controller

  middlewares:
    https-redirect:
      redirectScheme:
        scheme: https
        permanent: true

    default-headers:
      headers:
        frameDeny: true
        sslRedirect: true
        browserXssFilter: true
        contentTypeNosniff: true
        forceSTSHeader: true
        stsIncludeSubdomains: true
        stsPreload: true
        stsSeconds: 15552000
        customFrameOptionsValue: SAMEORIGIN
        customRequestHeaders:
          X-Forwarded-Proto: https

    default-whitelist:
      IPAllowList:
        sourceRange:
        - "10.0.0.0/8"
        - "192.168.0.0/16"
        - "172.16.0.0/12"
        - "100.64.0.0/10"

    secured:
      chain:
        middlewares:
        - default-headers
```

In `traefik.yaml`, file config is set as following 

```yaml
providers:
  file:
    directory: /config
    watch: true # updates the config with out restart
```

Config will be auto updates by traefik and no need to restart the container. Omada controller is available at `omada.example.com`.
