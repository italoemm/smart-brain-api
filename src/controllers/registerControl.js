const registerControl = (req,res,bcrypt,db) => {
    
const { name, email, password} = req.body

    const hash = bcrypt.hashSync(password);
          db.raw('select * from register_user(?,?,?)', [name, email, hash]) //function
              .then(response => {
              console.log(response.rows[0])
              res.json(response.rows[0])
          }) //it's going make sure to return a object, otherwise  will return a array 
              .catch(err => res.status(400).json(err))
    
}

module.exports = {
  registerControl: registerControl 
}

