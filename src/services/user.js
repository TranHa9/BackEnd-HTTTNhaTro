import { where } from 'sequelize'
import db from '../models'
import bcrypt from 'bcryptjs';



const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const createUser = ({ name, phone, password, roleId }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.create({
            name: name,
            password: hashPassword(password),
            phone: phone,
            roleId: roleId
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'tạo thành công' : 'thất bại',
        })
    } catch (error) {
        reject(error)
    }
})

export const getAllUser = (page, { limitUser, ...query }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : +page - 1
        const queries = { ...query }
        const limit = +limitUser || +process.env.LIMIT
        queries.limit = limit
        const response = await db.User.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Thành công' : 'Lấy người dùng thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Thành công' : 'Lấy người dùng thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})


export const updateUser = (payload, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(payload, {
            where: { id }
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? 'Đã chỉnh sửa' : 'Chỉnh sửa thất bại',
        })
    } catch (error) {
        reject(error)
    }
})

export const updateUserData = ({ userId, ...body }) => new Promise(async (resolve, reject) => {
    try {
        await db.User.update({
            name: body.name,
            phone: body.phone,
            zalo: body.zalo || null,
            fbUrl: body.fbUrl || null,
            avatar: body.avatar || null,
            roleId: body.roleId,
        }, {
            where: { id: userId }
        })
        resolve({
            err: 0,
            msg: 'Đã chỉnh sửa',
        })
    } catch (error) {
        reject(error)
    }
})

export const deleteUser = (userId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? 'Đã Xóa' : 'Không tìm thấy bản ghi cần xóa',
            response
        })
    } catch (error) {
        reject(error)
    }
})