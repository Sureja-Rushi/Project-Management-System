import api from "@/config/api"

export const createPayment = ({ planType, jwt }) => {
    return async (dispatch) => {

        try {
            console.log(planType);
            const { data } = await api.post(`/api/payment/${planType}`, {

                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                }
            });
            console.log(data);
            if (data.payment_link_url) {
                window.location.href = data.payment_link_url;
            }
        } catch (error) {
            console.log("error", error);
        }
    }
}