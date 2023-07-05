const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

const handleClarifaiCall = (req, res) => {
  app.models
    .predict(
      {
        id: "a403429f2ddf4b49b307e318f00e528b",
        version: "34ce21a40cc24b6b96ffee54aabff139",
      },
      req.body.input
    )
    .then((value) => res.json(value))
    .catch((err) => {
      console.log(err.response);
      return res.status(400).json("unable to connect to Clarifai");
    });
};

const handleImages = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("Could not update entries"));
};

module.exports = {
  handleImages,
  handleClarifaiCall,
};
