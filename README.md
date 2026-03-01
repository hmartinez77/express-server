Names: Henrry Martinez

# Express Server (Node.js)

## Overview

This project is an Express.js version of a previously built custom HTTP server.

It implements a session-based number guessing game using Express middleware and routing.

## Features

- Express routing
- Session management
- Number guessing game logic
- Input validation
- Dynamic rendering with Handlebars

## How It Works

- The server generates a random number.
- The value is stored inside the user session.
- The user submits guesses.
- The application tracks attempts.
- It validates invalid input.
- The UI displays feedback dynamically.

## Installation

```bash
npm install
npm start
