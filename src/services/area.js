import db from '../models'

export const getAreasService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Area.findAll({
            raw: true,
            attributes: ['code', 'value', 'order']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Thành công' : 'Lấy diện tích thất bại',
            response
        })
    } catch (error) {
        reject(error)
    }
})