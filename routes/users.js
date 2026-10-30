const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router();
/**
 * Route: / user
 * Method: /Get
 * Description:/Get all the list of user in the system
 * Access: Public
 * Parameters: None
 * 
 * 
 */

router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data:users
    })
})

/**
 * Route: / user/:id
 * Method: /Get
 * Description:/Get a user by their ID
 * Access: Public
 * Parameters: None
 * 
 * 
 */
router.get('/:id',(req,res)=>{
    const{id}=req.params;
    const user = users.find((each)=>each.id === Number(id))
    if(!user){
      return  res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data:user
    })
})

/**
 * Route: / users
 * Method: /Get
 * Description:/Create /regidter a new user
 * Access: Public
 * Parameters: None
 * 
 * 
 */


    // "id": 2,
	// 	"name": "Maya Patel",
	// 	"surname": "Patel",
	// 	"email": "maya.patel@example.com",
	// 	"role": "librarian",
	// 	"issuedbooks": [],
	// 	"subscription date": null,
	// 	"return date": null,
	// 	"subscription type": null,
	// 	"issued date": null

    router.post('/',(req,res)=>{

        // req.body should have the following fields 
    const {id, name,surname, email, subscriptionType, subscriptionDate} =req.body;
    // check if all the required fieds are present
    if(!id || !name || !surname || !email || !subscriptionDate || !subscriptionType){
        return res.status(400).json({
            success:false,
            message:"Please provide all the reqired fileds"
        })
    }
    // Check if the user already exissts
    const user = users.find((each)=>each.id === id)
    if (user){
        return res.status(409).json({
            success:false,
            message:`User Already Exists with id : ${id}`
        })
    }

    // if all checks pass, create the user 
    // and push it to the users array
    users.push({id,name,surname,email,subscriptionDate,subscriptionType
    })

    res.status(201).json({
        success: true,
        message:"User Created Successfully"
    })
})



/**
 * Route: / users/id
 * Method: put
 * Description:Updating a user by their ID
 * Access: Public
 * Parameters:ID
 * 
 * 
 */

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find(
        (each) => each.id === Number(id)
    );

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found for ID ${id}`
        });
    }

    const updatedUser = users.map((each) => {
        if (each.id === Number(id)) {
            return {
                ...each,
                ...data
            };
        }

        return each;
    });

    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User updated successfully"
    });
});


/**
 * Route: / users/id
 * Method: dlete
 * Description:deleteing a user by their ID
 * Access: Public
 * Parameters:ID
 * 
 * 
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(
        (each) => each.id === Number(id)
    );

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `User not found for ID ${id}`
        });
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    res.status(200).json({
        success: true,
        data: deletedUser,
        message: "User deleted successfully"
    });
});


module.exports = router;