import user from "../Model/User.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  const user = req.user;
  return res.status(200).json({ message: { user } });
};

export const updateUser = async (req, res) => {
  const { username, password, email, mobilenumber } = req.body;
  const person = await user.findById(req.user._id);
  if (person) {
    if (username) person.Name = username;
    if (email) person.Email = email;
    if (mobilenumber) person.MobileNumber = mobilenumber;
    if (password) {
      const decode = bcrypt.compareSync(password, person.Password);
      if (!decode) {
        const hashed = bcrypt.hashSync(password, 10);
        person.Password = hashed;
      }
    }
    await person.save();
  }

  res.status(200).json({
    message:"Profile Updated"
  })
};

export const deleteUser = async(req,res)=> {
  const person = await user.findByIdAndDelete(req.user._id)
  if(person) {
    res.status(200).json({
      message:"Deleted Successfully"
    })
  }

}
