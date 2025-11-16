// const jwt = require("jsonwebtoken");
// const salt = "hhhhwu8whennvui847%^$jbi";

// const authentication = (req, res, next) => {
//   const token = req.cookies.jwt; // ✅ from cookies
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: please log in" });
//   }

//   try {
//     const decoded = jwt.verify(token, salt); // ✅ decode token
//     req.user = decoded; // ✅ attach user data (id, email, etc.)
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = authentication;
const jwt = require('jsonwebtoken');
const salt = 'hhhhwu8whennvui847%^$jbi';

const authentication = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: please log in" });
  }

  try {
    const decoded = jwt.verify(token, salt);

    // ✅ Make sure req.user contains the id field
    req.user = {
      id: decoded.id,  // this matches your jwt.sign({ email, id: user._id })
      email: decoded.email,
      role: decoded.role
    };
    console.log(req.user.email)
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authentication;
