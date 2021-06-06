module.exports = [
    {
        method: "GET",
        url: '/ping',
        auth: false,
        handler: (req,res)=>{
            res.send({status: 200, message: "Sucess"});
        },
        schema: {
            description: "Api Service Health Check",
            tags: ["health"]
        }
    }
]