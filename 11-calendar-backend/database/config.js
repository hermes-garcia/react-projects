const {set, connect} = require('mongoose');

const dbConnection = async() => {
    try {
        set('strictQuery', false);
        await connect(process.env.DB_CNN);
    } catch (error) {
        console.error(error);
        throw new Error('Error on init database');
    }
};

module.exports = {
    dbConnection
};
