---
description: A guide the Kaypoh.forum Backend
---

# Backend

### Setting up

{% hint style="info" %}
You may want to look into each detailed Git commit message to understand the chronology of the development of features in the Backend!



As the environment variables of the backend are confidential, to run the backend, please email me at _**yinjoeng2003@gmail.com**_ or Telegram _**@joeng03**_ to request a copy of the **.env** file.
{% endhint %}

Make sure you have Git, Ruby 3.1.2, and Bundler installed correctly on your machine. Then run the following commands:

```
git clone https://github.com/joeng03/CVWO-Winter-Assignment-Backend-Final-Submission.git
cd CVWO-Winter-Assignment-Backend-Final-Submission.git
bundle
rails s
```

You could also use Docker to set up the Backend after cloning it.



### Docker

**Run Docker Backend Development Server:**

`docker-compose up -d --build`

**Run Docker Backend Production Server:**

Change this part of docker-compose.yml from&#x20;

```
web 
  build:
    dockerfile: Dockerfile.dev
```

to&#x20;

```
web 
  build:
    dockerfile: Dockerfile.prod
```

Then run&#x20;

`docker-compose up -d --build`

Or, similarly to the Frontend, you could also set up 2 docker-compose files to run both environments concurrently. &#x20;



### **Directory Structure:**

This is the structure of the /app folder: (files included)

```
├───channels
│   └───application_cable
│           channel.rb
│           connection.rb
│
├───controllers
│   │   application_controller.rb
│   │   comments_controller.rb
│   │   posts_controller.rb
│   │   stars_controller.rb
│   │   topics_controller.rb
│   │   users_controller.rb
│   │
│   ├───concerns
│   │       .keep
│   │
│   └───users
│           registrations_controller.rb
│           sessions_controller.rb
│
├───jobs
│       application_job.rb
│
├───mailers
│       application_mailer.rb
│
├───models
│   │   application_record.rb
│   │   comment.rb
│   │   jwt_denylist.rb
│   │   post.rb
│   │   star.rb
│   │   topic.rb
│   │   user.rb
│   │
│   └───concerns
│           .keep
│
└───serializers
        comment_serializer.rb
        post_serializer.rb
        topic_serializer.rb
        user_serializer.rb
```

