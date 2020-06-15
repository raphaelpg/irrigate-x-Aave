Irrigate is a platform that gather NGOs and associatons with donors from around the world, using Ethereum blockchain and Aave protocol.  

NGOs and associations can submit a form to the app and be viewed in the main page after going through a validation process.  
Donors can register and see all the NGOs and associations available for donations.  

The project has been built during SOS Hackathon in June 2020.  
It's still a Proof of Concept, so security checks have to be performed.  
Also, all the informations contained such as NGO's name and description are used for the hackathon purpose only.   


## NGOs and associations interactions with the app  

A form has to be filed and validated to be visible on the app's main page.  
Below items have to be provided:  
* Name of the association  
* Short description  
* Category  
* Continent of activity location  
* Country of activity location  
* An ethereum address that will receive the donations  
* A logo that will be displayed on the main page  


## Donors interactions with the app  

Make sure you have Metamask on your browser, and active on Ropsten network.  

Donors can register providing an email and a password.  
Then they can login and start adding associations to their list by clicking on the "Add cause to your donation stream" button below each project.  
By clicking on the "Manage your stream" button, users can view their association's list.  
They can also make a one time donation by setting the amount and validate the transaction on Metamask.  

Attention:  
Donation to multiple projects is not implemented yet, only the first project in your list will receive the donation.  
The monthly donation is not implemented yet.  


## Aave protocol  

Aave protocol is used to earn interests.  
The Lending Pool, the DAI token and the aDai token contracts are the ones provided by Aave on Ropsten.  
Aave protocol addresses can be found [here](https://docs.aave.com/developers/deployed-contracts/deployed-contract-instances)  


### The strategy behind:    

#### The donations:  
The app works by batches of 15 days.
All the donations in DAI made by the donors are sent to a common address, then every 15 days all the DAIs are deposited to Aave Lending Pool.
The interests are redirected to a second address.
After 30 days, the exact deposited amount is redeemed back to the common address and the donations are transferred to the correct associations addresses.

#### The data:  
When a user makes a donation, the amount of the donation is added to the association account in a batch that saves all the donations performed during these 15 days. The batch is saved in a MongoDB database with the name form as YEAR_MONTH_A or B corresponding to each half of the month.  
For example June 2020 is divided in two batches: 2020_6_A (from 1st to 14th) and 2020_6_B (from 15th to 30th).   
After the interests period of time, the batch containing the donations record is retrieved and all the amounts are transferred to the associations.  

#### The interests:  
Every 1st day of the month, all the interests are redeemed and converted into DAIs.  
Then, the total amount of interests earned is compared to last month expenses of the app: gas cost of all the transactions + server cost.
After deduction of all the expenses, the remained amount of interest is transferred to the associations.  
This last step have not been finished to be developed yet. 


## Security  

This project is a prototype, it is not recommended to use it on the mainnet.  
No smart contracts are used, only web3 calls are performed on ropsten.  


## Built With

* [Aave Protocol](https://docs.aave.com/developers/) - Aave is a decentralized non-custodial money market protocol where users can participate as depositors or borrowers.  
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - MongoDB Atlas is the global cloud database service for modern applications.  
* [Node.js](https://nodejs.org/en/docs/) - Node.js is designed to build scalable network applications - v10.16.3  
* [Express](https://expressjs.com/en/4x/api.html) - Fast, unopinionated, minimalist web framework for Node.js - v4.16.4  
* [web3js](https://web3js.readthedocs.io/en/v1.2.1/web3.html) - Used to interact with Ethereum blockchain and smart contracts - v1.2.1  
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces - v16.12.0  
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - ECMAScript 2018 - v9  


## Authors

* **Raphael Pinto Gregorio** - https://github.com/raphaelpg/
