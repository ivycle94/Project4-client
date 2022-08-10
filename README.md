# Bastion
A one stop app where gamers or battle station enthusiasts can showcase their setup or get inspiration and help for their own setup.

https://go-bastion.herokuapp.com/

# User Story:
**As a Public User:**
- view the index page of all PC setups available.
- click and view individual PC setups to see specific inormation.
- sign up

**As a Logged in User:**
- login.
- view the index page of all PC setups available.
- click and view individual PC setups to see specific inormation.
- edit and remove PC setups that the user created.
- add tags to their pc setup.
- create a a new PC setup for other user's to see publicly.
- post or delete comments on other people's PC setups.
- logout.

# Routes Table:

| Endpoint         | Component | `AuthenticatedRoute`? |
|------------------|-------------------|-------|
| `/sign-up`       | `SignUp`    | No |
| `/sign-in`       | `SignIn`    | No |
| `/setups`  | `Index`     | No |
| `/setups/:setupId`  | `Show`| No |
| `/setups/:setupId`  | `Update`| yes |
| `/addSetup`      | `Create`   | Yes | 
| `/tags/:setupId/:tagId`  | `Patch`| Yes |

# Wireframe:
![layout](public/WRFMp4.jpg)

# Tech Used:
- HTML
- Javascript
- React
- Boostrap
- CSS
- Axios
- MongoDB
- Mongoose
- Express

# Stretch Goals:
- Add the ability to save a pc setup to a user's personal list
- Add the ability to search for pc setups with specific tags
- Adjust styling to be more clean
- Add Cloudinary (External API), so users can upload images instead of pasting a image link
    * https://cloudinary.com/
- more to come !
