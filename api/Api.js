const Base_URL = 'http://localhost:5095/api/Task' 

export const getRequest = async () => {
    try {
        
        const response = await fetch(Base_URL, {
            method: "GET",
            headers: {
                'content-Type' : 'application/json'
            }
        });

        if(!response.ok){
            throw new Error(`GET request failed whith status ${response.status}`);
        }

        const textData = await response.text();
        const data = JSON.parse(textData);

        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}