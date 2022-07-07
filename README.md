# aiutami back end
Aiutami is a platform that connects Academic Tutors, Housekeepers and Senior caregivers with clients. This README.md file explains how the back end service of this platform is implemented.

## support and features 
**Authentication** : the platform supports session based authentication built using passport js library.

**Authorization** : certain routes cannot be accessed by unauthenticated users.

**Notification system** : when clients hire a tutor, a housekeeper or a senior caregiver, he will recieve a notification.

**Temporarily storage** : Notifications get stored in the Database and in a redis temporarily storage.

**Image uploading & processing** : ability for mentors, senior caregivers and housekeepers to upload profile pictures.



## system design

### sofware architechture

![Aiutami system design](https://user-images.githubusercontent.com/78510402/177692437-d4dd9098-6043-43ba-82e9-5855036bc4fc.PNG)

### database design

![db design](https://user-images.githubusercontent.com/78510402/177692484-4dc8355f-10e0-4d71-81d9-f0dde2a2e53b.PNG)

### Notification system

**How the notification system is implemented ?**
Whenever a client hires a tutor, a housekeeper or a senior caregiver, a notification get stored in the database and in the redis temporarily storage .




![notification design system](https://user-images.githubusercontent.com/78510402/177692515-75bf6c93-5f7c-430b-ab7c-766563de2961.PNG)


