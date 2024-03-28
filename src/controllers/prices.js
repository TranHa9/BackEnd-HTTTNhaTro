import * as services from '../services/price';

export const getPrice = async (req, res) => {
    try {
        const response = await services.getPricesService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi ở category controller' + error
        })
    }
}