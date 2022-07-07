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
Whenever a client hires a tutor, a housekeeper or a senior caregiver, a notification get stored in the database and redis temporarily storage .

example :

**a notification stored in the database**

![db not row](https://user-images.githubusercontent.com/78510402/177696851-0f2828c4-32e8-433d-9969-fbbfbb2f00c4.PNG)

**a notification stored in redis temporarily storage**

```
127.0.0.1:6379> XRANGE user-112 - +
1) 1) "1657170842496-0"
   2)  1) "id"
       2) "1"
       3) "user_id"    
       4) "112"        
       5) "full_name"   
       6) "James Harold"
       7) "phone_number"
       8) "+3365487548"
       9) "location"
      10) "Alger"
      11) "time"
      12) "Thu Jul 07 2022 06:14:01 GMT+0100 (West Africa Standard Time)"
      13) "job_description"
      14) "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
      dummy text ever since the 1500s, "
 ```

 
 ![notification design system](https://user-images.githubusercontent.com/78510402/177697579-b3509542-bf68-40bc-b380-4d8287e540c8.PNG)




