# Livesitter FullStack Assignment
## - API Documentation for A RTSP Livestream App with Overlay


### Server:- Environment Variables
```
http://localhost:8000
```

### Routes:-
- #### User Routes:
```
http://localhost:8000/api/users
```
- All api routes are declared in `routes/user.routes.js` serving at this endpoint `http://localhost:8000/api/users`

## APIs:-

### Auth APIs:-

- #### /register

    **POST** `http://localhost:8000/api/users/register`

    **Request Body:** JSON Data
    example data
    ```json
    {
        "name": "dwight",
        "email": "dwight@gmail.com",
        "password": "dwight"
    }
    ```

    **Response Body:** JSON Data
    ```json
    {
    "statusCode": 201,
    "data": {
        "name": "dwight",
        "email": "dwight@gmail.com",
        "avatar": "https://robohash.org/dwight@gmail.com.png?size=50x50&set=set1",
        "overlay": {
            "rect": [
                {
                    "x": 0,
                    "y": 0,
                    "height": 0,
                    "width": 0,
                    "fillColor": "#ffffff",
                    "_id": "66e82c9333d5e57905cc6d92"
                }
            ],
            "_id": "66e82c9333d5e57905cc6d91",
            "circle": [],
            "arrow": [],
            "scribble": [],
            "star": [],
            "__v": 0
        },
        "password": "$2b$10$mCJQHGjY.1ZOyi6fvTwkJ.lN6TuU8jkqHuPS3UxaFWMhbRbyf8XKe",
        "_id": "66e82c9333d5e57905cc6d94",
        "__v": 0
    },
    "message": "User registered successfully",
    "success": true
    }
    ```

- #### /login

    **POST** `http://localhost:8000/api/users/login`

    **Request Body:** JSON Data
    example data
    ```json
    {
        "email": "joe@gmail.com",
        "password": "mama"
    }
    ```

    **Response Body:** JSON Data
    ```json
    {
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "66e7e7c152ac59b536f2fc3e",
            "name": "joe mama",
            "email": "joe@gmail.com",
            "avatar": "https://robohash.org/joe@gmail.com.png?size=50x50&set=set1",
            "overlay": "66e7e7c052ac59b536f2fc3b",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmU3ZTdjMTUyYWM1OWI1MzZmMmZjM2UiLCJlbWFpbCI6ImpvZUBnbWFpbC5jb20iLCJuYW1lIjoiam9lIG1hbWEiLCJpYXQiOjE3MjY0OTI3NDQsImV4cCI6MTcyNjU3OTE0NH0.ih27tAxS3kLtEtV_fiMtVAx5wjTXXCb7Aw1o3DAdstA",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmU3ZTdjMTUyYWM1OWI1MzZmMmZjM2UiLCJpYXQiOjE3MjY0OTI3NDQsImV4cCI6MTcyNzM1Njc0NH0.9t64hqv4N4GbWlH_QSOHTotwWST0_vMhbeTXFcWipGI"
    },
    "message": "User logged In Successfully",
    "success": true
    }
    ```

- #### /logout

    **POST** `http://localhost:8000/api/users/logout`

    **Request Body:** JSON Data

    example data
    ```json
    {
        "user": {
            "_id": "66e7e7c152ac59b536f2fc3e"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmU3ZTdjMTUyYWM1OWI1MzZmMmZjM2UiLCJlbWFpbCI6ImpvZUBnbWFpbC5jb20iLCJuYW1lIjoiam9lIG1hbWEiLCJpYXQiOjE3MjY0OTI3NDQsImV4cCI6MTcyNjU3OTE0NH0.ih27tAxS3kLtEtV_fiMtVAx5wjTXXCb7Aw1o3DAdstA"
    }
    ```

    **Response Body:** JSON Data
    ```json
    {
        "statusCode": 200,
        "data": null,
        "message": "User logged out successfully",
        "success": true
    }
    ```

### Overlay APIs:-

- #### /create-overlay
- To create a overlay there is no seperate API.
- But when a User is created it will create an overlay reference id as the overlay property of user.

- #### /update-overlay 

    **POST** `http://localhost:8000/api/users/update-overlay`

    **Request Body:** JSON Data
- In the request body, pass the `overlay` id and new `overlay` property of the user.
    example data
    ```json
        {
    "_id": "66e7242cea48f1eb1a37499c",
    "overlay":{
            "rect":[
            {
                "id": "ac813938-6e8e-4107-8069-d6e996ab3cd3",
                "x": 45.5,
                "y": 48,
                "height": 53,
                "width": 78,
                "fillColor": "#ff0000"
            }
        ],
        "circle":[
            {
                "id": "72783bc9-12e3-4dc6-ad0b-1ab45b12ed0f",
                "x": 76.5,
                "y": 183,
                "radius": 36.40054944640259,
                "fillColor": "#ff0000"
            }
        ],
        "arrow":[
    {
        "id": "91746e76-0454-485c-a273-56babbe88db1",
            "points": [
                214.5,
                73,
                287.5,
                75
            ],
        "fillColor": "#ff0000"
    }
        ],
        "scribble":[
    {
        "id": "5e3191d4-640f-483c-a2d7-496376ee9e53",
            "points": [
                238.5,
                197,
                238.5,
                196,
                238.5,
                195,
                238.5,
                194,
                238.5,
                193,
                238.5
            ],
        "fillColor": "#ff0000"
    }
        ]
    }
    
    }
    ```

    **Response Body:** JSON Data
    ```json
    {
    "statusCode": 200,
    "data": null,
    "message": "Overlay updated successfully",
    "success": true
    }
    ```

- #### /overlay (For Fetching Overlay)

    **POST** `http://localhost:8000/api/users/overlay`

    **Request Body:** JSON Data
- In order to fetch the overlay we need to send the user id.
    example data
    ```json
    {
    "_id": "66e7242cea48f1eb1a37499c"
    }
    ```

    **Response Body:** JSON Data
    ```json
    {
    "statusCode": 200,
    "data": {
        "text": null,
        "_id": "66e808f48db169fabb90ecc1",
        "rect": [
            {
                "id": "434617da-5701-43be-8365-e88f28f8cf60",
                "x": 70,
                "y": 593.6875,
                "height": -340,
                "width": 54,
                "fillColor": "#ff0000",
                "_id": "66e809188db169fabb90ecca"
            }
        ],
        "circle": [
            {
                "id": "4ca5b4c5-051d-4183-b64d-02cdc3fde6ca",
                "x": 299,
                "y": 600.6875,
                "radius": 165.38742394752995,
                "fillColor": "#ff0000",
                "_id": "66e809188db169fabb90eccb"
            }
        ],
        "arrow": [],
        "scribble": [],
        "star": [],
        "__v": 0
    },
    "message": "User Overlay fetched successfully",
    "success": true
    }
    ```

#### /delete-overlay

**POST** `http://localhost:8000/api/users/delete-overlay`
**Request Body:** JSON Data
- In the body pass the _id of the overlay you want to delete.
    example data
```json
    {
    "_id": "66e7242cea48f1eb1a37499c"
    }
 ```