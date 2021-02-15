# Oracle-Connection-SmartContract
Application to sign a transaction using an express server and the conection with Remix, MetaMask and Ganache

To execute the applications, follow the next steps:
    a- Deploy the contract Stock.sol in Remix (for the validation setup the environment in Web3 Provider)
    b- In the file index.js:
    
        1- Change the address of your contract in line 6
        2- Change the ABI of your contract in line 9
        3- Validate the port with Ganache in line 83
        4- Change the account in line 89
        5- Change the private key in line 91
    c- Execute npm install
    d- Execute npm start
    e- Validate that the server is deployed in http://localhost:8000
    f- When you deploy express server, check in Ganache your new signed transaction and the change of gas in Metamask
