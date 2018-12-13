# SetLife Tools

A set of tools maintained by [The SetLife Network](http://setlife.network) to make development simpler, including a custom boilerplate for creating new React+Node apps.

Libaries used: Express, React, Redux, React Router, Webpack

## Setup

1. Clone the repo `git clone https://github.com/setlife-network/setblocks`

2. Move into the directory `cd setblocks`

3. Install dependencies `yarn install`

## Directory Layout

Get familiar with the **setlife** folder structure

```
|-- /api/                           # Application source code
    |-- /config/                    # Configuration files (database options, keys, constants, etc) 
    |-- /handlers/                  # Handle 3rd party APIs here with request.js
    |-- /models/                    # Database model definitions
    |-- /modules/                   # Holds files with modular functionality
    |-- /types/                     # GraphQL type definitions
    |-- schema.js                   # Root file serving as an index of API endpoints
|-- /public/                        # Holds all compiled and static files such as fonts and images
	|-- /fonts/						# Avenir Font included
	|-- /images/					# Store all photos here
|-- /web/							# Application source code
	|-- /components/			    # React components
	|-- /constants/					# Any constant variable used throughout the app
	|-- /reducers/					# Redux Reducers + Redux Actions in the same file
	|-- /scripts/					# Functions for API calls, data formatters, validators, etc
	|-- /styles/					# All .less stylesheets
```

# Usage

## Development

React+Redux front-end development files are served from webpack-dev-server, configured with webpack.config.js, and hot-reloaded automatically on every save.

to start webpack-dev-server run:

	npm run dev

this command will bundle up files for webpack-dev-sever and host them on: 

http://localhost:8080


to start the Node+Express application sourced in the `/api` folder run:

    node server


**_Hot-reloading is only enabled for files in the /web folder. Changes to any files in the /api folder will usually require a server restart_**

## Production	

In development, the bundle is created behind the scenes and is not production ready. The production-ready bundle is served from webpack using the configuration file ~/webpack.config.production.js. To create a production-ready bundle run: 

	npm run deploy

this command will bundle up files and export them to public folder:

	~/public

## Testing your production bundle 

Testing the production bundle can be done by running an express server from server.js in the root directory. To start the server run:

	node server
	
This script will serve your app from the production bundle in the public folder. To access the app go to 

	http://localhost:3000

**_Make sure to terminate the server when finished testing_**

to terminate the express server press `CTRL + c`:

## Automated Programming - CLI Tools

The `setlife.js` file enables convenience tools that generate React components based off the templates in `/web/templates` and `/api/templates`

- Run `npm install -g` to enable `setlife` CLI tools
- `setlife create-component <name>` creates a standard component in /web/components
- Add the option `--redux` or `-r` for Redux-enabled components with `mapStateToProps` and `mapDispatchToProps` functions connected to the component
- Add the option `--style` or `-s` to generate the corresponding stylesheet and add it to the index
---
- `setlife create-model <name>` creates a standard model in /api/models
- Add the option `--type` or `-t` to create the associated Bookshelf-GraphQL Type
