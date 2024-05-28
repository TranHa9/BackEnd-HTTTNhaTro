import db from '../models'

//Lấy tất cả các chuyên mục
export const getCategoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAll({
            raw: true,
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Thành công' : 'Lấy chuyên mục thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const getCategoriesLimit = (page, { limitCategory, categoryName, ...query }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : +page - 1
        const queries = { ...query }
        const limit = +limitCategory || +process.env.LIMIT
        queries.limit = limit
        if (categoryName) {
            query[db.Sequelize.Op.or] = [
                { name: { [db.Sequelize.Op.like]: `%${categoryName}%` } }
            ];
        }
        const response = await db.Category.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Thành công' : 'Lấy chuyên mục thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const createCategoriesService = ({ name, title, description }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.create({
            name: name,
            title: title,
            description: description,
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Tạo thành công' : 'thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const updateCategories = ({ categoryId, ...body }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.update({
            name: body.name,
            title: body.title,
            description: body.description,
        },
            {
                where: { id: categoryId }
            }
        )
        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? 'Đã chỉnh sửa' : 'Chỉnh sửa thất bại',
        })
    } catch (error) {
        reject(error)
    }
})
export const deleteCategory = (categoryId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.destroy({
            where: { id: categoryId }
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