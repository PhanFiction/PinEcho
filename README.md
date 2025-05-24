# PinEcho
This projects allows users to create their profiles, share photos, as well as saving, commenting, and liking the photos.

## Feature

- Sign up and create a new account
- Log in and log out securely
- Create and edit user profile with avatar
- Like other users photos
- Comment on peoples shared photos

## Future plan

- [ ] Direct Messaging using websockets
- [ ] Tag/mention other users
- [ ] Notifications
- [ ] Sign in with OAuth
- [ ] Filter photos by category

## Technology

- Cloudinary API, 
- React, 
- ExpressJS, 
- MongoDB, 
- TailwindCSS

### Installation
1. Clone this repository
```
git clone git@github.com:PhanFiction/PinEcho.git
cd pinecho
```
2. In frontend directory
```
npm install
```
and create a .env file with process.env.NEXT_PUBLIC_API_URL set to your backend API

3. In backend directory
```
npm install
```
and create .env var for the following: 
  * MONGOD, 
  * MONGODB_TEST, 
  * CLOUD_NAME, 
  * CLOUD_API_KEY, 
  * CLOUD_API_SECRET,
  * SECRET_KEY,
  * PORT,
CLOUD is the api for cloudinary database to store images 
SECRET_KEY is used for signing json web token
PORT of any choice like 4200 or 8080

## Usage
In the backend directory
```
npm run dev
```
This should run the server on the port you configured

In the frontend directory
```
npm start
```
will open up the server on localhost:3000 and this will connect to the backend API

 
