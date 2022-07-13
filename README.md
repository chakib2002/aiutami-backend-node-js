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

**Notification system architechture**

![notification design system](https://user-images.githubusercontent.com/78510402/177719524-94d26245-1024-4dbe-ba3a-ec17afb6025b.PNG)


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

After the user is authenticated the client-side fetches all his notifications from the database **where the New column is equal to false** which means that the notification has already being recieved by the user and he has already checked it out. 

**code**
```node
// you will find the code in "./routes/protected" of this repository   

app.get("/fetchNotifications", controllers.fetchNotifications);

```

```node
// you will find the code in "./controllers/private"  of this repository  

exports.fetchNotifications = async (req, res, next)=>{
    await db.Jobs.sync().then(async()=>{
        return await db.Jobs.findAll({
            where : {
                id_user : req.session.passport.user,
                new : 0
            }
        })
        .then(data => res.status(200).json(data))
        .catch(err=> res.status(500).json({error : 'An error has occured'}))
    })
}

```

after that, each 3 seconds while the user is authenticated a request get sent to the **redis temporarily storage** in order to look up for new notifications, if a new notification is found, it gets send back to the client-side .

   > - This process doesn't duplicate notifications on the client-side, because each time we send a request to redis temporarily storage, we send with it an array of ids of all the notifications on the client-side. this way we have the ability to check if the a notification has already been recieved on the client-side or not.

**code**

```node

// you will find the code in "./routes/protected" of this repository  

app.post("/checkForNewNotifications", controllers.checkForNewNotifications );

```

```node

// you will find the code in "./controllers/private"  of this repository  

exports.checkForNewNotifications = async (req, res, next )=>{
    const user_id = await req.session.passport.user;
    const ids = req.body.ids;
    await client.EXISTS('user-'+user_id)
    .then(async (existence) =>{
        if( existence === 1){

            const data = await client.XRANGE('user-'+user_id, '-','+')
            const result = JSON.stringify(data)
            const response = await JSON.parse(result)

            const processedResponse =await response.filter(element => {
                const exists = !!ids.find(current =>{
                    return current == element.message.id
                })

                if(exists === false){
                    return element
                }

            })
            
            return await processedResponse ;

        }else{
            next();
        }
    })

    .then(data=>res.status(200).json(data))
    .catch(err => res.status(500).json({error : 'An error has occured'}))
}

```














   
   
