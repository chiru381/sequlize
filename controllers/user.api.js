const bcrypt = require("bcrypt");
const _ = require("lodash");
const validator = require("email-validator")
const dateTime = require("node-datetime")

const db = require("../service/db.service");
const User = db.User;
const Otp = db.Otp;
const sendEmail = require("../utils/sendEmail");
const auth = require("../utils/auth");
// const sendEmailuser = require("../utils/sendEmailuser");

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

exports.getallUsers = (req, res) => {
    User.findAll()
    .then((User) => {
      res.status(200).json({
        responseCode: 200,
        message: "Get all User Success",
        UserList: User,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        responseCode: 400,
        message: "Error in getting all users",
        error: error,
      });
    });
};

exports.userUpdate = (req, res) => {
    console.log(req.body)
    let created_dateTime = new Date();
    let year = created_dateTime.getFullYear();
    let month = ("0" + (created_dateTime.getMonth() + 1)).slice(-2);
    let day = ("0" + created_dateTime.getDate()).slice(-2);
    let hour = created_dateTime.getHours();
    let minute = created_dateTime.getMinutes();
    let seconds = created_dateTime.getSeconds();
    created_dateTime =
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds;
    // console.log("creating");
    let user_id = req.body.user_id;
  
    User.update( {
      first_name: req.body.first_name,
      last_name: req.body.last_name, 
      email: req.body.email,
      phone_number: req.body.phone_number,
      created_date: created_dateTime,
      updated_date: created_dateTime,
      status: 'active',
    }, {where : { user_id: user_id},}
    )
    .then(User => {
      if (User) {
        res.status(200).send({
          responseCode: 200,
          message: "updated successfully."
        });
      } else {
        res.status(400).send({
        errorMessage: `Cannot update user with user_id=${user_id}. Maybe user_id was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      responseCode: 500,
      errorMessage: "Error updating user with user_id=" + user_id
    });
  });
};

exports.userlogin = async (req, res) => {
    const { user_id, password } = req.body;
    const user = await User.findOne({
      where : { user_id }
    });
    if(!user) return res.status(404).json({
      errorMessage:"user_id does not exist",
    });
    const validatePassword = await bcrypt.compare(
      password,
      user.password,
      )
  
      if(!validatePassword) {
        res.status(400).json({ errorMessage: "password does not match" })
      } else {
        res.status(200).json({
          responseCode: 200, 
          message: "Login successful",
          user: _.pick(user,  [
            "user_key",
            "user_id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "created_date",
            "status",
          ]),
          
        })
      }
};

exports.deleteuser = (req, res) => {
    const user_id = req.params.user_id;
    User.destroy({
      where: { user_id: user_id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            responseCode: 200,
            message: "user_id was deleted successfully!"
          });
        } else {
          res.status(400).send({
            responseCode: 400,
            errorMessage: `Cannot delete user_id with id=${id}. Maybe user_id was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            responseCode: 500,
            errorMessage: "Could not delete user_id with user_id=" + user_id
        });
      });
};

exports.changeuser = async (req, res) => {
    let olduser = await User.findOne({ where: {user_id: req.body.user_id } });
    if (!olduser)
    return res.status(400).json({
      responseCode: 400,
      errorMessage: "user with given user_id not found",
    });
    // console.log(olduser.password, '................oldpassword');
    // console.log(req.body.newPassword, '............postman password');
    // console.log("testing jenkins")
    const raje = await bcrypt.compare(req.body.password, olduser.password);
    console.log('..', raje);
    if (olduser.user_id === req.body.user_id && raje) {
      console.log('test successful');
      const salt =  await bcrypt.genSalt(10);
      let password = await bcrypt.hash(req.body.newPassword, salt);
      // console.log(password)
      await User.update(
        { password: password},{where: { user_id: req.body.user_id }})
        .then(num => {
          if (num == 1) {
            res.status(200).send({
              responseCode: 200,
              message: " change password updated successfully."
            });
          } else {
            res.send({
                  errorMessage: `Cannot update user with user_id=${user_id}. Maybe user_id was not found or req.body is empty!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                responseCode: 500,
                errorMessage: "Error updating user with user_id" 
              });
            });
          } else {
            res.status(400).send({
              errorMessage: "oldpassword was not matched"
            })
          }
}

exports.forgotuser = async (req, res) => {
    const forgot_user = await User.findOne({ where: {user_id: req.body.user_id } });
    if (!forgot_user)
    return res.status(400).json({
      responseCode: 400,
      errorMessage: "user with given user_id not found",
    });
    let otpCode = Math.floor(100000 + Math.random() * 900000);
    let created_date = new Date();
    let otpData = new Otp({
      user_key: forgot_user.user_key,
      user_id: req.body.user_id,
      otp: otpCode,
      created_date: created_date,
    });
    // console.log('1', otpData);
    await otpData.save();
    let email = forgot_user.email;
    // console.log(email)
    await sendEmail(email, otpCode)
    .then((forgot_user) => {
      res.status(200).json({
        responseCode: 200,
        message: "Success",
        UserList: forgot_user,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error!",
        error: error,
      });
    });
}

exports.resetuser = async (req, res) => {
  let otp = await Otp.findOne(
    { user_id: req.body.user_id }
    );
    // console.log('1', otp);
    if (!otp)
    return res.status(400).json({
      responseCode: 400,
      errorMessage: "user with given user_id or otp not found",
    });  
    const salt =  await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt);
    // console.log(password)
    User.update({
      password: password
    },
    {
      where: { user_id: req.body.user_id }
    }
    )
    .then(User => {
      if (User) {
        res.status(200).send({
          responseCode: 200,
          message: "password changed successfully."
        });
      } else {
        res.status(400).send({
          errorMessage: `Cannot update user with user_id=${user_id}. Maybe user_id was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        responseCode: 500,
        errorMessage: "Error updating user with user_id=" + user_id
      });
    });
}

exports.userValidater = async (req, res) => {
  const user = await User.findOne({ where: {user_id: req.body.user_id} });
  if (!user)
    return res.status(400).json({
      responseCode: 400,
      errorMessage: "user not exists",
    });
  else return res.json({
    responseCode: 200,
    message:"user already exists",
  });
};

exports.otpuser = async (req, res) => {
  let verifiuser = await Otp.findOne(
    { user_id: req.body.user_id } && { otp: req.body.otp }
    );
    if (!verifiuser){
      return res.status(400).json({
        responseCode: 400,
        errorMessage: "user with given user_id or otp not found",
      });
    } else{
      // using date expiry of token
      let dt = dateTime.create();
      let present_dateTime = dt.format("Y-m-d H:M:S");
      console.log('checking present_dateTime', present_dateTime);
      let db_dateTime = await db.query('SELECT created_date FROM otpschema ORDER BY created_date DESC LIMIT 1;')
      let createdDate = db_dateTime[0][0].created_date;
      let created_dateTime = new Date(createdDate).toISOString().slice(0, 19).replace('T', ' ');
      console.log('...', created_dateTime)
      let firstDate = new Date(createdDate)
      let secondDate = new Date()
      let  timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60); 
      let  oldOtp = await db.query('SELECT otp FROM otpschema ORDER BY created_date DESC LIMIT 1;')
      oldOtp= oldOtp[0][0].otp
      
      
      // logic
      if (timeDifference < 6) {
        if (oldOtp === req.body.otp) {
          return res.status(200).json({
            responseCode: 200,
            message: "otp verified ",
          })
        } else {
          res.status(400).json({
            errorMessage: "invalied otp",
          });
        }
      } else {
        res.status(400).json({
          responseCode: 400,
          errorMessage: "otp expired try to generate new otp ",
        });
      }
    }
};

exports.jwtuserlogin = async (req, res) => {
  const { user_id, password } = req.body;
  const user = await User.findOne({
    where : { user_id }
  });
  if(!user) return res.status(404).json({
    errorMessage:"user_id does not exist",
  });
  const validatePassword = await bcrypt.compare(
    password,
    user.password,
    )
    id = req.body.user_id;
    const token = auth.generateToken(id);

    if(!validatePassword) {
      res.status(400).json({ errorMessage: "password does not match" })
    } else {
      res.status(200).json({
        responseCode: 200, 
        message: "Login successful",
        token,
        user: _.pick(user,  [
          "user_key",
          "user_id",
          "email",
          "first_name",
          "last_name",
          "phone_number",
          "created_date",
          "status",
        ]),
        
      })
    }
};