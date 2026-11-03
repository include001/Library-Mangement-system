const {UserModel, BookModel} = require('../models');

// router.get('/',(req,res)=>{
// res.status(200).json({
//         success: true,
//         data: users
//     })
// })


exports.getAllUsers = async (req , res) => {
    const users = await UserModel.find();
    if(!users || users.length === 0){
        return res.status(404).json({
            success:false,
            message:"No users found"
        });
    }
    res.status(200).json({
        success:true,
        data:users

    });
}


exports.getSingleUserById = async(req,res)=> {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:`User Not Found for id:${id}`
        });
    }
    res.status(200).json({
        success:true,
        data:user

    });

}


exports.createUser = async(req,res) => {
    const { data } = req.body || {};

    if(!data || typeof data !== 'object' || Array.isArray(data)){
        return res.status(400).json({
            success:false,
            message:"A valid user object is required"
        });
    }

    try{
        const user = await UserModel.create(data);
        return res.status(201).json({
            success:true,
            data:user
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create user",
            error:error.message
        });
    }
}

exports.UpdateUserById = async(req,res) => {
    const { id } = req.params;
    const { data } = req.body || {};

    if(!data || typeof data !== 'object' || Array.isArray(data)){
        return res.status(400).json({
            success:false,
            message:"A valid user object is required"
        });
    }

    try{
        const user = await UserModel.findByIdAndUpdate(id, data, {
            new:true,
            runValidators:true
        });

        if(!user){
            return res.status(404).json({
                success:false,
                message:`User Not Found for id:${id}`
            });
        }

        return res.status(200).json({
            success:true,
            data:user
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update user",
            error:error.message
        });
    }
}

exports.delteUserById = async(req,res) => {
    const { id } = req.params;

    try{
        const user = await UserModel.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:`User Not Found for id:${id}`
            });
        }

        return res.status(200).json({
            success:true,
            data:user
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete user",
            error:error.message
        });
    }
}