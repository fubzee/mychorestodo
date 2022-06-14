### Chores to Do

https://mychorestodo.herokuapp.com/
https://github.com/fubzee/mychorestodo

Modernising the family chore chart you would have growing up.  A simple and handy tool for parents to create a set of chores or family duties for their child or children (or they can add themsleves as a "child" and do some family chores as well). Includes a repeat option that will automatically recreate the chore for the next day, once the current chore is completed.      

## Table of Contents: 
---
* [Introduction](#Introduction)
* [Assignment](#Assignment)
* [Installation](#Installation)
* [Licence](#Licence)
* [Usage](#usage)
* [Contributing](#contributing)
* [Testing](#Testing)
* [GIT Profile](#gitprofile)
* [Questions](#questions)

**Introduction:** 

When you click on the link you will be presented with a landing page with an option to register as a new user or to login.  There are two login "types":

- parent
- child

The parent user type is essentially the admininstrator and sets up the children and their chores.  The parent determine the goal and reward type, e.g.  a small child could record their progress to their goal set by measuring in stars while an older child might want to earn some money so they may opt for dollars. 

When the child logs in they are presented with a list of their chores to do.  Once they have completed a chore they can set it to complete and they will earn their credits towards the goal set by the parent.  They are also able to see the progress of their rewards to their goal.   

What the reward is for achieving the goal is something the parent and child will arrange.  

**The Assignment:** 

    ## Your Task

    Build a performant and scalable MERN stack single-page application that fulfills a real-world need, with a focus on data and user demand.

    ## User Story

    
    ## UserStory - Parent
| When | Then | 
| ------------- |:-------------:| 
|**WHEN**  I visit the site for the first time | **THEN** I am presented with the homepage, which includes a button to register first time  users or an option to log in for a Parent or Child |
|**WHEN**  the Parent  of the child goes to the app they're prompted with a login/homepage   | **THEN** the Parent needs to provide a unique user name(preferably an email address) and password to login. |
|**WHEN**  the Parent is successfully logged in |  **THEN** they are taken to the parent dashboard page where they can add children, add chores for a child, navigate to the charity page or logoff |
|**WHEN**  the Parent clicks on the Add Child button | **THEN** they are taken to the add child details form where they complete the required details. |
|**WHEN**  the Parent hits the back button | **THEN** they are returned to the parent dashboard.|
|**WHEN** the parent clicks on the button to create a new chore  | **THEN** the parent is taken to the add chore form where they complete the details about the chore to be done |
|**WHEN**  the parent has competed creating the chore for the selected child then they can select the back button |**THEN** the parent is returned to the parent dashboard page |
 **WHEN** the parent clicks on the remove chore button | **THEN** the chore is removed |
|**WHEN**  the parent clicks on the remove child button | **THEN** then the child and all their chores are removed |
|**WHEN**  the parent clicks on the Donate buton | **THEN** they are taken to a group of charities where they can purchase a contribution to one of the causes  |
|**WHEN**  the parent clicks on the logout button | **THEN** they are returned to the home page |

## UserStory - Child

| When | Then | 
| ------------- |:-------------:| 
|**WHEN**  I visit the site for the first time | **THEN** I am presented with the homepage, which includes a button to register first time  users or an option to log in for a Parent or Child |
|**WHEN**  the child goes to the home page they will enter the username and password | **THEN** the child will be sent to the Child's Chore Page |
|**WHEN**  the Child selects a chore to complete |  **THEN** if a chore is repetable then a new chore is created and the current chore is completed and the progress meter is updated with the value of chore |		
|**WHEN**  the child clicks on the logout button | **THEN** they are returned to the home/sign-on page |					
	
<br><br>
    

## Installation 
---

Code Repositiry - Git 
Deployed - Heroku

The app is set up to run locally (npm run develop)

To populate the charity data there is a seeds file that contains the data needed this will need to be run before in order for the donate functionality to work.

The appliaction was created using create-react-app and uses
MongoDB 
Node
Express
ApolloServer & Apollo Cache
Tabs
DayJS
JWT


## Credits
| Name | Link | 
| ------------- |:-------------:| 
| freepik | https://www.freepik.com/free-vector/set-kids-helping-parents-with-home-cleaning_17962450.htm#query=kids%20chores&position=28&from_view=keyword | 

## Licence
---
Unlicenced

## Usage
---

## Contributing
---
 If you contribute please refer to the Gitgub link above.  Raise an issue and create a feature branch.  When ready to merge your code please raise a pull request for review

## Testing
---
Functional testing was done locally using localhost.
Tools that supported testing:
Apollo Studio


## GIT Profile :link:
--- 
https://github.com/fubzee

### Questions :question:
---
* If you have any questions about this application please email me at fubzee@gmail.com