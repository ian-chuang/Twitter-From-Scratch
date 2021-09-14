# Twitter

Check out the demo here: https://ian-chuang.github.io/Twitter/

This is a clone of the social media app, Twitter, built completely from scratch with ReactJS, Redux, Firebase, and Material UI.

In the app, once you sign up and create an account, you can start posting messages and viewing other people's tweets.

### Main Features
- Send tweets
- View a timeline of peoples' tweets
- Reply to tweets
- Like and retweet tweets
- Follow other users
- Add your own profile picture and header background
- Add a bio
- Toggle light and dark mode
- Activity feed of what other users are doing
- Follow menu

### How to use

- To tweet either click the blue tweet button in the side navigation, or go to the top the home page and look at the top.
- To reply to a tweet click on any tweet you see. This will expand the tweet and give an option to reply below it.
- To like a tweet, click the heart icon below it.
- To view any user's profile page, click their avatar or name when you see it.
- To follow a user look at the follow menu on the right or profile page of a user for a follow button.
- To toggle light and dark themes, click the Toggle Theme button on the navigation.
- To edit your profile, go to your profile page and click the edit profile button.
- There's other features that you can try and explore!

### Pages

There are several pages within the app:
- /login
- /signup 
- /home (timeline of tweets from people you follow)
- /explore (timeline of all tweets from everyone)
- /profile/:username (your individual profile that everyone can see)
- /settings (your account information)
- /connect (list of users you can follow)
- /activity (list of activity that is happening)
- /tweet/:tweetid (view replies to a tweet)

### Layout

I designed the layout to be dynamic so that it adjusts content as you resize the page.

Since the UI of Twitter is organized by columns, I separated components by primary column and secondary column.

- The primary column is the central column that holds important information like timelines and profiles.
- The secondary is the column to the right that holds extra information like people to follow or an activity feed.

## To run on your own.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
