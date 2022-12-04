import User from "../schema/User.js";
//Update
export const updateUser = async (req, res ,next) => {
    try {
        const thisupdateUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(thisupdateUser);
      } catch (err) {
        next(err);
      }
};
//Delete
export const deleteUser = async (req, res ,next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted successfully.");
      } catch (err) {
        next(err);
      }
};
//Get by Id
export const getUser = async (req, res ,next) => {
    try {
        const getUser = await User.findById(
          req.params.id,
        );
        res.status(200).json(getUser);
      } catch (err) {
        next(err);
      }
};
//Get All
export const getAllUser = async (req, res ,next) => {
    try {
      const getAllUser = await User.find();
      res.status(200).json(getAllUser);
    } catch (err) {
        next(err);
    }
  };