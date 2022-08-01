const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:9100",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Cors cannot allow this origin"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = { corsOptions, allowedOrigins };
