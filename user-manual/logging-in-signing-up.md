# Logging in / Signing up

#### Toast Messages

When logging in, the correct credentials must be entered, otherwise, the user would not be granted access to our services:&#x20;

![](<../.gitbook/assets/image (16).png>)![](<../.gitbook/assets/image (12).png>)

We use toast messages to indicate whether actions such as logging in, signing up, logging out, CRUD operations on topics, posts, comments, and user profiles are successful or not. If they are unsuccessful, the toast message would give an appropriate hint as to why the action has failed.

#### Input Validation

Our application also checks for valid usernames, emails, and password formats in order to enhance security. Usernames should be not more than 10 characters, email addresses must follow a basic format, and passwords must be at least 6 characters. All inputs must not be greater than 255 characters. Username and email must be unique (not registered before). For example,&#x20;

![](<../.gitbook/assets/image (6).png>)![](<../.gitbook/assets/image (1).png>)

We perform both frontend and backend validation on user input, especially for user authentication.
