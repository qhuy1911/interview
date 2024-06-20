# SparkMinds Coding Challenge (Java - React)

## The case study: Affiliate marketing

Affiliate marketing is one of the key activities, when introduce a new product.
To tackle that challenge, SparkMindsJSC wants to provide an API, via which seller can support sell the new product and earn the rewards.

The software stores the data in a database and generates the links for seller. The seller can send this link to buyer. When buyer buy the product by this link, seller will receive the rewards.

## Product Requirements

- [ ] I want to provide a screen to let seller can create an account and login to the dashboard, the user information should contain:
  - [ ] email (unique)
  - [ ] name
  - [ ] password
  - [ ] refferal code (random string is generated from BE - unique for each user)
- [ ] for each seller link I want to provide
  - [ ] link
  - [ ] product_name
  - [ ] user_id
  - [ ] is_deleted
  - [ ] created_date
- [ ] A screen to show all link of current logged in user (should have a button to delete the link)
- [ ] A screen to let user create new link

## Your Mission

Create a Java backend application and a React frontend application that satisfies all must-have requirements above, plus any nice-to-have requirements you wish to include.

For that, you'll need to provide a REST-API, set up a database and generate a random refferal code, that unique for each user.

You can use any boilerplate/approach you prefer, but try to keep it simple. We encourage you to use your favorite tools and packages to build a solid web application.

You don't have to host your service publicly, but feel free to do that.
Please include a description in the README.md how to run the project locally and provide us a well done description for the API.

The final delivery must be running with Docker.

## Tech Requirements

- Use the LTS version of Java 17 and React 18

## Instructions

- Fork this repo
- The challenge is on!
- Build a performance, clean and well-structured solution
- Commit early and often. We want to be able to check your progress
- Please complete your working solution within 3 days of receiving this challenge, and be sure to notify us with a link to your repo, when it is ready for review.

**Happy coding!**

## API Description

| Method | Endpoint | Decription | body |
| --- | --- | --- |--- |
POST | /api/auth/signup | Create new account | {"email": "string","password": "string","name": "string"} |
POST | /api/auth/signin | Signin an account | {"email": "string","password": "string"} |
GET | /api/links/me | Get all logged in user's links | {} |
POST | /api/links | Create a new link | {"link": "string","product_name": "string"} |
PUT | /api/links/{id} | Delete a link by link ID | {} |

## How to run locally

### Backend
Create .env file and paste the below code into file:
```
PORT=8080

# db
DB_USERNAME="qhuy1911"
DB_PASSWORD="JaTwrpc316tjKqUH"

SECRET_KEY="oeGpYkdhbrOtAqMauS0lIfNgWS9PIzN9"
```

Open terminal and run command: 
```
npm install
npm start
```

### Frontend

Open another terminal and run command: 
```
npm install
npm start
```

If your backend run on the port difference 8080, in Frontend, open constants/index.js file and update to the current port.