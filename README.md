# Krew Tech Interview

## Pre-requisites

- Knowledge of Vue SFCs, Node.js, Express.js, MongoDB
- Node LTS or higher installed
- NPM v7 or higher installed

## Setup

- Fork this repo
- Clone it locally
- Install dependencies with `npm install`
- Run `npm start` to run the server with nodemon (it will restart automatically when it detects changes)
- Run `npm run build` to compile, or `npm run watch` to compile automatically on changes

## Tasks

### 1 — Reminder cards

The mockup designs for Reminder cards are delayed, but we need to release an MVP soon. Style the Reminder cards to give them a more modern and consistent look.

### 2 — Card customisation

Customers have repeatedly requested the ability to assign a color to a reminder card. Modify the app such that colours can be added to Reminders on creation, and are reflected in the design of the reminder cards.

### 3 — Repeating reminders

A high-value client relies on the ability to create reminders that repeat daily a fixed number of times. How do we extend our schema to allow for this? Is this future-proof against infinite repetitions? What should we prioritise? What implications does this have towards the `"/reminder/get-range"` endpoint?

### 4 — Deleting reminders

Another customer insists on the ability to delete individual reminders in the middle of a repeating series. How would you implement this, and what future problems could these implementation decisions pose? What should we prioritise?

### 5 — Bus factor

Another developer was just hit by a bus. This developer was working on a branch called `feat-voice-recorder` which is meant to allow adding voice recordings to reminders. Switch to branch and bring it up to date with `main`. This developer already did some front-end work, but hasn't completed the feature, and you have been tasked with completing it, and creating a pull request to `main`. What architectural implications do your decisions here have?


Good luck!
