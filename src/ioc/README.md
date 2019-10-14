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
