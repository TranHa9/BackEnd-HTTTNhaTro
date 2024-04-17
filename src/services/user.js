import { where } from 'sequelize'
import db from '../models'

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