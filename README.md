## Node JS Starter Project

A Node JS Starter API. The API supports Postgres Database and Sequelize ORM and supports JWT authentication with both private and public api access points. The project uses babel to transpile modern JavaScript into ES5 and is scaffold with an IOC (inversion of control) container.

## Installation

Make your life easier and setup NVM for managing node versions. By doing that all you need to do is run "nvm use" to avoid npm version issues.

## Run Development
```
nvm use
```
```
yarn install OR npm install
```
```
yarn dev OR npm dev
```

## Production
```
yarn build OR npm build
```


# IOC Container

Dependency injection is a form of IOC, where you let someone else take control over your dependencies. An IOC container is just a tool for making this whole process more convenient. The ‘container’ is just an object where depencies are declared and stored. The declarative nature of a container is what makes it powerful. We don’t need to specify when the dependencies are created, just what they look like.

## Adding Services

1. Add service class to the services directory.
2. Create a provider file and add it to the providers directory. 
3. Add the required reference to the init file.

## Using the Service

1. Declared resource.

```
const createContainer = require('./ioc/init');
const ioc = createContainer();

const configManager = ioc.ConfigManager;
```

2. Service Provider

```
import { services } from './ioc';

services.configManager
```
