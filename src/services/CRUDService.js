import bcryptjs from 'bcryptjs';
import bcrypt from 'bcryptjs/dist/bcrypt';
import { use } from 'express/lib/application';
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

//Get all user
let getAllUser = ()=>{
    return new Promise(async(resovle, reject)=>{
        try {
            let data = db.User.findAll({
                raw: true
            });
            resovle(data);
        } catch (e) {
            reject(e)
        }
    })
}
//Get user
let getUser = (user)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let dataUser = await db.User.findOne({ 
                where: { id: user },
                raw: true 
            })
            resolve(dataUser)
        } catch (e) {
            reject(e)
        }
    })
}
//Update user
let updateUser = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                await user.save();
                resolve()
            }else{
                resolve()
            }
        } catch (e) {
            reject(e)
            
        }
    })
}

module.exports = {
    createNewUser : createNewUser,
    getAllUser: getAllUser,
    getUser: getUser,
    updateUser: updateUser
}