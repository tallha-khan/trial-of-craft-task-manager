const User= require( '../models/User');
const bcrypt =require('bcryptjs');
const jwt =require ('jsonwebtoken');

exports.signup=async (req,res)=>{
  const{name,email,password}= req.body;

  try{
    let user=await User.findOne({email});
    if (user) return res.status(400).json({msg:'User Already Exists'});

    const hashed = await bcrypt.hash(password , 10);

    user = new User({name,email,password:hashed});
    await user.save();


    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'JWT_SECRET not set in environment' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });




  }

  catch(error){
    console.error(error); // Make sure this exists
    res.status(500).send('Server Error');
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id , email: user.email}, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
