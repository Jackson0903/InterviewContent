const bcrypt = require('bcrypt');
const db = require('../model');
const jwt = require('jsonwebtoken');
const { createdat } = require('../Utils/function');
require('dotenv').config();

module.exports = {
    signup: async (req, res) => {
        try {
            const { UserName, Password,email } = req.body;
            const saltRounds = 10; 
            const checkuser = await db.user.findOne({where : {email}})
            if (checkuser) {
                return res.json({status : false, message : "Email Id Registered!!!"})
            }
            const hashedPassword = await bcrypt.hash(Password, saltRounds);
            const useradd = await db.user.create({
                UserName,
                Password: hashedPassword,
                email : email,
                CreatedDate: await createdat()
            });
            const token = jwt.sign(
                { UserId: useradd.UserId }, 
                process.env.JWT_KEY, 
                { expiresIn: '7d' }
            );
            await db.user.update({ Token: token }, { where: { UserId: useradd.UserId } });
            await db.activity.create({Userid : useradd.UserId, Type : "User Created Sucessfully", CreatedAt : await createdat(), CreatedBy: useradd.UserId})
            return res.json({ status: true, message: "User Created Successfully", token });
        } catch (error) {
            console.error(error);
            return res.json({ status: false, message: "Something Went Wrong" });
        }
    },
    login: async (req, res) => {
        try {
            const { email, Password } = req.body;
            const user = await db.user.findOne({ where: { email },raw:true });
            if (!user) {
                return res.json({ status: false, message: "User not found" });
            }
            const isMatch = await bcrypt.compare(Password, user.Password);
            if (!isMatch) {
                return res.json({ status: false, message: "Incorrect password" });
            }
            const token = jwt.sign({ UserId: user.UserId }, process.env.JWT_KEY, { expiresIn: '7d' });
            await db.activity.create({Userid : user.UserId, Type : "Login Sucessfully", CreatedAt : await createdat(), CreatedBy: user.UserId})
            return res.json({ status: true, message: "Login successful", token });
        } catch (error) {
            console.error(error);
            return res.json({ status: false, message: "Something Went Wrong" });
        }
    }
};
