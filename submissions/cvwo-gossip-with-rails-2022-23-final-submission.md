---
description: Made with ❤️ by Yin Joe
---

# CVWO Gossip with Rails 2022/23 Final Submission

### **Accomplishments**

**·        Exploring and Enjoying UI/UX Design**

As I have no prior experience in UI/UX design, I had to acquire new skills to design user-friendly interfaces. Through reading articles about UI/UX design principles and best practices, studying the MUI Documentation, and relying on my artistic intuition, I had a solid foundation of knowledge to build on as I began to experiment with different design techniques and elements.

I wanted the web forum to be as user-centric, customizable, and responsive as possible. For a better user experience, I added a rich text editor, and the functionality to upload images for posts and profile pictures. I also integrated the usage of pagination for posts, thus increasing the scalability of the project when the number of posts grows.

By using Data Grids for forum topics and Cards for posts, I was able to give users a taste of different UI designs. Data Grids were used to sort and search for data efficiently, thus enabling users to quickly read the statistics of each topic (creator, creation date, number of posts) and subscribe/ unsubscribe from them. On the other hand, Cards give a social media-like experience to users, where each post is presented as an individual component, which links to a page displaying more detailed information about the post. Portrait and landscape Card layouts were designed to cater to different screen sizes.

I chose 2 complementary colors, light blue and pink as my primary and secondary theme colors. The landing and 404 pages use a background gradient of these colors. I also defined light and dark modes for the application.&#x20;

Typography-wise, I choose Roboto (MUI’s base font) for body texts, Open Sans for titles, and sans-serif as the font fallback as they are all sans-serif typefaces and pair well together.



**·       An Understanding of the Web Development Process**

Through this assignment, I developed a deeper understanding of the web development cycle. This includes not only the technical aspects of building software but also the broader process of bringing a project from ideation to completion.

The web development cycle is a crucial part of creating web applications. It includes the stages of planning, analysis, design, implementation, testing, deployment, and maintenance. Through working on this project, I have come to appreciate the importance of each step in the cycle.

I have utilized tools such as Git (version control), Chrome Devtools (frontend debugging), ESLint (code style and quality analysis), Prettier (code formatting), Postman (API testing), and pgAdmin4 (visualizing and manipulating backend data), and Docker during the development process. Using these tools allowed me to speed up the development process and detect bugs early in the development cycle.

Before this project, I had no idea how Docker works and was unaware of its benefits. After learning Docker and building containers for the Frontend and Backend, in both development and production environments, I understood and appreciated the significance of Docker bringing compatibility and portability across operating systems, as this solves the “it works on my machine” problem in developer teams.

In conclusion, being familiar with web development cycles is crucial for projects to develop and scale sustainably. I am confident that my understanding of the web development process will help me to create better applications and deliver more value to my organization.



**·        More Confidence in Building and Managing Data Models**

When first receiving this assignment, I was not confident about building sustainable data models, especially in a language I was not familiar with (Ruby), but thankfully after learning Ruby and brushing up on concepts like relation, cardinality, and foreign keys, I was able to draw out and implement an Entity Relationship Diagram (ERD) for the Minimum Viable Product (MVP).

I paid a lot of attention to data validation on both the Frontend and the Backend to maintain the quality and integrity of the data. For example, ensuring that users can only edit/delete posts that they wrote, using admin authentication to ensure that only admins can create/edit/delete topics, and ensuring that the tuple (user\_id, post\_id) in the Star model is unique so that a user can only star a post at most once.

When I initially envisioned three database models, namely **User**, **Post**, and **Comment** for the MVP, I remember comparing the greater complexity of this year’s assignment to past year's assignments. Nevertheless, adding 2 more models, **Topic** and **Star**, as well as Active Storage tables (integrated with Cloudinary for image storage) and a JWT Denylist table, while ensuring that the new relations integrate seamlessly with the existing ones, is something that I have never expected to achieve, thus increasing my confidence in handling data models in larger projects.



**·        Independent Learning as a Lifelong Skill**

One of the challenges I have faced as a web developer for this project is when I couldn't find answers to specific functionality or bugfix examples on websites like Stack Overflow. In these situations, I had to rely on my own understanding of the concepts I had learned and think critically to find a solution. By adopting a growth mindset and viewing these challenges as opportunities to learn and improve, I was able to independently rectify any misconceptions I had about certain web development concepts and gain a deeper understanding of them. As a result, I was able to complete all tasks defined from levels 1-5, some at a basic level while others at more advanced levels.

### User Manual

{% hint style="success" %}
Please refer to [this](broken-reference) detailed version of the user manual
{% endhint %}
