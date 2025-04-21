module.exports.verifayEmail = async (req, res) => {
    try {
        return res.render("pages/verifayEmail");  
    } catch (error) {
        console.log(error.message);
    }
}