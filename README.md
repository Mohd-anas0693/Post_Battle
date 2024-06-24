# PostBattle

## Overview

PostBattle is a social media application where time is the essence. Each post starts with a 5-minute lifespan, and the time can be extended or shortened based on user interactions. An up-vote adds one minute to the post's lifespan, while a down-vote reduces it by one minute. Once the time runs out, the post becomes inactive, meaning no more up-votes, down-votes, or comments can be added.

## Features

- **Time-Limited Posts:** Posts have a dynamic lifespan based on community interaction.
- **Up-votes and Down-votes:** Influence the remaining time of a post.
- **Post Inactivity:** Posts become locked once their time runs out, preventing further interaction.

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) (version 6 or higher)

### Steps to Run the Application

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/PostBattle.git
   cd PostBattle

   ```

2. **Install the dependency:**

   ```bash
   npm install
   npm install --save-dev

   ```

3. **Setup Environment Variables:**

   - copy the .env.sample file to .env

   ```bash
   cp .env.sample .env
   ```

   - Edit the .env file to include your specific configuration settings.

4. **Run Application:**
   ```bash
   npm run dev
   ```

### Enviornment variables

Ensure your .env file is set up correctly. The .env.sample file provides a template for the required environment variables. Adjust these variables to suit your local setup.

Example .env file:

```env
PORT = 8000
MONGODB_URI = mongodb://localhost:27017/
DB_NAME = PostBattle
ACCESS_TOKEN_KEY = "asansnsndf"
REFRESH_TOKEN_KEY = "HEJJDJDH"
ACCESS_TOKEN_EXPIRE = 1d
REFRESH_TOKEN_EXPIRE = 10d


CLOUDINARY_CLOUD_NAME =  'Enter_Name'
CLOUDINARY_API_KEY = 'Enter_Key'
CLOUDINARY_API_SECRET = 'Enter_Secret'

```

### Script

- "npm run dev": Starts the development server with hot reloading enabled.

### Contributions

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the coding standards and include relevant tests.

### Model Architecture

For a detailed overview of the PostBattle model architecture, please refer to [Model Documentation](https://app.eraser.io/workspace/0qgAyQ8VgH2LFuNECX1d?origin=share).

### Contact

For any questions or feedback , plese open issue on github repository.
