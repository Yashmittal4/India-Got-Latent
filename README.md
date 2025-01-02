# India Got Latent

![India Got Latent Logo](https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png)

India Got Latent is a unique talent show platform hosted by comedian Samay Raina. This web application manages the show's operations, participant registrations, event bookings, and scoring system.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Unique Talent Showcase**: Participants can showcase any small or unique talent that could boost their social media presence.
- **Self-Scoring System**: Participants score themselves, adding a unique twist to the traditional judging process.
- **Multiple Judge Scoring**: Various big-name judges score participants based on their performances.
- **Winning Mechanism**: Winners are determined by matching the average of judges' scores with the participant's self-score.
- **Prize Pool**: Winners receive the total prize pool collected from viewers' ticket purchases.
- **User Authentication**: Secure signup and login system with email verification.
- **Participant Management**: Register, view, update, and delete participant information.
- **Event Management**: Create, view, update, and delete event information.
- **Ticket Booking System**: Allow users to book tickets for events.
- **Collaborator Management**: Register and manage show collaborators and sponsors.

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer
- **File Upload**: Multer
- **Frontend**: (To be added - e.g., React, Vue, or Angular)

## Database Schema

### User
- name: String
- email: String
- password: String (hashed)
- isVerified: Boolean

### Participant
- firstName: String
- lastName: String
- phoneNumber: String
- sex: String
- email: String
- instaId: String
- photo: String (file path)
- talentCategory: String
- otherTalent: String
- crazyThing: String
- embarrassingMoment: String
- lifeTrauma: String
- watchedPreviousEpisodes: Boolean
- whyAttending: String
- personalityScore: Number
- status: String

### Event
- name: String
- date: Date
- place: String
- specialGuest: String
- description: String
- price: Number
- image: String (file path)
- totalTickets: Number
- availableTickets: Number

### Booking
- eventId: ObjectId (reference to Event)
- name: String
- email: String
- phoneNumber: String
- numberOfTickets: Number
- totalPrice: Number
- status: String

### Collaborator
- role: String
- name: String
- phoneNumber: String
- email: String
- instaId: String
- aboutYourself: String
- viewedPreviousEpisodes: Boolean
- brandName: String
- priceOffering: String
- status: String

## API Endpoints

### Authentication
- POST /api/auth/signup
- POST /api/auth/verify-otp
- POST /api/auth/login

### Participants
- POST /api/participants
- GET /api/participants
- PUT /api/participants/:id
- DELETE /api/participants/:id

### Events
- POST /api/events
- GET /api/events
- PUT /api/events/:id
- DELETE /api/events/:id

### Bookings
- POST /api/bookings
- GET /api/bookings

### Collaborators
- POST /api/collaborators
- GET /api/collaborators
- PUT /api/collaborators/:id
- DELETE /api/collaborators/:id

## Installation

1. Clone the repository:

