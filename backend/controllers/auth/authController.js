import { sql } from "../../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
      console.log("Incoming registration data:", req.body);
  const {
    first_name,
    middle_name,
    last_name,
    user_type,
    email_address,
    password,
  } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await sql`
        INSERT INTO users (
            first_name,
            middle_name,
            last_name,
            user_type,
            email_address,
            password
        ) VALUES (${first_name}, ${middle_name}, ${last_name}, ${user_type}, ${email_address}, ${hashedPassword})
        RETURNING user_id, first_name, last_name, user_type, email_address;
        `; 
        res.status(200).json(result[0]);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register the user" });
  }
};

export const login = async (req, res) => {
    const { email_address, password } = req.body;
    if (!email_address || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try{
        const users = await sql`
         SELECT * FROM users WHERE email_address = ${email_address};
        `;

        const user = users[0];
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign(
            {id:user.user_id, user_type: user.user_type}, process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )
        res.status(200).json({token})
    }catch(err){
            res.status(500).json({message: "Something went wrong"})
    }

};
