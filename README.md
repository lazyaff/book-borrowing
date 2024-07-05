# Book Borrowing API

## Project Description

The Book Borrowing API is a backend application designed to manage the borrowing and returning of books in a library system. Built using Express.js and MongoDB, this API provides endpoints to borrow books, return books, and check the availability of books. It also includes detailed API documentation accessible via Swagger UI to help developers understand and interact with the API effectively.

### Features

-   **Borrow Books :** Users can borrow books from the library by providing necessary details like member code and book code.
-   **Return Books :** Users can return borrowed books, updating the system to make them available again.
-   **Check Availability :** Users can check which books are currently available in the library.
-   **API Documentation :** Comprehensive API documentation is provided using Swagger UI, detailing each endpoint and how to use it.

### Technology Stack

-   **Express.js :** A fast and minimalist web framework for Node.js, used to build the RESTful API.
-   **MongoDB :** A NoSQL database, chosen for its flexibility and scalability in handling large volumes of data.
-   **Swagger UI :** A tool for generating interactive API documentation, making it easier for developers to understand and use the API.

## Instalation

To install the project, run the following command:

1. **Install the dependencies**

    ```bash
    npm install
    ```

2. **Create a env file**

    Create a .env file in the root directory and or rename the .env.example file to .env and fill in the necessary details.

    ```bash
     PORT =
     MONGO_URL =
    ```

3. **Prepare the database**

    Create a MongoDB database and create the "books" and "members" collections. Then import the "book-borrowing.books.json" and "book-borrowing.members.json" files in db folder into the "books" and "members" collections.

4. **Start the server**

    ```bash
    npm run dev
    ```

## Documentation

Access the documentation using the docs route in the server. For example, if the server is running on port 3000, access the documentation at http://localhost:3000/docs.
