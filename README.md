# Project Title

## 1. Overview

What is your app? 

A web application for camping planning. It aims to facilitate assigning responsibility to bring different camping items amongst a group of campers. 

### 1.1 Problem

Why is your app needed? Background information around any pain points or other reasons.

Eliminates confusion between campers on deciding on which items to get, and acts as a centralized list for camping, making it easier to track. 

Organizing camping usually falls on one (unlucky) person, who does all the planning and ends up bringing most of the items needed. Camping generally also requires a lot of pre-planning in terms of who brings what, so this app will eliminate both of these problems.

### 1.2 User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account.

A single group of campers that can host up-to six users will use the app. Each user would access the application with a link by first getting authenticated on the homepage before being redirected to a second item viewer page. There, they would be able to view their remaining items and select the ones they can bring.


### 1.3 Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

The homepage will include a log in form that would autheticate a username. The user will then be redirected to the item viewer page which will include two lists, the former will show the overall remaining items and the latetr will include user's selected items. Additinally, there will be two buttons that will allow transfer of items between both lists.

## 2. Implementation

### 2.1 Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

- React for the frontend
- Express for backend server
- JSON Web Token for User Authentication
- Postman to test requests

### 2.2 APIs

List any external sources of data that will be used in your app.

N/A

### 2.3 Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

- Homepage/Login page: The homepage will include a log in form that would autheticate a username.
- Item viewer page: The item viewer page  will include two lists, the former will show the overall remaining items and the latter will include user's selected items. Additinally, there will be two buttons that will allow transfer of items between both lists. 

### 2.4 Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### 2.5 Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

#### 2.5.1 *Item*

A String containing the **name** of a camping item required for the trip.

#### 2.5.2 *User*

A data object that stores a **User**'s *personal information* and a *list* of **Item** objects that the user opted to bring for the trip.

#### 2.5.2 *Remaining Items*

A singleton list of **Item** objects that stores the remaining or unselected items for the camping trip. 

- A user object that containes a list of all their selected items.
- A list of all camping items retrieved from my backend API.

### 2.6 Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

#### 2.6.1 POST */sign-up*

This endpoint will append a new user to the **User** database table.

> Request Body
1. **username**: The caller's username 
2. **password**: Thee caller's password

#### 2.6.2 POST */sign-in*

Checks if provided credentials match existing **User** record

> Request Body
1. **username**: The caller's username 
2. **password**: The caller's password


#### 2.6.3 GET */get-remaining-items*

This endpoint will determine the remaining items list for a given user. 

> Request Body
1. **userName**: The caller's username

> Response Body
1. **unselectedItems**: A list of Unselected items  
2.  **userSelectionMap**: A map that stores all the other users' selected items

#### 2.6.4 POST */select-items*

This endpoint will **update** a given user's list of  items *that they selected*.

> Request Body
1. **userName**: The caller's username
2. **itemsToSelect**: A list of items selected by the user

#### 2.6.5 POST */unselect-items*

This endpoint will **update** a given user's list of  items *that they unselected*.

> Request Body
1. **userName**: The caller's username
2. **itemsToUnselect**: A list of items unselected by the user

#### 2.6.6 GET */get-my-items*

This endpoint will **return** a given user's list of items that they selected.

> Request Body
1. **userName**: The caller's username

> Response Body
1. **userSelectedItems**: A user's list of selected items.

### 2.7 Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

Yes, the homepage will include a sign-up and sign-in feature. 

> **Authentication**
- Checking if a user's credentials match the records when logging in.

> **Authorization**
- Verifying that the user has access to perform specific actions, such as selecting items to add to their personal list. This would be done by eensuring the caller's identity and the request username are equal.

## 3. Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

#### 3.1 *Sprint 1 Tasks* [June 16th]
1) Set up a simple **Express** server 
2) Create API request and reponse model objects mentioned under **Section 2.6** (i.e.: `SelectItemRequest`, `SelectItemResponse`, etc...)
3) Create database data model objects mentioned under **Section 2.5** (i.e.: `Item`, `User`)

#### 3.2 *Sprint 2 Tasks* [June 23rd]
1) Implement & Test each backend endpoint under **Section 2.6** including user authentication & authorization behaviour
2) Create the React components required for the pages mentioned under **Section 2.3**

#### 3.3 *Sprint 3 Tasks* [June 29th]
1) Create an API client for the React components to us for calling backend endpoints mentioned under **Section 2.6**
2) Use the created backend client to integrate the frontend and backend + verify overall app functionality

## 4. Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

1) Adding additional items that were originally not listed.
2) Displaying items selcted by other users.

