# Hosting Details

### URLs

Kaypoh.forum is hosted on Netlify [https://kaypoh.netlify.app/](https://kaypoh.netlify.app/) [![Netlify Status](https://api.netlify.com/api/v1/badges/0c4342cd-930d-49a5-b773-de3b193aefd6/deploy-status)](https://app.netlify.com/sites/kaypoh/deploys). Due to constraints of backend computing resources \[free tier], this site may load slower 🐢 \[thank you for your patience!]



Kaypoh.forum is also hosted on Amazon AWS [http://ec2-13-213-114-232.ap-southeast-1.compute.amazonaws.com:3001/](http://ec2-13-213-114-232.ap-southeast-1.compute.amazonaws.com:3001/) \[This site loads with lightning⚡speed] . Since I have not (yet) purchased a domain name for Kaypoh.forum, this endpoint is not configured with an SSL certificate and thus must be accessed through http only.&#x20;



### Comparison

|                              | Netlify - Render                                                             | Amazon Web Services (AWS)                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Frontend                     | Netlify                                                                      | AWS EC2 \[Ubuntu 22.04]                                                                                     |
| Backend API                  | Render Web Service                                                           | AWS EC2 \[Ubuntu 22.04]                                                                                     |
| Database                     | <p>Render PostgreSQL</p><p>(Hostname: </p><p>dpg-celf6u82i3molphaaop0-a)</p> | <p>AWS RDS [PostgreSQL Engine]<br>(Endpoint: kaypohforum.cqu2gxzsgb0o.ap-southeast-1.rds.amazonaws.com)</p> |
| Frontend and Backend Origins | Different origins                                                            | Same origin                                                                                                 |

During the development of the Frontend, I also integrated [Vercel](https://cvwo-winter-assignment-frontend-final-submission.vercel.app/login) with GitHub to checkpoint the behavior of each commit.&#x20;

