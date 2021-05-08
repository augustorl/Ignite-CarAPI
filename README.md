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

## How to run

### Clone Repo and install dependencies using yarn

```bash
$ git clone https://github.com/augustorl/rentx-ap
$ cd rentx
$ yarn
```

### Rename config files
```bash
$ mv ormconfig.json.exemple ormconfig.json
$ mv .env.exemple .env
```

### Run docker or server
```bash
$ yarn dev # runs a local server
$ docker-compose up -d database # runs docker-compose.yml
$ yarn test # runs jest tests ang generates src/coverage
$ yarn build # Build to deploy
```

## Documentation

The API endpoints are well documented on the swagger interface. To check it, just run the api and access 

*http://localhost:3333/api-docs*

## License

This project is under the MIT License. Read the [LICENSE](LICENSE) file for further information.
