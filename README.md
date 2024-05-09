# Psych-Dissertation-Matching

# Contributors

This is a CS496 capstone project at Loyola University Maryland.<br />
Students working on the project: Christoph Koch-Paiz, Oliver Koch-Paiz<br />
Client: Traci Martino<br />

# Project Description

Our client Traci Martino works in the Department of Psychology and every year she is responsible for matching doctoral students with a dissertation chair (faculty member). The dissertation chair acts as a major reader/advisor for the student and usually works with 1 or 2 students for their dissertations. Each year the students will meet with up to 8 different faculty members in a process similar to speed dating. Both the students and faculty members rank each other (from most want to work with to least). Essentially, this software allows students and faculty members to rank each other, and generates the matches based on these rankings using the Gale-Shapley algorithm.

# User Manual
[User Manual](UserManual.md)

# Installation Instructions

Download: https://code.visualstudio.com/

- Create a new project
- Clone the repo

Download MySQL + Workbench: https://www.mysql.com/downloads/

- Create a new schema
- Configure your database (username/password/etc.) to match fields in ./server/config/config.json

Download: https://nodejs.org/en/download

- Verify your download by opening terminal and writing

```
node -v
npm -v
```
- If you can see the current version for node + npm, you have successfully installed node

<h3>Install Dependencies:</h3>

- Change to the client directory by pasting the following code into the project's terminal

```cd ./client```
- Once you are in the client directory, paste the following code into the project's terminal

```npm install```
- Now you must change to the server directory by pasting the following code into the project's terminal

```cd ../server``` 
- Once you are in the server directory, paste the following code into the project's terminal

```npm install```
- You have successfully installed the dependencies

# How to Run
- From the client directory paste the following code into the project's terminal

```npm start```
- From the server directory, paste the following code into the project's terminal

```npm start```
- You will automatically be redirected to "http://localhost:3000"
- If for any reason you are not redirected, simply open your browser and visit "http://localhost:3000"


# How to Test

- Change to the client directory by pasting the following code into the project's terminal

```cd ./client```
- Once you are in the client directory, paste the following code into the project's terminal

```npm test```
- You have successfully ran the test's for the client

- Change to the server directory by pasting the following code into the project's terminal

```cd ../server```
- Once you are in the server directory, paste the following code into the project's terminal

```npm test```
- You have successfully ran the test's for the server
