const handleSignin= (req, res, db, bcrypt)=>{
	const {email, password} = req.body
	
	if(!email || !password){
		return res.status(400).json('incorrect login details');
	}

	db.select('*').from('login').where({email: email})
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);

		if(isValid){
			db.select('*').from('users').where({email: email})
			.then(userProf=>{
				res.json(userProf[0]);
			}).catch(err => res.status(400).json('unable to signin'))

		}else{
			res.status(400).json('unable to sign in')
		}



	}).catch(err => res.status(400).json('unable to signin'));

}

module.exports={
	handleSignin: handleSignin
}