# Airtribe-API

## Problem Statement

Design database and APIs for application based courses on Airtribe.

### Database relations:

- There are multiple instructors on Airtribe.
- Every instructor can start multiple courses.
- Multiple learners can apply for a course using application form (Leads)
- Instructor can add comments against every lead

### API endpoints:
- [x] Create course API
- [x] Update course details API (name, max_seats, start_date etc)
- [x] Course registration API (A user can apply for a course by sharing their name, email, phone number and LinkedIn profile)
- [x] Lead update API (Instructor can change status of the lead (Accept / Reject / Waitlist))
- [x] Lead search API (Instructor can search leads by name or email)
- [x] Add comment API

## Database relations:

For more info visit [db.sql](migrations/db.sql)

## API endpoints:

Below are a few API endpoints:

### Get all courses

```bash
curl -X GET \
  http://localhost:3000/courses \
  -H 'Content-Type: application/json' \
```

#### Response

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
    ...
]
```

### Create a course

```bash
curl --request POST \
  --url http://localhost:3000/api/v1/courses \
  --header 'content-type: application/x-www-form-urlencoded' \
--header 'authorization: Bearer <auth_token>' \
--data id=INS1 \
--data 'name=10k desginers' \
--data 'description=design course' \
--data status=0 \
--data 'duration=4-12 weeks' \
--data price=5000 \
--data max_seats=9000 \
--data hrs_per_day=10
```

#### Response

```bash
StatusCode        : 200
StatusDescription : OK
Content           : Course created
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length: 14
                    Content-Type: text/html; charset=utf-8
                    Date: Sat, 03 Sep 2022 07:16:20 GMT
                    ETag: W/"e-D/89hYEIDX4qaNzb1gDR5qSQd6o"...
Forms             : {}
Headers           : {[Connection, keep-alive], [Keep-Alive, timeout=5], [Content-Length, 14], [Content-Type,
                    text/html; charset=utf-8]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 14
```

For more detailed explanation and more endpoints visit [docs](docs/API.md)

## To run

### Clone the repo

```bash
git clone https://github.com/lucasace/Airtribe-API.git
```

### Running Locally

Start your postgres server either manually or using docker

Using docker
```bash
docker run --name postgresql -e POSTGRES_USER=airtribe -e POSTGRES_PASSWORD=password -e POSTGRES_DB=airtribe -p 5432:5432 -d postgres
```

Set environment variables

```bash
export DATABASE_URL=<database_url>
export JWT_TOKEN=<jwt_token>
```

Install dependencies

```bash
yarn install
```

Run

```bash
yarn start
```
**Note: This is assuming your postgres database is populated with the neccessary data. If not visit [Migration](#migration)**'


### Running with docker

```bash
docker-compose up
```

### Migration

Its needed to populate the database with required tables and data. [Running with docker](#running-with-docker) will automatically run the migration script. If you are running locally, you need to run the migration script manually.

```bash
psql -U <username> -d <database_name> -a -f ./migrations/db.sql
psql -U <username> -d <database_name> -a -f ./migrations/insert.sql
```

## License

[MIT](LICENSE)