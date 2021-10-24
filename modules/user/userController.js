const { readUser, readUsers, addUser } = require('../user/userService')
const config = require('../../config/index')
const response = require('../../utilities/response');
const messages = require('../user/message.json')

// create user 
const createUser = async (req, res) => {
    let head = {
        api: config.APIS.user_create,
    }
    let data = [];
    for (let i in req.body) {
        let searchQuery = { Email: req.body[i].email }
        let searchEmail = await readUser(searchQuery);

        if (searchEmail) {
            data.push({
                email: req.body[i].email,
                messages: messages.email_already_exist
            })

        } else {
            let insertData = {
                First_name: req.body[i].firstName,
                Last_name: req.body[i].lastName,
                Introduction: req.body[i].introduction,
                Email: req.body[i].email,
                Phone: req.body[i].phone,
                Experience: req.body[i].experience,
                Achievements: req.body[i].achievements
            }
            const insertDataToDb = await addUser(insertData);
            if (!insertDataToDb) {
                data.push({
                    email: req.body[i].email,
                    messages: messages.user_creation_failed
                })

            } else {
                data.push({
                    email: req.body[i].email,
                    messages: messages.user_created
                })
            }
        }
    }

    result = {
        code: config.HTTP_STATUS_CODES.Success,
        status: config.STATUS.SUCCESS,
        message: messages.user_created
    };
    return response.success(res, result, head, data);

}
// read all users 
const listUsers = async (req, res) => {
    let head = {
        api: config.APIS.user_readAll,
    }
    const readAllUsers = await readUsers({}, 'First_name Last_name Email');
    let result = {
        code: config.HTTP_STATUS_CODES.Success,
        status: config.STATUS.SUCCESS,
        message: messages.user_readed
    };
    let users = [];
    for (let i in readAllUsers) {
        let data = {
            Name: readAllUsers[i].First_name + " " + readAllUsers[i].Last_name,
            Email: readAllUsers[i].Email
        };
        users.push(data);
    }
    return response.success(res, result, head, users);

}
// read a single user
const detailedRead = async (req, res) => {
    let head = {
        api: config.APIS.user_read,
    }
    let searchQuery = { Email: req.body.email };
    const detailedList = await readUser(searchQuery, '-__v -createdAt -updatedAt -_id');
    if (!detailedList) {
        let result = {
            code: config.HTTP_STATUS_CODES.Technical_Error,
            status: config.STATUS.FAILED,
            message: messages.user_not_found
        };
        return response.error(res, result, head);
    }
    let result = {
        code: config.HTTP_STATUS_CODES.Success,
        status: config.STATUS.SUCCESS,
        message: messages.user_details_readed
    };
    return response.success(res, result, head, detailedList);
}
module.exports = { createUser, listUsers, detailedRead }