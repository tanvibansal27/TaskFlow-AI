import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  console.log("===== AUTH MIDDLEWARE =====");
  console.log("Headers:", req.headers.authorization);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED:", decoded);

      req.user = decoded;

      next();
    } catch (error) {
      console.log("JWT ERROR:", error.message);

      return res.status(401).json({
        message: "Not Authorized, Invalid Token",
      });
    }
  } else {
    console.log("NO AUTH HEADER");
  }

  if (!token) {
    return res.status(401).json({
      message: "Not Authorized, No Token",
    });
  }
};

export default protect;