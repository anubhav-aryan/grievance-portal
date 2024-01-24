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

    const messageContainer = document.createElement('div');
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '10%';  // Adjust the top value as needed
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translateX(-50%)';
    messageContainer.style.padding = '15px';
    messageContainer.style.backgroundColor = '#4CAF50';
    messageContainer.style.color = 'white';
    messageContainer.style.display = 'none';
    document.body.appendChild(messageContainer);

    const showMessage = (message: string, isSuccess: boolean) => {
        messageContainer.innerText = message;
        messageContainer.style.display = 'block';
        messageContainer.style.backgroundColor = isSuccess ? '#4CAF50' : '#f44336'; // Green for success, red for error

        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 3000); // Display the message for 3 seconds, adjust as needed
    };

    await axios
        .post(URL, formData, { headers })
        .then((res) => {
            response.status = 1;
            response.data = res.data;

            // If the post is successful, show a success message and then refresh the page
            showMessage('Post submitted successfully!', true);
            setTimeout(() => {
                window.location.reload();
            }, 500); // Refresh the page after 1.5 seconds
        })
        .catch((err) => {
            response.status = 0;
            response.data = err.response.data;

            // Handle error (you might want to log it or show an error message)
            console.error('Error submitting post:', err);
            showMessage('Error submitting post. Please try again.', false);
        });

    return response;
};

export default postHandler;
