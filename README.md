# India Got Latent

![India Got Latent Logo](https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png)

India Got Latent is a revolutionary talent show platform hosted by renowned comedian Samay Raina. This web application serves as the digital backbone for managing the show's operations, participant registrations, event bookings, and our unique scoring system.

## Table of Contents

- [About the Show](#about-the-show)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contact](#contact)

## About the Show

India Got Latent is not your typical talent show. We celebrate the small, unique talents that often go unnoticed but have the potential to create social media sensations. From peculiar skills to unconventional abilities, we provide a platform for participants to showcase their latent talents and potentially kickstart their journey to fame.

## Features

- **Unique Talent Showcase**: Participants can register and showcase any small or unique talent that could boost their social media presence.
- **Self-Scoring System**: In a twist to traditional judging, participants score their own performances.
- **Multiple Judge Scoring**: A panel of celebrity judges evaluates each performance.
- **Innovative Winning Mechanism**: Winners are determined by matching the average of judges' scores with the participant's self-score.
- **Crowdfunded Prize Pool**: The total prize is accumulated from viewers' ticket purchases, creating a truly audience-driven reward system.
- **User Authentication**: Secure signup and login system with email verification.
- **Comprehensive Participant Management**: Register, view, update, and manage participant information.
- **Dynamic Event Management**: Create, view, update, and delete event information.
- **Streamlined Ticket Booking System**: Allow users to easily book tickets for events.
- **Collaborator and Sponsor Management**: Register and manage show collaborators and sponsors.

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer
- **File Upload**: Multer
- **Frontend**: React.js with Next.js framework
- **State Management**: Redux with Redux Toolkit
- **Styling**: Tailwind CSS
- **API Documentation**: Swagger UI
- **Testing**: Jest for unit tests, Cypress for E2E tests
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel

## Architecture

Our application follows a microservices architecture, with separate services for user management, event management, booking system, and scoring system. This ensures scalability and easier maintenance.

## Database Schema

### User
- `_id`: ObjectId
- `name`: String
- `email`: String
- `password`: String (hashed)
- `isVerified`: Boolean
- `role`: String (enum: ['admin', 'participant', 'judge', 'viewer'])

### Participant
- `_id`: ObjectId
- `userId`: ObjectId (reference to User)
- `firstName`: String
- `lastName`: String
- `phoneNumber`: String
- `sex`: String
- `instaId`: String
- `photo`: String (file path)
- `talentCategory`: String
- `otherTalent`: String
- `crazyThing`: String
- `embarrassingMoment`: String
- `lifeTrauma`: String
- `watchedPreviousEpisodes`: Boolean
- `whyAttending`: String
- `personalityScore`: Number
- `status`: String (enum: ['pending', 'approved', 'rejected'])

### Event
- `_id`: ObjectId
- `name`: String
- `date`: Date
- `place`: String
- `specialGuest`: String
- `description`: String
- `price`: Number
- `image`: String (file path)
- `totalTickets`: Number
- `availableTickets`: Number

### Booking
- `_id`: ObjectId
- `eventId`: ObjectId (reference to Event)
- `userId`: ObjectId (reference to User)
- `numberOfTickets`: Number
- `totalPrice`: Number
- `status`: String (enum: ['pending', 'confirmed', 'cancelled'])

### Collaborator
- `_id`: ObjectId
- `userId`: ObjectId (reference to User)
- `role`: String
- `brandName`: String
- `priceOffering`: String
- `viewedPreviousEpisodes`: Boolean
- `aboutYourself`: String
- `status`: String (enum: ['pending', 'approved', 'rejected'])

### Performance
- `_id`: ObjectId
- `participantId`: ObjectId (reference to Participant)
- `eventId`: ObjectId (reference to Event)
- `selfScore`: Number
- `judgeScores`: [{judgeId: ObjectId, score: Number}]
- `averageScore`: Number
- `status`: String (enum: ['pending', 'completed'])

## API Endpoints

### Authentication
- POST /api/auth/signup
- POST /api/auth/verify-email
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh-token

### Users
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

### Participants
- POST /api/participants
- GET /api/participants
- GET /api/participants/:id
- PUT /api/participants/:id
- DELETE /api/participants/:id

### Events
- POST /api/events
- GET /api/events
- GET /api/events/:id
- PUT /api/events/:id
- DELETE /api/events/:id

### Bookings
- POST /api/bookings
- GET /api/bookings
- GET /api/bookings/:id
- PUT /api/bookings/:id
- DELETE /api/bookings/:id

### Collaborators
- POST /api/collaborators
- GET /api/collaborators
- GET /api/collaborators/:id
- PUT /api/collaborators/:id
- DELETE /api/collaborators/:id

### Performances
- POST /api/performances
- GET /api/performances
- GET /api/performances/:id
- PUT /api/performances/:id
- DELETE /api/performances/:id

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Yashmittal4/india-got-latent.git
   ```
2. Navigate to the project directory:
   ```
   cd india-got-latent
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Then, fill in the necessary environment variables in the `.env` file.

5. Start the development server:
   ```
   npm run dev
   ```

## Usage

Visit `http://localhost:5173` in your browser to access the application.

## Development

We use GitHub Flow for our development process. Please create a feature branch and submit a pull request for any new features or bug fixes.

## Testing

Run unit tests:
```
npm run test
```

Run E2E tests:
```
npm run test:e2e
```

## Deployment

We use Vercel for deployment. The main branch is automatically deployed to our production environment.

## Contact

For any queries, please reach out to us at yashmittal4949@gmail.com

---

Made with ❤️ enjoy , laugh and coding..
