

module.exports.sendEmail = async () => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}