//Data Transfer Object 

class issuedBook{
    _id;
    name;
    auther;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;

    constructor(user){
        this._id = user.issuedBook._id;
        this.name = user.issuedBook.name;
        this.auther = user.issuedBook.auther;
        this.genre = user.issuedBook.genre;
        this.price = user.issuedBook.price;
        this.publisher = user.issuedBook.publisher;
        this.issuedBy = user.name;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }
}

module.exports = issuedBook;