# Digital Risks - Fullstack Dev Coding Test

A simple interface where the user can submit:
- Their company number as registered with companies house
- Their name

Upon submission, the backend

- Gets the data from the Companies House API
- Decides whether we should provide insurance or not, e.g.
  - Checks that the person’s name matches a director of the company
  - Does the company have insolvency history
- If we should, send an email to Digital Risks notifying them of the application
- If we shouldn’t, show an error to the user

## Install

```
$ npm i && cd client && npm i && cd ..
```

## Build Frontend

Needs to be run prior to starting the dev server
```
$ npm run build:frontend
```

## Run Dev Server

```
$ npm start
```
(In order to run the app, you need to install dependencies and build the frontend first.)

## Architecture

The backend is a koa app, it serves the API and the static files needed for the frontend. The frontend was created with `create-react-app`. As koa-static does not support hot reloading, for development the create-react-app development server can be used with `npm run start:frontend`. Frontend and backend running on the same server may not be the best idea in production environment (e.g. scalability) but it works for us. A real life use case could be hosting the frontend on Amazon S3 and the backend running in AWS Lambdas, triggered by AWS API Gateway calls.  
The project has a Procfile so can easily be deployed on Heroku (I didn't do that though so it's not publicly exposed).

## Frontend

The frontend is a simple react app with a few stateless components, application state and logic residing in the Verdict component. There is a little bit of styling with Bulma.  
The app could use some less awkward state management with Redux or MobX but in the beginning it looked more simple and then I ran out of time.  
For security reasons the company data (and eligibility) is only retrieved if the person asking for the data is the director of the company matching the Companies House Number. All the company data may be public but the eligibility for insurance should not be accessible by just anyone I guess. Of course it is possible to look up both data on the Companies House website and use them here, so the name should come from a registration and the frontend should only be accessible by authorised users (and only with the name they registered with or something like that).

## Backend

The API has one endpoint: `GET /api/verdict?personName=...&companyNumber=...`, returning json data with `Content-type: application/json; charset=utf-8` header. 
Response status: 200 if everything went well, 400 if the server-side query parameter validation fails, 403 if the name given is not a director of the company and 500 or whatever comes back from the Companies House API if an error occurs on their end.  
Response format:
```
{
  error: "string",
  isEligible: "boolean",
  companyName: "string",
  companyNumber: "string",
  dateOfCreation: "string",
  directors: [ "string" ]
}
```
## TODO

- Currently all the logic (validate params, fetch data, construct response, check eligibility) resides in the `companyHouseApi.js` file. This should be refactored to multiple files. Possibly all server-related files should go into a separate `/server` folder.
- Write tests. I simply ran out of time. My priority was to develop something that works end to end rather than a beautiful implementation of only a smaller part of it. I can add a few tests later though.
- Implement some kind of fuzzy name matching when checking the directors of the company.
- Refine the algorithm that checks the eligibility. I just don't have the domain-specific knowledge for that (yet). Currently if no insolvency history or charges, the company can have insurance.
- Add Redux to the frontend. It looked simple enough not to, but in the end it has an awkward feeling without it.
- Implement the actual email sending. Depending on traffic, we shouldn't send emails directly from Node, rather put it in a message queue and another service handle the rest.

## Questions in the debrief
*What would you add to your solution if you had more time?*  
See TODO

*How did you design your risk score and why?*  
I didn't. It's a simple binary decision here. I don't know enough about the industry to make business decisions, especially not on such a tight schedule.

*How would you test this solution for performance in production?*
The main methods for testing performance are load testing and stress testing. Here both make sense as we have a long running server application with a few potential bottlenecks. So I'd do both to determine the KPI's and act accordingly.

*Please describe yourself using JSON.*  
```
{
  name: "Gabor Koos",
  nationality: ["HUN", "USA"],
  resume: "http://gaborkoos.com/assets/files/cv_gkoos.pdf",
  pets: {
    dog: {
      name: "Luna",
      breed: "golden retriever"
    }
  },
  previous_occupation: "basketball player",
  hobbies: ["basketball", "chess"]
}
```

## Final Remarks

The task was a lot of fun. However, this is mainly because it was very vaguely specified and honestly I have no idea how spot on my implementation is :) So either way, I'd appreciate some feedback on it, for the very least, out of curiosity.  
I spent significantly more time on this than 4 hours. After like 2 hours I didn't write a single line of code, just designed the architecture, set up the project, registered with the Companies House and was playing around with their API.