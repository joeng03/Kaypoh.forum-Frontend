---
description: A guide for the Kaypoh.forum Frontend
---

# Frontend

### Setting Up

{% hint style="info" %}
You may want to look into each detailed Git commit message to understand the chronology of the development of features in the Frontend!
{% endhint %}

Make sure you have Git, Node, and yarn installed correctly on your machine. Then run the following commands:

```
git clone https://github.com/joeng03/CVWO-Winter-Assignment-Frontend-Final-Submission.git
cd CVWO-Winter-Assignment-Frontend-Final-Submission
yarn install
yarn start
```

You could also use Docker to set up the Frontend after cloning it.



### Docker

**Run Docker Frontend Development Server:**

`docker-compose -f docker-compose-dev.yml up -d -–build`

**Run Docker Frontend Production Server:**

`docker-compose -f docker-compose-prod.yml up -d -–build`

###

### User/Admin Access

Gain user access by signing up for an account using the frontend **/signup** page.

Use the following credentials to gain admin access:

```
email:     yinjoeng2003@gmail.com
password:  admin2023
```

****

### Documentation

<figure><img src="../.gitbook/assets/image (17).png" alt=""><figcaption><p>TypeDoc Documentation for the IPost interface</p></figcaption></figure>

Run the command:

```
yarn docs
```

to generate TypeDoc documentation of the current version of the project, which would be stored in the /docs folder in the root directory.

You could also contribute by adding custom documentation using the [TSDoc](https://tsdoc.org/) format and standard.



### **Directory Structure:**

This is the structure of the /src folder: (files included)

```
│   App.css
│   App.tsx
│   index.css
│   index.tsx
│   react-app-env.d.ts
│
├───components
│   ├───Comments
│   │       CommentCard.tsx
│   │       ViewComment.tsx
│   │       WriteComment.tsx
│   │
│   ├───Posts
│   │       PostCard.tsx
│   │
│   └───UI
│       ├───Buttons
│       │       HomeButton.tsx
│       │       LogoutButton.tsx
│       │       PublishButton.tsx
│       │       SwitchModeButton.tsx
│       │
│       ├───Effects
│       │       AppTypewriter.tsx
│       │       Warning.tsx
│       │
│       ├───General
│       │       Loading.tsx
│       │       RequireAuth.tsx
│       │       ScrollToTop.tsx
│       │
│       ├───Input
│       │       AppInput.tsx
│       │       ContentEditor.tsx
│       │
│       ├───Modals
│       │       ConfirmationModal.tsx
│       │
│       └───Navigation
│               AppDrawer.tsx
│               AppPagination.tsx
│               Navigation.tsx
│
├───config
│       constants.ts
│       endpoints.ts
│       theme.ts
│       token.ts
│       validators.ts
│
├───pages
│   ├───Comments
│   │       CommentsList.tsx
│   │
│   ├───General
│   │       CodeOfConduct.tsx
│   │       NotFound.tsx
│   │
│   ├───Posts
│   │       PostsList.tsx
│   │       ViewPost.tsx
│   │       WritePost.tsx
│   │
│   ├───Topics
│   │       ForumTopics.tsx
│   │       WriteTopic.tsx
│   │
│   └───User
│           Login.tsx
│           Profile.tsx
│           SignUp.tsx
│
├───services
│       auth.ts
│       blob.ts
│       comments.ts
│       posts.ts
│       stars.ts
│       topics.ts
│
└───store
    │   index.ts
    │
    ├───comments
    │       action.ts
    │       reducer.ts
    │       types.ts
    │
    ├───posts
    │       action.ts
    │       reducer.ts
    │       types.ts
    │
    ├───topics
    │       action.ts
    │       reducer.ts
    │       types.ts
    │
    └───user
            action.ts
            reducer.ts
            types.ts
```

