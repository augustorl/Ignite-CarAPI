<div align=center><img src="https://i.imgur.com/oUAKMC5.png" /></div>
<br/>
<h3 align=center>🚙 A car rental API 🚙</h3>

<div align=center>
<a href="#About-the-project">About</a> |
<a href="#Tecnologies">Tecnologies</a> |
<a href="#How-to-run">How to run</a> |
<a href="#License">License</a>
</div>

## About the project

RentX is a NodeJS REST API for renting cars!

## Tecnologies

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://www.nodejs.org)
- [Express](https://github.com/expressjs/express)
- [Docker](https://www.docker.com/)


## Documentation

All API available endpoints are documented using [Swagger](https://swagger.io/). If you are running locally this API you can access the docs in http://localhost:3333/api-docs.

## How to run

### Clone Repo and install dependencies using yarn

```bash
$ git clone https://github.com/augustorl/rentx-api
$ cd rentx-api
$ yarn
```

### Rename config files
```bash
$ mv ormconfig.json.exemple ormconfig.json
$ mv .env.exemple .env
```
##### Edit .env and ormconfig.json using your prefered IDE.

### Run using docker or local server.
```bash
$ yarn dev # runs a local server
$ docker-compose up -d database # runs docker-compose.yml
$ yarn test # runs jest tests ang generates src/coverage
$ yarn build # Build to deploy
```

## License

This project is under the MIT License. Read the [LICENSE](LICENSE.md) file for further information.
