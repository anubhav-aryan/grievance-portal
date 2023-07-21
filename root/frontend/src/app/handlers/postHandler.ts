import axios from 'axios';

const postHandler = async (
    URL: string,
    formData: object,
    type: string = 'application/json'
) => {
    const headers = {
        'Content-Type': type,
        Authorization: '',
    };
    const response: any = {
        status: 0,
        data: {},
    };

    await axios
        .post(URL, formData, { headers })
        .then((res) => {
            response.status = 1;
            response.data = res.data;
        })
        .catch((err) => {
            response.status = 0;
            response.data = err.response.data;
        });
    return response;
};

export default postHandler;