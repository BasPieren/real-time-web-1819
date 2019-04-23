# Real-Time Web @cmda-minor-web · 2018-2019 ⚙️

This is my repo for the Real-Time Web course

![Real Time Web Screenshot](https://i.imgur.com/t95Kias.png)
> Learn HTML Together chat app

## Table of Contents 🗃
* [To Do](#to-do-)
* [Description](#description-)
* [Installing](#installing-)
  * [Packages and Technologies](#packages-and-technologies)
* [API](#api)
  * [Authentication](#authentication)
  * [Rate Limit](#rate-limit)
* [Research](#research-)
  * [Skecth](#skecth)
  * [Data Life Cycle](#data-life-cycle)
* [How It Works](#how-it-works-️)
* [Sources](#sources-)
  * [Honourable Mentions](#honourable-mentions)
* [Licence](#licence-)

## To Do 📌
This is a list of things I want to do in this project:

- [ ] Deal with real-time complexity
- [ ] Handle real-time client-server interaction
- [ ] Handle real-time data management
- [ ] Handle multi-user support

## Description 📝
For this course I made a web application that allows users to learn HTML together by using a build in text editor and chat. Users can write and discuss the HTML directly from their browser. Users are also able, by using the Github API, to create, commit and push to a Github repo. In the browser users are also able to see the number of commits, issues and stars the repo has. This will be the real time data.

## Installing 🔍
To install this application enter the following into your terminal:
```
git clone https://github.com/BasPieren/real-time-web-1819.git

cd real-time-web-1819

npm install

npm run server
```

### Packages and Technologies
This project makes use of the following packages and technologies:

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [EJS](https://ejs.co/)
* [Socket.io](http://socket.io)

## API 🐒
I made use of the following API for this project:

  * [Github API](https://developer.github.com/v3/)

The Github API has a bunch of different endpoints that you can use:

```
{
  "current_user_url": "https://api.github.com/user",
  "current_user_authorizations_html_url": "https://github.com/settings/connections/applications{/client_id}",
  "authorizations_url": "https://api.github.com/authorizations",
  "code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
  "commit_search_url": "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}",
  "emails_url": "https://api.github.com/user/emails",
  "emojis_url": "https://api.github.com/emojis",
  "events_url": "https://api.github.com/events",
  "feeds_url": "https://api.github.com/feeds",
  "followers_url": "https://api.github.com/user/followers",
  "following_url": "https://api.github.com/user/following{/target}",
  "gists_url": "https://api.github.com/gists{/gist_id}",
  "hub_url": "https://api.github.com/hub",
  "issue_search_url": "https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}",
  "issues_url": "https://api.github.com/issues",
  "keys_url": "https://api.github.com/user/keys",
  "notifications_url": "https://api.github.com/notifications",
  "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
  "organization_url": "https://api.github.com/orgs/{org}",
  "public_gists_url": "https://api.github.com/gists/public",
  "rate_limit_url": "https://api.github.com/rate_limit",
  "repository_url": "https://api.github.com/repos/{owner}/{repo}",
  "repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",
  "current_user_repositories_url": "https://api.github.com/user/repos{?type,page,per_page,sort}",
  "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
  "starred_gists_url": "https://api.github.com/gists/starred",
  "team_url": "https://api.github.com/teams",
  "user_url": "https://api.github.com/users/{user}",
  "user_organizations_url": "https://api.github.com/user/orgs",
  "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
  "user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"
}
```
### Authentication
There are two ways to authenticate through the GitHub API. Requests that require authentication will return `404 Not Found`, instead of `403 Forbidden`, in some places. This is to prevent the accidental leakage of private repositories to unauthorized users.

#### Basic authentication
`curl -u "username" https://api.github.com`

#### OAuth2 token (sent in a header)
`curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com`

> Note: GitHub recommends sending OAuth tokens using the Authorization header. GitHub accepts sending OAuth tokens as a query parameter, but it is less secure because URLs can be logged by any system along the request path.

#### OAuth2 key/secret
`curl 'https://api.github.com/users/whatever?client_id=xxxx&client_secret=yyyy'`

Using your `client_id` and `client_secret` does not authenticate as a user, it will only identify your OAuth application to increase your rate limit. Permissions are only granted to users, not applications, and you will only get back data that an unauthenticated user would see. For this reason, you should only use the OAuth2 key/secret in server-to-server scenarios.

### Rate Limit
When there is basic authentication or 0Auth authentication, you can make u to 5000 requests per hour. For unauthenticated requests there is a rate limit of 60 request per hour.

## Research 🕵🏻
Here I explain the research for this project.

### Sketch
This is a sketch of the most important screen.

![Homepage Sketch](https://i.imgur.com/PecHr6X.jpg)
> Homepage sketch

### Data Life Cycle
![Data Life Cycle](https://i.imgur.com/cwbVmTx.jpg)

### Feedback
I would like feedback on the following points:

  * What do you think of my concept? Are their areas on which I cloud improve? Most importantly when it comes to the data being used.
  * Is the data life cycle clear enough? Are their things I didn't account for?

## How It Works 🛠️
Here I explain the core features of this project.

## Sources 📚
This is a list of all the sources I used during this project:

  * [Socket.io | Get started](https://socket.io/get-started/chat/)
  * [Implementing OAuth 2.0 with Node.js](https://www.sohamkamani.com/blog/javascript/2018-06-24-oauth-with-node-js/)

### Honourable Mentions

  * [Jesse Dijkman](https://github.com/jesseDijkman1/)
  * [Jeroen van Berkum](https://github.com/jeroenvb/)

## Licence 🔓
MIT © [Bas Pieren](https://github.com/BasPieren)
