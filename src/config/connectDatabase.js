const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('phongtro', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});


const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối database thành công.');
    } catch (error) {
        console.error('Không thể kết nối đến database:', error);
    }
}

export default connectDatabase