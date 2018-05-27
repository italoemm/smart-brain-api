
const signinControl = (req,res,bcrypt,db) => {
    const {email, password} = req.body
    
    db.select('email', 'hash').from('login')
	   .where('email','=',email)
	   .then(data => {
	     const isValid = bcrypt.compareSync(password,data[0].hash);
		if(isValid){
          return db.select('*').from('users')
                   .where('email', '=', email)      /*-- if anithing goes wrong this is going trigger the catch and return a string--*/
                   .then(user => res.json(user[0])) 
                   .catch(err => res.status(400).json('unable to get user problem in BD')); // it's going trigger if the email or password is right but something happen in BD 
            }else{
               res.status(400).json('unable to get user password wrong'); //it's going trigger if the password is wrong
            }
		}).catch(err => res.status(400).json('wrong credentials but now is email'))//it's going trigger if the email is wrong
    
}

module.exports = {
    signinControl: signinControl
}