# FDM Pathways

A MERN stack website for FDM that aims to make their existing website more engaging. The application features registration and sign-in functionality, along with three games tailored to FDM's available streams. Based on the user's scores, the application suggests a suitable stream.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Screenshots](#screenshots)
4. [Contributing](#contributing)
5. [License](#license)

## Installation

Follow these steps to install and set up the FDM Pathways project:

1. **Clone the repository**

        git clone https://github.com/aldojack/FDM-Pathways.git

2. **Navigate to the frontend project folder**

        cd FDM-Pathways/frontend

3. **Install dependencies**

        npm install

4. **Repeat steps 2 and 3 for the backend project folder**
        cd ..

        cd backend

        npm install


5. **Set up environment and environment variables**

        Within the backend folder, create a `.env` file with the following variables:

        MONGODB_USERNAME=[username]

        MONGODB_PWD=[password]

6. **Start the development server**

        Navigate back to the frontend folder:

        cd ..
        
        cd frontend

        Run `npm run dev` to start both front-end and back-end servers:

        npm run dev

        
## Usage

After setting up the project, visit `http://localhost:5173` in your browser to access the FDM Pathways application. Users can register, sign in, and play the games tailored to FDM's available streams. The application will suggest a stream based on the user's scores.

## Screenshots (Optional)

Include screenshots or GIFs that demonstrate the functionality of your project. Use the following syntax to embed images:

![Image showing that server is successfully running](/assets/homepage.png "Home Page")


## Contributing

If you're interested in contributing to the FDM Pathways project, follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License

This project is licensed under the [MIT License](LICENSE.md).





