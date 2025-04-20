# WishWell
`WishWell` is a `BirthDay` congratulatory email handling system. The aim of this project is to help business in showing that theycare about their customers by sending them a birthday congratulatory mail as early as 07:00 on their birthday.

This project is built as part of `AltSchool(Karatu) 2024` Backend NodeJS practical assignments.

## How It Works

`WishWell` accept `username` `email` and `DOB` of the customer only. Wishwell is powered by a cron job which run at exactly 07:00 everyday. It checks for all customers who have birthday that same day and add their details to a `queue`

The `Queue` is adopted in case there is high number of customers that have birthday on a certain day, queing the mail make it effective and make sure that all customers gets their message irrespective of server load.


## Usage
1. open your terminal and navigate to prefered folder

2. Clone `WishWell` using `git clone https://github.com/CuriousHack/WishWell.git`

3. execute `cd wishwell` in the terminal
4. Navigate to the `backend` folder using `cd backend`
4. press `npm install` to install all dependencies
5. `cp .env.example .env` copy the content of .env.example into .env and update the values
6. run `npm run start` to run node instance.
7. Enjoy using `WishWell` to serve your `customers`