import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
require('dotenv').config();


const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const registerService = ({ phone, password, name }) => new Promise(async (resolve, reject) => {
    try {
        const [user, created] = await db.User.findOrCreate({
            where: { phone },
            defaults: {
                phone,
                name,
                password: hashPassword(password),
                role: 'user'
            }
        })
        if (created) {
            const token = jwt.sign({ id: user.id, phone: user.phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
            resolve({
                err: 0,
                msg: "Đăng ký thành công !",
                user,
                token
            });
        } else {
            resolve({
                err: 2,
                msg: "Số điện thoại này đã được sử dụng",
                token: null,
                user: null
            })
        }
    } catch (error) {
        reject(error)
    }
})
export const loginService = ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { phone },
            raw: true,
            attributes: ['id', 'name', 'phone', 'role', 'password']
        })
        if (!response) {
            resolve({
                err: 2,
                msg: "Số điện thoại không chính xác",
                token: null,
                user: null
            });
            return;
        }
        const checkPassword = response && bcrypt.compareSync(password, response.password)
        const token = checkPassword && jwt.sign({ id: response.id, phone: response.phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
        delete response.password
        const user = checkPassword ? response : {}
        resolve({
            err: token ? 0 : 2,
            msg: token ? "Đăng nhập thành công !" : "Mật khẩu không chính xác !",
            token: token || null,
            user
        })
    } catch (error) {
        reject(error)
    }
})