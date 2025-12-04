

module.exports.addCategory = (req, res) => {
    try {
        console.log(req.file);
        res.status(200).json({ message:"Image uploaded successfully" })
    } catch (error) {
        console.log(error);
    }
}