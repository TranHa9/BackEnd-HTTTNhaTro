import * as services from '../services/user';


export const createUser = async (req, res) => {
    const { name, phone, password, roleId } = req.body
    try {
        if (!name || !phone || !password || !roleId) return res.status(400).json({
            err: 1,
            msg: "Lỗi nhập inputs!"
        })
        const response = await services.createUser(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Lỗi controller xác thực: " + error
        })
    }
}

export const getAllUser = async (req, res) => {
    const { page, ...query } = req.query
    try {
        const response = await services.getAllUser(page, query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi ở user controller ' + error
        })
    }
}


export const getCurrent = async (req, res) => {
    const { id } = req.user
    try {
        const response = await services.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi ở user controller ' + error
        })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.user
    const payload = req.body
    try {
        if (!payload) return res.status(400).json({
            err: 1,
            msg: "Thiếu payload"
        })
        const response = await services.updateUser(payload, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi ở user controller ' + error
        })
    }
}

export const updateUserData = async (req, res) => {
    const { userId, ...payload } = req.body
    try {
        if (!userId) return res.status(400).json({
            err: 1,
            msg: "Thiếu id"
        })
        const response = await services.updateUserData(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi ở user controller ' + error
        })
    }
}

export const deleteUser = async (req, res) => {
    const { userId } = req.query
    try {
        if (!userId) {
            return res.status(400).json({
                err: 1,
                msg: "Lỗi không tìm thấy id tin cần sửa hoặc lỗi người dùng"
            })
        }
        const response = await services.deleteUser(userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}