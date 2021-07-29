# Cloud Native - Plant Tracker Project
Victoria Manicom
## Introduction:

The brief was to create a CRUD application that encapsulated all the core modules covered during the training.

##### Project Management - A fully expanded Jira board, clear documentation from a design phase. Code integrated into a Version Control System.
##### Databases - A relational database to store persistent data from the project.
##### Java SE & Spring Boot - Functional application created in OOP language which meets requirements of Kanban board.
##### Testing - Acceptable level of test coverage on back-end (JUnit, MockMVC and Mockito).
##### Front-End Development - Functioning front-end website with API integration.

*****

### Planning Resources:
Using Jira Software I created a Kanban board modelled as a Scrum and created the user stories and epics. From the user stories I created linked issues for the front and back end of my project to help the structure of the build. I created five main user stories, an example of one is shown here:

Once I had decided on my user stories I started to think about the design for the website. Using Invision Freehand I created a wireframe and stuck to this throughout my front-end creation.

Throughout the project build I completed various sprints, grouping the issues from epics to complete different sections.

*****


### Databases:
Two databases were used in this project, a local H2 database which was used for testing the back-end and a MySQL database for storing the persistent data from the application.

H2:
The H2 database was created with plant-schema.sql and plant-data.sql files to automatically populate the fields for testing purposes.

MySQL:
This is the layout of my database for the plant tracker.
It shows the datatype of each column and also that the ‘name’ field has to be unique.


*****

### Back-end + Testing:

The back-end of this project was created using Java in a Spring Boot Framework. I made sure that all of my Kanban board requirements were met with the correct mappings in my code.


Testing:

Both integration and unit testing was used on this project.

Integration testing: MockMVC

To make sure that the program was working, I used MockMVC to create a mocked Controller class.

It performed mock HTTP requests like a user of the program would and allowed me to test the outcomes of each HTTP endpoint.





Unit testing: JUnit and Mockito

By unit testing each part of the program I could check that the individual parts are working as they should. Using Mockito I mocked the responses given by the repo so that I could test if what came out of my method matched my testing data.

GIVEN-WHEN-THEN-VERIFY structure.

*****

### Front-End:
The front-end is built from HTML, CSS and JavaScript. I used the Bootstrap framework for various components, including forms, modals and toasts.

The HTML and CSS are used to create the look of the website, I used CSS to animate the plant cards when hovered over for extra user interaction.

The JS was used for the API integration using axios. It was also used to get the modal and toasts to pop up on creation/updating.


