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
    const { page, priceNumber, areaNumber, ...query } = req.query
    try {
        const response = await postService.getPostsLimistService(page, query, { priceNumber, areaNumber })
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
        const { categoryCode, title, priceNumber, areaNumber, label } = req.body
        const { id } = req.user
        if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label) return res.status(400).json({
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
    const { postId, attributesId, imagesId, overviewId, ...payload } = req.body
    const { id } = req.user
    try {
        if (!postId || !attributesId || !imagesId || !overviewId || !id) {
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