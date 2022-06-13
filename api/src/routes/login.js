const { Router } = require("express");
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const router = Router();

router.post('/', async (req, res)=>{
	try {
		const {email, password} = req.body;
		let user = await User.findOne({where: {email, password}});
		if(user){
			const tokenJwt = jwt.sign(
				{ id: user.id, email: user.email },
				SECRET_KEY
			);
			res.status(200).json({token: tokenJwt, user});
		} 
	} catch (error) {
		res.status(400).send(err)
	}
});

router.post('/getUser', async (req, res, next) => {
  try {
    const { id, email } = jwt.verify(req.body.token, SECRET_KEY);
	  const user = await User.findOne({where: { id, email }});
	  res.status(200).json(user);
	} catch (error) {
	  res.status(400).send(error)
	}
})

module.exports = router;