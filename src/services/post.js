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
            where: { status: 'Đã duyệt' }
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
//Lấy tất cả bài đăng đã duyệt và còn hoạt động
export const getPostsLimistService = (page, { limitPost, order, expired, ...query }, { price, area, provinceId, districtId, wardId }) => new Promise(async (resolve, reject) => {
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
        const currentDate = new Date();
        query.expired = { [db.Sequelize.Op.gte]: currentDate }; // Lấy các bài đăng có expired >= currentDate
        const response = await db.Post.findAndCountAll({
            where: { ...query, status: 'Đã duyệt' },
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            include: [
                { model: db.Category, as: 'category' },
                { model: db.User, as: 'user' },
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

//Lấy tất cả các bài đăng mới nhất
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
            where: { status: 'Đã duyệt' }
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

//Tạo bài đăng mới
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
            expired: body.expired,
            //expired: moment(currentDate).add(10, 'd').toDate()
            status: 'Đang chờ duyệt'
        })
        resolve({
            err: 0,
            msg: 'OK',
        })
    } catch (error) {
        reject(error)
    }
})

//Thêm tin muốn lưu
export const addSavedPost = (postId, userId) => new Promise(async (resolve, reject) => {
    try {
        const post = await db.Post.findByPk(postId);
        if (!post) {
            return reject({ error: 'Bài post không tồn tại' });
        }
        const existingSavedPost = await db.SavePost.findOne({
            where: {
                userId,
                postId,
            }
        });
        if (existingSavedPost) {
            return reject({ error: 'Bài post đã được lưu trước đó' });
        }
        await db.SavePost.create({
            userId,
            postId,
        })
        resolve({
            err: 0,
            msg: 'OK',
        })
    } catch (error) {
        reject(error)
    }
})

//Hiển thị tin  đã lưu
export const getSavePostsLimistService = (page, userId, { limitPost, order, ...query }, { price, area, provinceId, districtId, wardId }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : +page - 1
        const queries = { ...query }
        const limit = +limitPost || +process.env.LIMIT
        queries.limit = limit
        query.userId = userId
        if (price) query.price = { [Op.between]: price }
        if (area) query.area = { [Op.between]: area }
        if (provinceId) query.provinceId = provinceId;
        if (districtId) query.districtId = districtId;
        if (wardId) query.wardId = wardId;
        if (order) queries.order = [order]
        const response = await db.SavePost.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            include: [
                {
                    model: db.Post,
                    as: 'post',
                    include: [
                        { model: db.Category, as: 'category' },
                        { model: db.User, as: 'user' }
                    ],
                    where: { status: 'Đã duyệt' }
                }
            ],
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Lấy dữ liệu post đã lưu thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})

//Xóa tin đã lưu
export const deleteSavePost = (savePostId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.SavePost.destroy({
            where: { postId: savePostId },
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

//Lấy các bài đăng theo người dùng
export const getPostsLimistUserService = (page, id, { limitPost, order, status, ...query }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : +page - 1
        const queries = { ...query }
        const limit = +limitPost || +process.env.LIMIT
        queries.limit = limit
        query.userId = id
        if (order) queries.order = [order]
        if (status) {
            const statusInt = parseInt(status);
            if (statusInt && statusInt !== 0 && statusInt <= 2) {
                if (!isNaN(statusInt)) {
                    const currentDate = new Date();
                    if (statusInt === 1) {
                        query.expired = { [db.Sequelize.Op.gte]: currentDate }; // Lấy các bài đăng có expired >= currentDate
                        query.status = { [db.Sequelize.Op.eq]: 'Đã duyệt' };
                    } else if (statusInt === 2) {
                        query.expired = { [db.Sequelize.Op.lt]: currentDate }; // Lấy các bài đăng có expired < currentDate
                        query.status = { [db.Sequelize.Op.eq]: 'Đã duyệt' };
                    }
                }
            } else if (statusInt !== 0 && statusInt > 2) {
                if (!isNaN(statusInt)) {
                    if (statusInt === 3) {
                        query.status = { [db.Sequelize.Op.eq]: 'Đang chờ duyệt' };
                    } else if (statusInt === 4) {
                        query.status = { [db.Sequelize.Op.eq]: 'Đã hủy' };
                    }
                }
            }
        }
        const response = await db.Post.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            // order: [
            //     ['createdAt', 'DESC']
            // ],
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
//Cập nhật bài đăng
export const updatePost = ({ postId, ...body }) => new Promise(async (resolve, reject) => {
    try {
        await db.Post.update({
            name: body.name,
            address: body.address,
            categoryId: body.categoryId,
            description: body.description,
            area: body.area,
            price: body.price,
            target: body.target,
            images: JSON.stringify(body.images),
            expired: body.expired,
            status: body.status
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
//Xóa bài đăng
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
//Lấy tất cả bài đăng đang chờ duyệt
export const getPostsStatusService = (page, { limitPost, order, ...query }, { price, area, provinceId, districtId, wardId }) => new Promise(async (resolve, reject) => {
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
            where: { ...query, status: 'Đang chờ duyệt' },
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            include: [
                { model: db.Category, as: 'category' },
                { model: db.User, as: 'user' },
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
//Lấy tất cả bài đăng lấy tất cả bài đăng đã duyệt
export const getPostsAllAdminService = (page, { limitPost, order, status, categoryId, useName, ...query }, { price, area, provinceId, districtId, wardId }) => new Promise(async (resolve, reject) => {
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
        if (categoryId && categoryId != '0') query.categoryId = categoryId
        if (status) {
            const statusInt = parseInt(status);
            if (statusInt && statusInt !== 0 && statusInt <= 2) {
                if (!isNaN(statusInt)) {
                    const currentDate = new Date();
                    if (statusInt === 1) {
                        query.expired = { [db.Sequelize.Op.gte]: currentDate }; // Lấy các bài đăng có expired >= currentDate
                        query.status = { [db.Sequelize.Op.eq]: 'Đã duyệt' };
                    } else if (statusInt === 2) {
                        query.expired = { [db.Sequelize.Op.lt]: currentDate }; // Lấy các bài đăng có expired < currentDate
                        query.status = { [db.Sequelize.Op.eq]: 'Đã duyệt' };
                    }
                }
            } else if (statusInt > 2) {
                if (!isNaN(statusInt)) {
                    if (statusInt === 3) {
                        query.status = { [db.Sequelize.Op.eq]: 'Đang chờ duyệt' };
                    } else if (statusInt === 4) {
                        query.status = { [db.Sequelize.Op.eq]: 'Đã hủy' };
                    }
                }
            }
        }
        if (useName) {
            query['$user.name$'] = { [db.Sequelize.Op.like]: `%${useName}%` };
        }
        const response = await db.Post.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            include: [
                { model: db.Category, as: 'category' },
                { model: db.User, as: 'user' },
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
