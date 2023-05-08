# Walle Bot
It's a bot for loocking vacancies

## How to start 
### Clone the repository
``` 
git clone git@github.com:Alianshark/WalleTheBot.git
cd WalleTheBot
```

### Create `.env` file to set your pass

```
touch .env 
```

### Add to .env file your djinni email and password

Example of .env file:

``` 
export email='your_email@gmail.com'
export password='your_pass'
export linkedin='https://www.linkedin.com/in/your-profile/'
```

> create account on [Djinni.co](Djinni.co) manualy

### Run the bot

```
source .env
npm install
npm start
```

After this the chrome-browser will run.

This comand will run from brouser and serch for vacansies.