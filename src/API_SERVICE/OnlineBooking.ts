import axiosInstance from "../AXIOS_INSTANCE/api_instance";

interface Props {
    vehicle: string | undefined;
    vehicleNumber: string;
    parkingId: number;
}

export default async ({ vehicle, vehicleNumber, parkingId }: Props) => {
    const userId = Number(localStorage.getItem("id"));

    try {
        const response = await axiosInstance.post(
            `/user/booking/book-${vehicle}-spot`,
            {}, 
            {
                headers: {
                    id: userId,
                    parkingid: parkingId,
                    vehiclenumber: vehicleNumber,
                },
            }
        );
        return response?.data;
    } catch (error: any) {
        console.error("Booking failed:", error?.response?.data || error.message);
        throw error?.response?.data || new Error("Something went wrong");
    }
};
