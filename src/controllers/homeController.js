import { send } from 'express/lib/response';
import db from '../models/index'
import CRUDService from '../services/CRUDService'
//Get
let getHomePage = async(req, res) => {
    try{
        let data = await db.User.findAll();
        //console.log(data)
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e)
    }
    
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req,res)=>{
    return res.render('crud.ejs')
}
//Post
let postCRUD = async (req, res)=>{
    let message = await CRUDService.createNewUser(req.body)
    //console.log(message)
    return res.render('test/about.ejs')
}

//Get All data user
let displayGetCRUD = async(req, res)=>{
    let data = await CRUDService.getAllUser();
    //console.log(data);
    return res.render('getAllUser.ejs',{
        data:data
    });
}
//Get user
let getUser = async(req,res)=>{
    let user = req.query.id;
    if(user){
        let dataUser = await CRUDService.getUser(user)
        //console.log(user)
        //console.log(dataUser)
        return res.render('editUser.ejs',{
            dataUser:dataUser
        })
    }else{
        return res.send( 'User id not found!');
    }
    
    
    
}
//Update one user
let updateUser = async(req,res)=>{
    let data = req.body;
    await CRUDService.updateUser(data)
    let dataUser = await CRUDService.getAllUser();
    return res.render('getAllUser.ejs',{
        data:dataUser
    });
}

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getUser: getUser,
    updateUser: updateUser
}
