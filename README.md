# Backend Test NFI
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## REQUIREMENTS
- SQL Using Postgree SQL
- NODE V 16+
- NPM V 8.5+ or Yarn 1.22+

## CONFIGURATION
- Rename .env.example to .env and change the Environment variable to suit yours
- Run `npm run tsc` to build the project
- Run `node ./build/server.js` to run the project. By default this project will be runing in port 3030, but You can change in the .env file

# API
- ### List Users
  - `/api/users`
  - Request Body
    ``` There's no any param for this api ````
  - Response (Success)
    ``` 
    {
        "status": true,
        "message": "Data fetched successfully",
        "data": [
            {
                "id": 2,
                "name": "Daus",
                "email": "daus@mail.com",
                "balance": "1494.52",
                "transaction": [
                    {
                        "id": 1,
                        "type": "deposit",
                        "amount": "201.5"
                    },
                    {
                        "id": 2,
                        "type": "deposit",
                        "amount": "201.5"
                    },
                    {
                        "id": 3,
                        "type": "deposit",
                        "amount": "201.5"
                    },
                    {
                        "id": 4,
                        "type": "deposit",
                        "amount": "201.5"
                    },
                    {
                        "id": 5,
                        "type": "deposit",
                        "amount": "201.5"
                    },
                    {
                        "id": 6,
                        "type": "deposit",
                        "amount": "201.5"
                    },
                    {
                        "id": 7,
                        "type": "deposit",
                        "amount": "201.5"
                    },
                    {
                        "id": 8,
                        "type": "deposit",
                        "amount": "201.5"
                    },
                    {
                        "id": 9,
                        "type": "deposit",
                        "amount": "201.5"
                    },
                    {
                        "id": 10,
                        "type": "withdraw",
                        "amount": "40"
                    },
                    {
                        "id": 11,
                        "type": "withdraw",
                        "amount": "40"
                    },
                    {
                        "id": 12,
                        "type": "withdraw",
                        "amount": "40"
                    },
                    {
                        "id": 13,
                        "type": "withdraw",
                        "amount": "200.99"
                    },
                    {
                        "id": 14,
                        "type": "deposit",
                        "amount": "201.5"
                    },
                    {
                        "id": 15,
                        "type": "withdraw",
                        "amount": "200.99"
                    }
                ]
            },
            {
                "id": 15,
                "name": "Daus",
                "email": "daus2@mail.com",
                "balance": "0",
                "transaction": []
            },
            {
                "id": 1,
                "name": "test",
                "email": "test@mail.com",
                "balance": "0",
                "transaction": []
            }
        ]
    }
    ```
- ### Create Users
  - `/api/users`
  - Request Body 
    ``` 
    {
        "name" : "string", (required)
        "email" : "mail@mail.com" (required)
    }
    ````
  - Response (Success)
    ``` 
    {
        "status": true,
        "message": "User Created Successfully",
        "data": {
            "name": "Daus",
            "email": "daus12@mail.com",
            "id": 17,
            "balance": "0"
        }
    }
    ```
- ### Deposit
  - `/api/users/deposit/:userId`
  - Request Body
    ``` 
      {
          "amount" : 10 (required, minimum 1, can't be mines)
      }
    ```
  - Response (Success)
    ``` 
      {
          "status": true,
          "message": "Deposit Created Successfully",
          "data": {
              "id": 2,
              "name": "Daus",
              "email": "daus@mail.com",
              "balance": "1704.02"
          }
      }
    ```
- ### Withdraw
  - `/api/users/withdraw/:userId`
  - Request Body
    ``` 
      {
          "amount" : 2 (required, minimum 1, can't be mines)
      }
    ````
  - Response (Success)
    ``` 
      {
          "status": true,
          "message": "Withdraw Created Successfully",
          "data": {
              "id": 2,
              "name": "Daus",
              "email": "daus@mail.com",
              "balance": "1694.02"
          }
      }
    ```
   - Response (Failed, if amount withdraw is greater than user balance)
     ``` 
      {
          "status": false,
          "message": "Failed to withdraw",
          "data": "Not enough balance"
      }
     ```
