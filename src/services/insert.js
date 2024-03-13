import db from '../models';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import chothuematbang from '../../data/chothuematbang.json'
import chothucanho from '../../data/chothucanho.json'
import nhachothue from '../../data/nhachothue.json'
import chothuephongtro from '../../data/chothuephongtro.json'
import timnguoioghep from '../../data/timnguoioghep.json'
import generateCode from '../ultis/generateCode'
const moment = require('moment');
require('dotenv').config();
const dataBody = timnguoioghep.body


const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const insertService = () => new Promise(async (resolve, reject) => {
    try {
        dataBody.forEach(async (item) => {
            let postId = v4()
            let labelCode = generateCode(4)
            let attributesId = generateCode(4)
            let userId = v4()
            let overviewId = v4()
            let imagesId = v4()
            await db.Post.create({
                id: postId,
                title: item?.header?.title,
                star: item?.header?.star,
                labelCode,
                address: item?.header.address,
                attributesId,
                categoryCode: 'TNOG',
                description: JSON.stringify(item?.mainContent.content),
                userId,
                overviewId,
                imagesId
            })
            await db.Attribute.create({
                id: attributesId,
                price: item?.header?.attributes.price,
                acesge: item?.header?.attributes.acesge,
                published: item?.header?.attributes.published,
                hashtag: item?.header?.attributes.hashtag,
            })
            await db.Image.create({
                id: imagesId,
                image: JSON.stringify(item?.images)
            })
            await db.Label.create({
                code: labelCode,
                value: item?.header?.class?.classType
            })
            let createdString = item?.overview?.content.find(i => i.name === "Ngày đăng:")?.content;
            let created = moment(createdString, 'HH:mm DD/MM/YYYY').toDate();
            let expiredString = item?.overview?.content.find(i => i.name === "Ngày hết hạn:",)?.content;
            let expired = moment(expiredString, 'HH:mm DD/MM/YYYY').toDate();
            await db.Overview.create({
                id: overviewId,
                code: item?.overview?.content.find(i => i.name === "Mã tin:")?.content,
                area: item?.overview?.content.find(i => i.name === "Khu vực")?.content,
                type: item?.overview?.content.find(i => i.name === "Loại tin rao:")?.content,
                target: item?.overview?.content.find(i => i.name === "Đối tượng thuê:")?.content,
                bonus: item?.overview?.content.find(i => i.name === "Gói tin:")?.content,
                created,
                expired
            })
            await db.User.create({
                id: userId,
                name: item?.contact?.content.find(i => i.name === "Liên hệ:")?.content,
                password: hashPassword('123456'),
                phone: item?.contact?.content.find(i => i.name === "Điện thoại:")?.content,
                zalo: item?.contact?.content.find(i => i.name === "Zalo")?.content,
            })
        })


        resolve("Done.")
    } catch (error) {
        reject(error)
    }
})