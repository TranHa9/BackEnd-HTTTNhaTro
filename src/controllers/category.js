import * as services from '../services/category';

export const getCategories = async (req, res) => {
    try {
        const response = await services.getCategoriesService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi ở category controller' + error
        })
    }
}

export const getCategoriesLimit = async (req, res) => {
    const { page, ...query } = req.query
    try {
        const response = await services.getCategoriesLimit(page, query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi ở category controller' + error
        })
    }
}

export const createCategory = async (req, res) => {
    const { name, title, description } = req.body
    try {
        if (!name || !title || !description) return res.status(400).json({
            err: 1,
            msg: "Lỗi nhập inputs!"
        })
        const response = await services.createCategoriesService(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Lỗi controller xác thực: " + error
        })
    }
}

export const updateCategory = async (req, res) => {
    const { categoryId, ...payload } = req.body
    try {
        if (!categoryId) return res.status(400).json({
            err: 1,
            msg: "Thiếu categoryId"
        })
        const response = await services.updateCategories(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi ở user controller ' + error
        })
    }
}

export const deleteCategory = async (req, res) => {
    const { categoryId } = req.query
    try {
        if (!categoryId) {
            return res.status(400).json({
                err: 1,
                msg: "Lỗi không tìm thấy categoryId"
            })
        }
        const response = await services.deleteCategory(categoryId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi phía controller: ' + error
        })
    }
}