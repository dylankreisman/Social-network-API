# Social-network-API

## Project Description
This backend application was meant to build an API for a social network where users can share thoughts, create a profile, react to friends' thoughts, and add friends. 

## Languages and Technologies Used
- JavaScript
- MongoDB
- Mongoose
- Express
- Node.js

## Project Demonstration
![Video](https://www.youtube.com/watch?v=tNNeiiDpIuo)

## Code Snippet
The code below shows the proces of finding a single thought by its id. Once a get request is made with the correct URL of the id, the thought as well as the user that made the thought is displayed.
```
  getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtID})
        .then((thought) => {
            if (!thought){
                res.status(400).json({ message: "No thought with this id!"})
            }
            else {
                res.json(thought)
            }
        })
        .catch((err) => res.status(500).json(err))
    },
```
## Author Links
- ![GitHub](https://github.com/dylankreisman)
- ![LinkedIn](https://www.linkedin.com/in/dylan-kreisman-3752b1160/)