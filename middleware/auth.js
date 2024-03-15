const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }
    try {
      const decodeToken = jwt.verify(token, "Anurag");
      // console.log(decodeToken);  // try krna
      req.user = decodeToken;
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: `token is invalid ${error}` });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token ${error}`,
    });
  }
};
