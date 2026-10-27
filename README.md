# Library-Mangement-system

This is a library mangement API Backend for the  managegment of user and  the books

# Routes and the Endpoints

## /users

GET: Get all the list of users in the system
POST: Create/Register a new user 

# /user(id)

GET: Get a user by their ID 
PUT: Updating  a user by their ID 
DELETE : Deleting a user by their ID( Check if the still has an issued book ) && {is there any fine/penalty to be collected}

## /user/subscription-details{id}
GET : Get a user subscription deatils by their ID
>> Date of Subscription 
>> vaild till ?
>> fine if any?


## /books
GET: Get all the boks in the system
POST:Add a new book to the system

## /books/{id}
GET:Get a boks by its ID
PUT: Update a books by its ID
DELETE: DELETE a books by its ID

##  /books/issued 
GET: Get all issued books with their fine amount

## / boks /issued /withfine 
GET: Get all issued books with their fine amount

## Subscription Types 

>> Basic(3months)
>> Standared(6  months)
>> Premium (12 months)
  

  >> if a user missed the renewal date then user should be collected with $100
  >> if a user misses his Subscription ,then user is expected to pay $100
  >> if a user misses both renewal & and subscription , then the collected amount should be $200

  # Command 

  npm init
  npm i express
  npm i nodemon --save-dev
  