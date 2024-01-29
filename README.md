# Apollo-federation-workspace
This project demonstrates the use of the supergraphSdl method.
## Init the project
### Install node_modules
```bash
npm install
```
### Init all sub-services
```bash
npm run start:book
npm run start:car
npm run start:people
```
### Generate the supergraph
```bash
npm run generate:supergraph
```
### Start the supergraph
```bash
npm run start:gateway
```
### Visit all graphql
Visit the url http://127.0.0.1:4000

### Start to do the test
Here are a few suggestions:
```
Feature: A federation project impelemented with the supergraphSdl option
	Scenario: Add a new sub-service.
		When All existing services are runing.
		Given A new sub-service is deployed and the new sub-service is failed health checks
		Then All existing services are still runing.
		Given The new sub-service deployed with a health status.
		Then All services are runing, including the new sub-service.
		Given Updating the supergraph.yaml file to add the new sub-service.
		Then All existing services are still runing.
		Given Excuting the generate supergraphSdl script.
		Then The supergraph.graphql file has updated.
		Then The new sub-service can be visited via the gateway.
	Scenario: All services need to restart for some reasons.
		When All services are down.
		Given Starting the gateway service at first.
		Then The gateway service can be visited.
		Then All sub-services cannot be visited.
		Given Starting all sub-services.
		Then The new sub-service can be visited via the gateway.
```
