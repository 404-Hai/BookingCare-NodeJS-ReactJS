import bcryptjs from 'bcryptjs';
import bcrypt from 'bcryptjs/dist/bcrypt';
import db from '../models/index'

const salt = bcrypt.genSaltSync(10);

//Create User
let createNewUser = async (data)=>{
    return new Promise (async(resolve,reject)=>{
        try {
            let hashPasswordFromBcrypt = await hashPassword(data.password);
            //console.log(hashPasswordFromBcrypt)
            await db.User.create({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1'? true:false,
                roleId: data.role,
                phoneNumber: data.phoneNumber
            })
            resolve('Add user success');
        } catch (e) {
            reject(e)
        }
    })
    
}

//Hash password
let hashPassword = (password)=>{
    return new Promise (async(resolve, reject)=>{
        try {
            var hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser : createNewUser
}