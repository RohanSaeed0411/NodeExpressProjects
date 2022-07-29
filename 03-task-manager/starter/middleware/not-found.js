const notFound = (res, req) => {
  res.status(404).send("Route doesnot exist");
};

module.exports = notFound;
