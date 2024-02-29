
# Product Manager

  

![version](https://img.shields.io/badge/version-0.1.0-blue.svg) ![Static Badge](https://img.shields.io/badge/npm_version-10.2.4-blue) ![Static Badge](https://img.shields.io/badge/node_version-20.11.1-blue)

  

![](https://i.ibb.co/dW3fVF1/client.png)

## Table of Contents
  
- [Description](#description)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [File Structure](#file-structure)
- [Rationale for Code Structure](#rationale-for-code-structure)
- [Useful Links](#useful-links)
 

  
## Description

This online product list organizer is an application consisting of two distinct modules: the Administrator Module and the User Module. It is designed to facilitate product and category management by the administrator, while providing users with an intuitive and seamless experience for organizing products.

Administrator Module: Category Management: Allows the administrator to add, edit, and delete categories to efficiently organize products on the platform.

Product Management: Enables the administrator to add, edit, and delete products within established categories. Each product can have details such as name and description.

Drag and Drop Functionality: Products can be dragged between categories for easy reorganization, streamlining the product management process.

Editing and Deleting Products: The administrator can edit existing details or delete products as needed to keep the platform updated.

User Module: Favorites List: Users can add products to a favorites list to keep track of items they wish to consider for future purchases or find interesting in some way.

Product Exploration and Search: Users can browse different product categories and search for specific products by name to easily find what they are looking for.

Account Management: Users can register an account on the platform, allowing them to access features such as the favorites list and the history of added products.

This product list organizer provides a comprehensive experience for both the administrator and users, enabling efficient inventory management and a satisfying user experience for organizing their product lists in a practical and effective manner. However, it does not handle anything related to prices or purchases.
 

## Quick Start

Quick start steps:

- Clone the repo: `git clone https://github.com/Expitia/product-manager.git` or [Download from Github](https://codeload.github.com/Expitia/product-manager/zip/refs/heads/master).

- Install dependencies with `npm install` 

- Run on server mode with `npm run dev` 

If you want to run unit tests, use the command `npm run test`.

  

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result but you need to define the properties in the .env first [See Configuration](#configuration)

  

## Configuration

For the proper functioning of the application, we need to configure the environment variables in the .env file. The properties are:

-  `MONGO_DB_URI`: It is an environment variable commonly used in applications connecting to MongoDB databases. This variable typically holds the connection URL to the MongoDB database that the application will use to access and manipulate data stored in MongoDB. The connection URL may include information such as the username, password, server address, and port, as well as the specific database name to which the application will connect.

-  `AUTH_SECRET`: Is an environment variable used in conjunction with NextAuth, a popular authentication library in Next.js applications. It represents the secret key used for various authentication-related operations, such as encrypting tokens, verifying signatures, or generating secure hashes. This secret key should be kept confidential and securely managed to ensure the integrity and security of the authentication process.

-  `NEXTAUTH_URL`: is an environment variable commonly used with NextAuth, a popular authentication library for Next.js applications. This variable represents the URL of the application where the authentication flow will occur. It is essential for NextAuth to accurately determine the callback URLs and redirects during the authentication process. The value assigned to this variable should be the base URL of the deployed application. (default: "http://localhost:3000/")

-  `API_URL`: This environment variable is used to specify the base URL of an API endpoint in applications. It represents the URL where the application can access the API services. (default "http://localhost:3000/api"). 

- `NEXT_PUBLIC_API_URL`: This environment variable is specific to Next.js applications ("NEXT_") and is used to define the base URL of the public-facing API endpoint. It is similar to `API_URL` but specifically tailored for Next.js applications where the value assigned to this variable will be exposed to the client-side JavaScript bundle, (default "http://localhost:3000/api"). 
  

## File Structure

```

── src
├── app
│ ├── api
| │ └── ...
│ ├── libs
| │ └── ...
│ ├── global.css
│ ├── page.tsx
│ └── layout.tsx
├── components
│ └── ...
├── interfaces
│ └── ...
├── pages
│ └── ...
└── views
└── ...

```

- src: This is the root directory of the project.

- app: Contains files related to the application logic.

- api: This directory contains files that manage server API, every folder here is an API url.

- libs: This folder contains shared functions and configuration files used throughout the application, including the MongoDB class for database interactions and Redux configuration for state management.

- global.css: File for global styles that will be applied to the entire application.

- page.tsx: File that defines the root ("/") page.

- layout.tsx: File that defines the main layout of the application.

- components: Here are reusable components of the application, such as inputs, bars, etc.

- interfaces: Here are TypeScript interfaces that define the shape of the data used in the application.

- pages: Contains the pages of the application. Each file in this directory represents an accessible route in the application (server side).

- views: This directory may contain specific views of the application (Client Side), such as login screen, forms, etc.

  

This file structure was devised by the Next.js library.

  

## Rationale for Code Structure


  
Once I identified the problem to solve, I began selecting the appropriate tools. I chose MongoDB as the database management system due to its flexibility as a non-relational database. For authentication and session token management, I selected NextAuth, a highly flexible library enabling credential-based login through an API, along with session token management via a custom client-side hook and server-side API, simplifying route access based on session existence. Considering state management, I finally opted for Redux to handle the state, primarily with the RTK Query tool to streamline connections with the server and response handling.

With these tools in hand, I was ready to start the project. I contemplated using Sass or CSS modules for styling, but considering the requirements, I opted for pure CSS to align with the evaluation criteria. I also aimed to minimize dependencies, hence handling icons with ASCII codes instead of relying on libraries like FontAwesome.

To proceed with development, I began modularizing the logic into different components, some for shared or reusable use within the "components" folder, and others more focused on CRUD operations and forms within the "views" folder (See File Structure), all rendered on the client-side. Additionally, besides the base app, I created two server-side-rendered pages (login, register, and login error) as their logic differs from the rest of the app, solely managing user creation and login.

Although I would have liked to include additional features such as pricing and product checkout (like a shopping platform), I abstained due to time constraints imposed by the nature of the test.

In conclusion, this project leverages a streamlined approach to product management, emphasizing simplicity and efficiency. By selecting practical and agile tools, my aim was to deliver a solution that meets the requirements while maintaining a clear focus on user experience and code quality.


## Useful Links

https://nextjs.org/

https://next-auth.js.org/

https://www.mongodb.com/