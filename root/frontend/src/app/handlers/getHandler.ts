import axios from 'axios';

const getHandler = async (URL: string) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: '',
        'ngrok-skip-browser-warning': true,
    };
    const response: any = {
        status: 0,
        statusCode:200,
        data: '',
    };
    await axios
        .get(URL, { headers })
        .then((res) => {
            response.status = 1;
            response.statusCode = res.status;
            response.data = res.data;
        })
        .catch((err) => {
            response.status = 0;
            response.statusCode = err.response.status;
            response.data = err.response.data;
        });
    return response;
};

export default getHandler;