
# Image Searcher Project

This project is an **Image Searcher** built using **Vue.js** and interacts with the [Unsplash API](https://unsplash.com).

## Setup and Installation

To get started with this project, follow these steps:

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Chriswolve/unsplash-search
```

### 2. Install dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Set up environment variables

The project requires an API key from Unsplash. Create an account on [Unsplash](https://unsplash.com) and obtain your API key.

In the project root directory, there is an `.env.example` file. Copy this file and create a new file called `.env`:

```bash
cp .env.example .env
```

Now, open the `.env` file and add your **Unsplash API key** like this:

```
VUE_APP_UNSPLASH_API_KEY=your-api-key
```

### 4. Run the development server

After configuring the environment variables, run the following command to start the development server:

```bash
npm run serve
```

The application will be available at `http://localhost:8080`.


## Project Structure

- **src**: The source code of the application.
- **.env.example**: Example of the environment configuration.
- **public**: Static assets such as images and the `index.html` file.

## Libraries and Tools

This project uses the following libraries and tools:

- **Vue.js**: A progressive JavaScript framework.
- **Unsplash API**: Provides access to a vast collection of free-to-use images.
- **Axios**: A promise-based HTTP client for making API requests.

## License

This project is licensed under the [MIT License](LICENSE).
