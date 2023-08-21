const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../Model/blackListModel");

const auth = async (req, res, next) => {
  const headers = req.headers.authorization;
  try {
    if (headers) {
      const blacklist = await BlackListModel.find({
        blacklist: { $in: headers },
      });
      if (blacklist.length > 0) {
        res.send({ msg: "Plaese Login 0 !!" });
      }
      jwt.verify(headers, "omkar", (err, decoded) => {
        if (decoded) {
          req.body.userID = decoded.userID;
          req.body.user = decoded.user;
          next();
        } else if (err) {
          res.send({ msg: "Plaese Login 1 !!", err });
        }
      });
    } else {
      res.send({ msg: "Plaese Login 2 !!" });
    }
  } catch (error) {
    res.send({ msg: "Plaese Login 3 !!" });
  }
};
module.exports = { auth };
