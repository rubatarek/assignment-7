import { Router } from "express";
import { userModel } from "../../database/model/users.model.js";


const router = Router();


router.get('/users/by-email', async (req, res) => {
    let { email } = req.query;

    let user = await userModel.findOne({ where: { email } });
    if (!user) {
        return res.json({ message: 'no user found' });
    }

    res.json({ user });
});

router.get('/get-user-by-id/:id', async (req, res) => {
    let{id} = req.params;   
    let userData =  await userModel.findByPk(id, {
        attributes: { exclude: ['role'] }
    })
if(!userData ){
 return res.json("No user data found");
}
else{
    res.json({message: 'user data', userData});
}

})


router.post('/users/signup', async (req, res) => {
    try{
    let { name, email, password, role } = req.body ;
    let existUser = await userModel.findOne({ where: { email } });
    if (existUser) {
        return res.json({ message: 'User with this email already exists' });
    }
    let addedUser = await userModel.create({ name, email, password, role });
        if(addedUser){
    res.json({ message: 'User added successfully',  addedUser });
        }
        else{
           return res.json({ message: 'Failed to add user' });
        }
    }
        catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.json({ message: error.errors[0].message });
        }
        return res.json({ message: error.message });
    }
});

 router.put('/users/:id', async (req, res) => {
    try{

let { id } = req.params;
let { name, password, role } = req.body ;
let updateUser = await userModel.update({ name, password, role }, { where: { id } });

if (updateUser[0] > 0) {

    res.json({ message: 'User updated successfully' });

}
else {
    return res.json({ message: 'No user found to update' });
}
    }
    catch (error) {
        return res.json({ message: error.message });
    }
 })

export default router;