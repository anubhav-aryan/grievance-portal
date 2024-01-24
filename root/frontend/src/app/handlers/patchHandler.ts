import axios from 'axios';

const patchHandler = async (URL: string, formData: any, type = 'application/json', token: string) => {
  const headers = {
    'Content-Type': type,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.F1On1W7kllKokCMtmRvLQesN23KgurWLq_zBjP6UHX0`, 
  };

  const response = {
    status: 0,
    data: {},
  };

  await axios
    .patch(URL, formData, { headers })
    .then((res) => {
      response.status = 1;
      response.data = res.data;
    })
    .catch((err) => {
      response.status = 0;
      if (err.response && err.response.data) {
        response.data = err.response.data;
      } else {
        console.error("Error response or data is undefined:", err);
      }
    });
  return response;
};

export default patchHandler;
