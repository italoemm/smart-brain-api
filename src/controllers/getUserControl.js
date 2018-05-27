const getUserControl = (req,res,db) => {
    
     const {id} = req.params // get from URL
    
    db.select('*').table('users').where({id})
                  .then((user)=> {  
                        if(user.length){ //a array has size..so if there's any element
                            res.json(user[0])
                        }else{
                            res.status(400).json('not found')
                        }
                        }).catch(err =>res.status(400).json('not found'))
     
}

module.exports = {
  getUserControl: getUserControl 
}