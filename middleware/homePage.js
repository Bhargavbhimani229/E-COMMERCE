module.exports.homePage = (rq,res,next) => {
  if(req.url === "/")
  {
    return res.render("pages/homepage");
  }
  return next();
}