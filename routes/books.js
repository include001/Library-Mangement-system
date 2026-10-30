const express = require("express");
const {books} = require("../data/books.json")
const {users} = require("../data/users.json")

const router = express.Router();


/**
 * Route: / books
 * Method: /Get
 * Description:/Get all the list of books in the system
 * Access: Public
 * Parameters: None
 * 
 * 
 */

router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data:books,
    })
})

/**
 * Route: / books/:id
 * Method: /Get
 * Description:/Get a book by their ID
 * Access: Public
 * Parameters: id
 * 
 * 
 */
router.get('/:id',(req,res)=>{
    const{id}=req.params;
    const book = books.find((each)=>each.id === Number(id))
    if(!book){
      return  res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data:book
    })
})


/**
 * Route: / books
 * Method: /Get
 * Description:/Create /regidter a new book
 * Access: Public
 * Parameters: None
 * 
/
 */

    router.post('/',(req,res)=>{

        // req.body should have the following fields 
    const {id,title,author,genre,publishedYear} =req.body;
    // check if all the required fieds are present
    if(!id || !title || !author || !genre || !publishedYear){
        return res.status(400).json({
            success:false,
            message:"Please provide all the reqired fileds"
        })
    }
    // Check if the user already exissts
    const book = books.find((each)=>each.id === Number(id))
    if (book){
        return res.status(400).json({
            success:false,
            message:`book Already Exists with id : ${id}`
        })
    }

    // if all checks pass, create the user 
    // and push it to the users array
    books.push({id,title,author,genre,publishedYear
    })

    res.status(201).json({
        success: true,
        message:"User Created Successfully",
        data: {id,title,author,genre,publishedYear}
    })
})



/**
 * Route: / books/id
 * Method: put
 * Description:Updating a book by their ID
 * Access: Public
 * Parameters:ID
 * 
 * 
 */

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
 // Check if the books exits
    const book = books.find(
        (each) => each.id === Number(id)
    );

    if (!book) {
        return res.status(404).json({
            success: false,
            message: `book not found for ID ${id}`
        });
    }

    const updatedbook = books.map((each) => {
        if (each.id === Number(id)) {
            return {
                ...each,
                ...(data || req.body)
            };
        }

        return each;
    });

    res.status(200).json({
        success: true,
        data: updatedbook.find((each) => each.id === Number(id)),
        message: "Book updated successfully"
    });
});


/**
 * Route: / books/id
 * Method: dlete
 * Description:deleteing a book by their ID
 * Access: Public
 * Parameters:ID
 * 
 * 
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(
        (each) => each.id === Number(id)
    );

    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `book not found for ID ${id}`
        });
    }

    const deletedBook = books.splice(bookIndex, 1)[0];

    res.status(200).json({
        success: true,
        data: deletedBook,
        message: "Book deleted successfully"
    });
});



/**
 * Route: / books/id
 * Method: Get
 * Description:Get all issued book
 * Access: Public
 * Parameters:ID
 * 
 * 
 */
router.get('/issued/for-user', (req, res) => {
    const issuedBooks = books.filter((book) => {
        const issued = book.issuedBooks ?? book.issuedBook;
        return Array.isArray(issued) ? issued.length > 0 : Boolean(issued);
    });

    res.status(200).json({
        success: true,
        data: issuedBooks
    });
});



module.exports = router;