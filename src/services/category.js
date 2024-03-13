import db from '../models'

//Lấy tất cả các danh mục
export const getCategoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAll({
            raw: true,
            attributes: ['code', 'value']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Thành công' : 'Lấy danh mục thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})