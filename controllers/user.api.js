const bcrypt = require("bcrypt");
const _ = require("lodash");

const db = require("../service/db.service");
// const sendEmailuser = require("../utils/sendEmailuser");
const User = db.User;
const validator = require("email-validator")


exports.userCreation = async (req, res) => {
    let created_dateTime = new Date();
    let year = created_dateTime.getFullYear();
    let month = ("0" + (created_dateTime.getMonth() + 1)).slice(-2);
    let day = ("0" + created_dateTime.getDate()).slice(-2);
    let hour = created_dateTime.getHours();
    let minute = created_dateTime.getMinutes();
    let seconds = created_dateTime.getSeconds();
    created_dateTime =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds;
    
    const salt =  await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt);
    let email = validator.validate(req.body.email)
    if (!email){
        return res.status(400).send("email validation failed")
    }
    let user_id = req.body.user_id;
    let user = await User.findOne({  where: {user_id: req.body.user_id }  });
    console.log(user,"1.....")
    if (user) {
      return res.status(400).json({
        responseCode: 400,
        errorMessage: "user already exists",
      });
    } else {
        users = await User.create({
            user_id: user_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name, 
            email: req.body.email,
            password: password,
            phone_number: req.body.phone_number,
            created_by: user_id,
            updated_by: user_id,
            created_date: created_dateTime,
            updated_date: created_dateTime,
            status: 'active',
        })
        .then(async(users) => {
            // let newuseremail = users.email;
            // await sendEmailuser(newuseremail)
            res.status(200).json({
                responseCode: 200,
                message: "user was created successfully",
                user: users,
            })
        })
        .catch((error) => {
            console.log('1',error)
            res.status(500).json({
                responseCode: 500,
                errorMessage: "error"
            });
        });
    }
}

