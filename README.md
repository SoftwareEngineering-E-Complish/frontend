## Setting Up the Frontend Service

To set up the frontend service of this project, follow these steps:

1. **Install Dependencies**: Before starting the service, you need to install the necessary dependencies. Open your terminal, navigate to the project's frontend directory, and run the following command:

    ```bash
    npm install
    ```

    This command installs all the required packages defined in the `package.json` file.

2. **Start the Development Server**: After installing the dependencies, you can start the development server by running:

    ```bash
    npm run dev
    ```

    This will start the development server, usually accessible at `http://localhost:3000`. You can now access the frontend service in your web browser.

3. **Run the Frontend as a Container**:

    To run the frontend service inside a Docker container, follow these steps:

    - **Build the Docker Image**: Create a Docker image for the frontend using the following command:

        ```bash
        docker build . -t frontend:latest
        ```

    - **Run the Docker Container**: Start the container from the built image:

        ```bash
        docker run -p 8080:80 frontend:latest
        ```

    This will expose the frontend service at `http://localhost:8080`.

