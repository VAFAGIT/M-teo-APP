const User = require("../models/users");
const bcrypt = require('bcryptjs');


// Create User

const CreateUser = async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.send({
          message: "User already exists",
          success: false,
          data: null,
        });
      }

      const User = await Admine.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      const hashedPassword = await bcrypt.hash(req.body.password, 6);
      req.body.password = hashedPassword;
      const newUser = new User(req.body);
      await newUser.save();
      res.send({
        message: "User created successfully",
        success: true,
        data: null,
      });
    } catch (error) {
      res.send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  };

// Login User

const Login = async (req, res) => {
    
    try {
        const user = await User
        .findOne
        ({
            email: req.body.email
        });
        if (!user) {
            return res.send({
                message: "User not found",
                success: false,
                data: null,
            });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.send({
                message: "Invalid password",
                success: false,
                data: null,
            });
        }
        res.send({
            message: "Login successful",
            success: true,
            data: null,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null,
        });
    }

    
};

module.exports = { CreateUser, Login };