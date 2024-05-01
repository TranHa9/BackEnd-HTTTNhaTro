import { where } from 'sequelize'
import db from '../models'
import bcrypt from 'bcryptjs';



const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const createUser = ({ name, phone, password, role }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.create({
            name: name,
            password: hashPassword(password),
            phone: phone,
            role: role
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
            zalo: body.zalo,
            avatar: body.avatar,
            role: body.role,
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

export const updatePassword = ({ userId, oldPassword, newPassword, confirmPassword }) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            resolve({
                err: 1,
                msg: 'Người dùng không tồn tại',
            });
            return;
        }
        const isPasswordValid = user && bcrypt.compareSync(oldPassword, user.password)
        if (!isPasswordValid) {
            resolve({
                err: 2,
                msg: 'Mật khẩu cũ không chính xác',
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            resolve({
                err: 3,
                msg: 'Mật khẩu mới và xác nhận mật khẩu không khớp',
            });
            return;
        }
        await user.update({ password: hashPassword(newPassword) })
        resolve({
            err: 0,
            msg: 'Đã chỉnh sửa',
        })
    } catch (error) {
        reject(error)
    }
})
