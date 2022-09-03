# API endpoints

These endpoints allow you to register a course, register for a course, update courses etc

## GET

- [**List all courses**](#get-list-all-courses)  `/api/v1/courses`
- [**List details of a course given Course id**](#get-list-details-of-course-given-course-id)  `/api/v1/courses/:id`
- [**List all leads registered for a course**](#get-list-all-leads-registered-for-a-course)  `/api/v1/courses/:id/leads` (Authorization needed)

## POST

- [**Register a course**](#post-register-a-course)  `/api/v1/courses` (Authorization needed)
- [**Register for a course**](#post-register-for-a-course)  `/api/v1/courses/:id` (Authorization needed)
- [**Add a comment for a lead registered for a course**](#post-add-comment) `/api/v1/courses/:id/leads/:lead_id/comments` (Authorization needed)

## PUT

- [**Update a course**](#put-update-a-course)  `/api/v1/courses/:id` (Authorization needed)
- [**Update Status of a lead registered for a course**](#update-lead-status) `/api/v1/courses/:id/leads/:lead_id` (Authorization needed)

------

### GET List all courses

Gets all the courses listed in the database

**Endpoint**

GET `/api/v1/courses`

**Response**
```json
[
    {
        "id": 2,
        "name": "10k designers",
        "description": "design courses",
        "status": 0,
        "start_date": null,
        "duration": "10-12 weeks",
        "hrs_day": "4-10 hrs",
        "price": "5000",
        "max_seats": 100,
        "instructor": {
            "name": "John Doe",
            "email": "xyz@gmail.com",
            "designation": "Developer",
            "company": "ABC",
            "linkedin": "www.linkedin.com/john-doe",
            "about": "I am a developer"
        },
    },
    {
        "id": 1,
        "name": "10k",
        "description": "design courses",
        "status": 1,
        "start_date": "2022-10-11T00:00:00.000Z",
        "duration": "11-12 weeks",
        "hrs_day": "4-11 hrs",
        "price": "5000",
        "max_seats": 100,
        "instructor": {
            "name": "John Doe",
            "email": "xyz@gmail.com",
            "designation": "Developer",
            "company": "ABC",
            "linkedin": "www.linkedin.com/john-doe",
            "about": "I am a developer"
        }
    },
]
```

-----

### POST Register a course

Create a new course. 

**Endpoint**

POST `/api/v1/courses`

**Headers**

| Name | Value | Description |
| --- | --- | --- |
| Content-Type | application/json |  |
| Authorization | Bearer `<token>` |  Authorization token which verifies whether you are a instructor or not|

**Body**

| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id | string | required |  Instructor id in the format `INS*` where * is a unique number|
| name | string | required |  Name of the course |
| description | string | required |  Description of the course |
| status | number | required |  Status of the course. 0 - Coming Soon, 1 - Upcoming, 2 - In Progress |
| start_date | date | optional/required |  Start date of the course. Not required if the course is coming soon. Required otherwise. Format YYYY-MM-DD|
| duration | string | required |  Duration of the course |
| hrs_day | string | required |  Hours per day of the course |
| price | string | required |  Price of the course |
| max_seats | number | required |  Maximum seats available for the course |

**Response**

"Course Created"

-----

### PUT Update a course

Update details of a course.

**Endpoint**
    
  PUT  `/api/v1/courses/:id`

**Headers**

| Name | Value | Description |
| --- | --- | --- |
| Content-Type | application/json |  |
| Authorization | Bearer `<token>` |  Authorization token which verifies whether you are a instructor or not|

**Parameters**
| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id | string | required |  Course id to be updated|

**Body**

| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id | string | required |  Instructor id in the format `INS*` where * is a unique number|
| name | string | optional |  Name of the course |
| description | string | optional |  Description of the course |
| status | number | optional |  Status of the course. 0 - Coming Soon, 1 - Upcoming, 2 - In Progress |
| start_date | date | optional |  if status is updated to Upcoming oR In Progress, start_date is required. Start date of the course. Not required if the course is coming soon. Required otherwise |
| duration | string | optional |  Duration of the course |
| hrs_day | string | optional |  Hours per day of the course |
| price | string | optional |  Price of the course |
| max_seats | number | optional |  Maximum seats available for the course |

**Response**

"Course Updated"

-----

### GET List details of course given course id

Get details of a course given the course id

**Endpoint**

GET `/api/v1/courses/:id`

**Parameters**

| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id | string | required |  Course id |

**Response**

```json
{
    "name": "10k",
    "description": "design courses",
    "status": 1,
    "start_date": "2022-10-11T00:00:00.000Z",
    "duration": "11-12 weeks",
    "hrs_day": "4-11 hrs",
    "price": "5000",
    "max_seats": 100,
    "instructor": {
        "name": "John Doe",
        "email": "xyz@gmail.com",
        "designation": "Developer",
        "company": "ABC",
        "linkedin": "www.linkedin.com/john-doe",
        "about": "I am a developer"
    }
}
```

-----

### POST Register for a course

Register a lead for a course

**Endpoint**

POST `/api/v1/courses/:id`

**Headers**

| Name | Value | Description |
| --- | --- | --- |
| Content-Type | application/json |  |
| Authorization | Bearer `<token>` |  Authorization token which verifies whether you are a registered user|

**Parameters**

| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id | string | required |  Course id |

**Body**

| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id  | string | required | User id registered for the course format 'User*' where * is a unique number | 
| name | string | required |  Name of the lead |
| email | string | required |  Email of the lead |
| phone | string | required |  Phone number of the lead |
| linkedin | string | optional |  Linkedin profile of the lead |

**Response**

"Enrolled Successfully!!"

-----

### GET List all leads registered for a course

Gets details of all the leads registered for a course

**Endpoint**

GET `/api/v1/courses/:id/leads`

**Parameters**

| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id | string | required |  Course id |

**Headers**
| Name | Value | Description |
| --- | --- | --- |
| Content-Type | application/json |  |
| Authorization | Bearer `<token>` |  Authorization token which verifies whether you are a registered instructor|
| id_token | string |  Instructor id|

**Response**

```json
[
    {
        "lead_id":1,
        "status":2,
        "name":"Royston",
        "email":"tauro.royston@gmail.com",
        "phone":"9900789134",
        "linkedin":"www.linkedin",
        "comments":[
            "Well done"
        ]
    },
    ...
]
```

-----

### PUT Update lead status

Update the status of a lead to either Accepted or Rejected or On Hold

Accepted - 1
Rejected - 0
On Hold - 2

**Endpoint**

PUT `/api/v1/courses/:id/leads/:lead_id`

**Parameters**

| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id | string | required |  Course id |
| lead_id | string | required |  Lead id |

**Headers**

| Name | Value | Description |
| --- | --- | --- |
| Content-Type | application/json |  |
| Authorization | Bearer `<token>` |  Authorization token which verifies whether you are a registered instructor|

**Body**

| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id  | string | required | User id registered for the course format 'INS*' where * is a unique number | 
| status | number | required| status of the lead, must be greater than 0 and less than 2 |

**Response**

Lead status updated

-----

## POST Add Comment

Add a comment for a lead registered for a course

**Endpoint**

POST `/api/v1/courses/:id/leads/:lead_id/comments`

**Parameters**

| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id | string | required |  Course id |
| lead_id | string | required |  Lead id |

**Headers**

| Name | Value | Description |
| --- | --- | --- |
| Content-Type | application/json |  |
| Authorization | Bearer `<token>` |  Authorization token which verifies whether you are a registered instructor|

**Body**

| Name | Type | Type| Description |
| --- | --- | --- | --- |
| id  | string | required | User id registered for the course format 'INS*' where * is a unique number |
| comment | string | required |  Comment to be added |

**Response**

Comment Added


