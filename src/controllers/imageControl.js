const Clarifai = require('clarifai');



const app = new Clarifai.App({
    apiKey: 'a6f8a93f608e442382f91aa8b76bd5ec'
})


const imageApiCall = (req,res) => {
    console.log(req.body.linkImage)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.linkImage)
          .then(data => res.json(data))
          .catch(err => console.log(err))   
}

const imageControl = (req,res,db) => {
     const {id} = req.body // get from body
       
    db.raw('select increm_entries(?)', id) //function
        .then(response => res.json(response.rows[0].increm_entries))
        .catch(err => res.status(400).json(err));

     
}

module.exports = {
  imageControl: imageControl,
  imageApiCall: imageApiCall
}