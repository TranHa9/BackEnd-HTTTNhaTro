import db from "../models";
import { Op, where } from "sequelize";
import { v4 as generateId } from 'uuid';
import generateCode from '../ultis/generateCode';
import moment from 'moment'

export const getPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Lấy dữ liệu post thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const getPostsLimistService = (page, { limitPost, order, ...query }, { price, area, provinceId, districtId, wardId }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : +page - 1
        const queries = { ...query }
        const limit = +limitPost || +process.env.LIMIT
        queries.limit = limit
        if (price) query.price = { [Op.between]: price }
        if (area) query.area = { [Op.between]: area }
        if (provinceId) query.provinceId = provinceId;
        if (districtId) query.districtId = districtId;
        if (wardId) query.wardId = wardId;
        if (order) queries.order = [order]
        const response = await db.Post.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            include: [
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Lấy dữ liệu post thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const getNewPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [
                ['createdAt', 'DESC']
            ],
            limit: +process.env.LIMIT,
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Lấy dữ liệu post thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const createNewPostService = (body, userId) => new Promise(async (resolve, reject) => {
    try {
        //const currentDate = new Date()
        await db.Post.create({
            name: body.name,
            address: body.address || null,
            categoryId: body.categoryId,
            description: body.description || null,
            userId,
            images: JSON.stringify(body.images),
            target: body?.target,
            area: body.area || null,
            price: body.price || null,
            provinceId: body.provinceId || null,
            districtId: body.districtId || null,
            wardId: body?.wardId || null,
            created: new Date(),
            expired: body.expired
            //expired: moment(currentDate).add(10, 'd').toDate()
        })
        resolve({
            err: 0,
            msg: 'OK',
        })
    } catch (error) {
        reject(error)
    }
})

export const getPostsLimistAdminService = (page, id, query) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : +page - 1
        const queries = { ...query, userId: id }
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Lấy dữ liệu post thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const updatePost = ({ postId, ...body }) => new Promise(async (resolve, reject) => {
    try {
        const labelCode = generateCode(body.label)
        await db.Post.update({
            name: body.name,
            address: body.address || null,
            categoryId: body.categoryId,
            description: body.description || null,
            area: body.area || null,
            price: body.price || null,
            target: body.target || null,
            images: JSON.stringify(body.images),
        }, {
            where: { id: postId }
        })
        resolve({
            err: 0,
            msg: 'Đã chỉnh sửa',
        })
    } catch (error) {
        reject(error)
    }
})

export const deletePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.destroy({
            where: { id: postId },
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