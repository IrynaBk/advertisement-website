# Advertisement Website

Welcome to the Advertisement Website—a platform for posting and browsing advertisements. Designed with a responsive interface and backend functionality, my platform offers a seamless experience for users wanting to advertise or browse listings.

![Main Screenshot](https://github.com/IrynaBk/advertisement-website/assets/90105651/b2f2ea5d-cf6c-491b-bf7b-0f5b0c114121)

## Features

### User Management
- **Sign up, add a profile picture, and reset your password with ease.**
- **Profile Picture**: Users can add a profile picture during registration or have a default one.  
    ![Profile Screenshot](https://github.com/IrynaBk/advertisement-website/assets/90105651/e1f7f5c7-9cea-46a3-aeeb-16733b1a08a4)
 - **Password Reset**: Never worry about forgotten passwords. Reset it through your email.  

### Advertisements
- **Post, view, and filter advertisements with simple navigation.**
- **Post & Browse**: List your item or service and browse through diverse listings.  
- **Filter Listings**: Find what you're looking for with location and category filters.

https://github.com/IrynaBk/advertisement-website/assets/90105651/b4f47281-b7f2-4850-82aa-960b676d9001


### Real-time Chat
- **Connect with other users instantly through our 1-to-1 chat feature.**
 - **Instant Messaging**: Communicate in real time with other users.  

https://github.com/IrynaBk/advertisement-website/assets/90105651/d5830b8d-dafc-41d8-81b5-690d5a01e462


## Technical Specifications

- **Framework**: Ruby on Rails
- **Frontend**: React.js
- **Database**: PostgreSQL
- **Image Storage**: Active Storage(amazon s3 bucket)
- **Real-time Messaging**: Action Cable & Redis

## Setup & Installation

Follow these steps to get the project running on your local machine:

   ```bash
   git clone https://github.com/IrynaBk/advertisement-website.git
   cd advertisement-website
   docker-compose -f docker-compose.yml up --build 
   docker-compose run backend rails db:migrate
   docker-compose up

