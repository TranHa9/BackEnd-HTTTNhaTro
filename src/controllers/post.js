import { json } from 'sequelize';
import * as postService from '../services/post';

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}
export const getPostsLimit = async (req, res) => {
    const { page, price, area, provinceId, districtId, wardId, ...query } = req.query
    try {
        const response = await postService.getPostsLimistService(page, query, { price, area, provinceId, districtId, wardId })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}

export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}

export const createNewPost = async (req, res) => {
    try {
        const { categoryId, name, price, area } = req.body
        const { id } = req.user
        if (!categoryId || !id || !name || !price || !area) return res.status(400).json({
            err: 1,
            msg: 'Nhập thiếu input'
        })
        const response = await postService.createNewPostService(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}

export const addSavePost = async (req, res) => {
    try {
        const { postId } = req.body
        const { id } = req.user
        if (!postId) return res.status(400).json({
            err: 1,
            msg: 'Nhập thiếu input'
        })
        const response = await postService.addSavedPost(postId, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}

export const getSavePostsLimit = async (req, res) => {
    const { page, price, area, provinceId, districtId, wardId, ...query } = req.query
    const { id } = req.user
    try {
        const response = await postService.getSavePostsLimistService(page, id, query, { price, area, provinceId, districtId, wardId })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}

export const deleteSavePost = async (req, res) => {
    const { savePostId } = req.query
    const { id } = req.user
    try {
        if (!savePostId || !id) {
            return res.status(400).json({
                err: 1,
                msg: "Lỗi không tìm thấy id tin cần xóa hoặc lỗi người dùng"
            })
        }
        const response = await postService.deleteSavePost(savePostId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}

export const getPostsLimitAdmin = async (req, res) => {
    const { page, ...query } = req.query
    const { id } = req.user
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: "Lỗi xác thực người dùng"
            })
        }
        const response = await postService.getPostsLimistAdminService(page, id, query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}

export const updatePost = async (req, res) => {
    const { postId, ...payload } = req.body
    const { id } = req.user
    try {
        if (!postId || !id) {
            return res.status(400).json({
                err: 1,
                msg: "Lỗi không tìm thấy id tin cần sửa hoặc lỗi người dùng"
            })
        }
        const response = await postService.updatePost(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}

export const deletePost = async (req, res) => {
    const { postId } = req.query
    const { id } = req.user
    try {
        if (!postId | !id) {
            return res.status(400).json({
                err: 1,
                msg: "Lỗi không tìm thấy id tin cần sửa hoặc lỗi người dùng"
            })
        }
        const response = await postService.deletePost(postId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}

export const getSavePostsStatus = async (req, res) => {
    const { page, price, area, provinceId, districtId, wardId, ...query } = req.query
    try {
        const response = await postService.getPostsStatusService(page, query, { price, area, provinceId, districtId, wardId })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi post phía controller: ' + error
        })
    }
}