# REACT-OTP-MERN-APP

This a example of React OTP MERN app which including firebase otp services where user can add mobile number and siginin initially. 

# Oprations 
Build a full stack sign-up and login (sign-in) module for successful ecommerce 
● Login would be via OTP 
● We don’t need to build a OTP engine, please use any free OTP APIs or google firebase APIs 
● Functionally is more important than fancy UI, we suggest you don’t spend time in making the UI beautiful 
● Backend developers who aren’t comfortable with frontend stack, can skip the frontend and work only on APIs and send across APIs (postman collection preferred) ● Below is the flow for first time (sign-up) and login flow (sign-in) 
First time (sign-up) flow 
● Show an option to accept mobile number 
● On submit send OTP 
● Show enter OTP screen, validate the OTP 
● On success, show accept details to accept basic information like name and email ● On submit, save the details in DB via API 
● On success, show success message and done 
Login (sign-in) flow 
● Show an option to accept mobile number 
● On submit send OTP 
● Show enter OTP screen, validate the OTP 
● On success, check user is a registered user via API 
● If not registered, show a message to sign-up and done 
● If registered, show a success message and done. 

# How to start 
clone the repo
you will get client and backend folder 
client = frontend includes react and firebase which is created by CRA (create-react-app)
backend = includes express node and mongo connection mongo model file (scheme file for db design)

Go to client folder `yarn install` `yarn start` client will run 3000 PORT
Go to backend folder `yarn install` `nodemon index.js` will start server on 5000 PORT

install mongo on local first. 
make sure your mongo service running in background 
to start mongo `sudo mongod --dbpath /System/Volumes/Data/data/db`

#Development approch

1. Client first screen will be form with mobile number input field 
2. Mobile number validation is added on submit button 
3. Mobile validation regex set as per indian mobile number standard 
4. after submitting OTP screen appear 
5. firebase OTP service called with reCaptcha
6. Once reCaptcha resovled OTP sent to entered mobile number
7. after validation OTP its redirect to user details screen
8. User detail screen user can add name and email id 
9. name and email also validate as per standard
10. once form submitted data will pused to DB
11. if mobile number is already registered form will be auto filled up with fetch db data 

for DB access use https://docs.mongodb.com/compass/master/install

#with Docker

go to client folder 
`yarn install`
`docker build -t 'client' ./`

go to backend folder 
`yarn install`
`docker build -t 'backend' ./`

this will create 2 images
client and backend-server

go to root cd ../

`docker-compose up`

Cheers!