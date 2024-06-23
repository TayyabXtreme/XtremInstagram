# Instagram Clone

This project is an Instagram clone built with React, Firebase, Chakra UI, and Zustand for state management. It includes features such as search, create post, delete post, edit profile, authentication, realtime chat, and responsive design.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Usage](#usage)
5. [State Management with Zustand](#state-management-with-zustand)
6. [Contributing](#contributing)

## Features

- **Authentication**: Sign up and log in using Firebase Authentication.
- **Create Post**: Upload images and captions to create new posts.
- **Delete Post**: Remove posts from your profile.
- **Edit Profile**: Update your profile information.
- **Search**: Find users and posts.
- **Realtime Chat**: Communicate with other users in realtime.
- **Responsive Design**: Optimized for various screen sizes.

## Installation

To get started with this project, follow the steps below:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/TayyabXtreme/XtremInstagram.git
    
    cd XtremInstagram
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up Firebase:**

    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Add a web app to your project.
    

        ```bash
        REACT_APP_FIREBASE_API_KEY=your_api_key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
        REACT_APP_FIREBASE_PROJECT_ID=your_project_id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        REACT_APP_FIREBASE_APP_ID=your_app_id
        ```

4. **Start the development server:**

    ```bash
    npm run start
    ```



## Usage

### Authentication

The authentication module uses Firebase Authentication. Users can sign up, log in, and log out. Authentication state is managed with Zustand.

### Creating Posts

Users can create new posts by uploading images and adding captions. Posts are stored in Firebase Firestore and images in Firebase Storage.

### Deleting Posts

Users can delete their own posts. The delete operation removes the post from Firebase Firestore and the image from Firebase Storage.

### Editing Profile

Users can update their profile information, including their username and profile picture. The profile data is stored in Firebase Firestore.

### Search

Users can search for other users and posts. The search functionality is implemented using Firestore queries.

## State Management with Zustand

Zustand is a small, fast, and scalable bearbones state management solution. It provides a minimalistic API but is powerful enough to manage complex states. In this project, Zustand is used for managing the authentication state and post state.

### Setting Up Zustand

Zustand stores are created using the `create` function. Below is an example of how Zustand is set up in this project:


### Realtime Chat

The chat feature allows users to communicate in realtime. It uses Firebase Firestore for storing and retrieving chat messages.

### Responsive Design

The application is designed to be responsive, providing an optimal user experience on both desktop and mobile devices. Chakra UI is used for styling and layout.



## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.


