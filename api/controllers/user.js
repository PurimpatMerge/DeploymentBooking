import User from "../models/User.js";

export const updateUser = async (req,res,next)=>{
  try {
    console.log(1);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}

export const getUser = async (req,res,next)=>{
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export const getUsers = async (req,res,next)=>{
  try {
    console.log(req.body.id);
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
