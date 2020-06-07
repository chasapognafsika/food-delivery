# Summary

FoodDelivery is ecommerce application for food delivering. Application consists of following
parts:
1. <strong>Store Front – Angular based SPA</strong>
2. <strong>API Backend - Node.js, Express, MongoDb</em></strong>

The front-end of this project was generated with Angular CLI.
This project uses the <strong>MEAN</strong> stack:
* <strong>Mongoose.js (MongoDB)</strong>: database
* <strong>Express.js</strong>: backend framework
* <strong>Angular 9</strong>: frontend framework
* <strong>Node.js</strong>: runtime environment
* <strong>Angular CLI</strong>: project scaffolding

## Functionalities

1. Guest users can view all menu items when entering the website
2. Users can add/remove items to their shopping carts
3. Users can pay in 4 different currencies
4. Users can make orders and checkout
5. Users can update orders with delivery addresses
6. The merchant can view the incoming orders in a simple page

## Architectural Summary – Front

* <strong>Angular 9</strong> application (scaffolded with angular-cli)
* Built around <strong>RxJS</strong> Observables
* One way data flow and events based processing
* <strong>Immutable</strong> shopping cart to increase performance by enabling the <strong> On Push change
detention strategy</strong> that drastically reduces the change subtree Angular needs to process.

## Prerequisites

1. Latest version of <strong>Node</strong> to be installed (recommend NVM, easier to install and possible to
work with multiple node versions).
2. Install <strong>MongoDB</strong> and make sure it is running on default port 27017 (if not then please
configure constants.ts and change the connection for mongoDB).
3. Install <strong>Angular CLI: npm i angular-cli -g</strong>

## Installation 

1. Clone the repository: 
>>git clone https://github.com/chasapognafsika/food-delivery.git
2. Start local MongoDB instance (e.g. For OSX use command: mongod in terminal to start it)
3. Seed your mongodb with all your data from your /seeds folder.
Seed your mongodb with all your data from your /seeds folder.
* Go to folder food-delivery-client
>><strong>seed</strong>

### Start backend

* Go to folder food-delivery-api
* Install dependencies
>><strong>npm install</strong> <= install all the npm Dependencies
* Start backend
>>* <strong>npm run dev</strong> <= start the Nodemon and watch for changes.

### Start storefront

* Go to folder food-delivery-client
* Install dependencies
>><strong>npm install</strong>
* Buld storefront
>><strong>npm run build</strong>
* Start storefront
>><strong>npm run start</strong>
