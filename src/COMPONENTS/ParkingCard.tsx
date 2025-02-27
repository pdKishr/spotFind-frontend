import { Parking } from "../ZUSTAND_STORE/store";

interface ParkingCardProps {
    parking: Parking;
}

const ParkingCard: React.FC<ParkingCardProps> = ({ parking }) => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-6">
            <h2 className="text-2xl font-bold text-green-600">{parking.parkingName}</h2>
            <p className="text-gray-600">{parking.address}, {parking.city}, {parking.state}</p>

            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Contact Details</h3>
                <p className="text-gray-500">{parking.email}</p>
                <p className="text-gray-500">{parking.mobileNumber}</p>
            </div>

            {!parking.isAvailableFor24Hours && (
                <p className="text-sm text-gray-700 mt-2">
                    <strong>Available:</strong> {parking.openTime} - {parking.closeTime}
                </p>
            )}

            <div className="mt-4 flex justify-between">
                {parking.isBikeParkingAvailable && (
                    <div className="text-center">
                        <p className="text-lg font-bold text-blue-500">Bike</p>
                        <p className="text-gray-600">₹{parking.bikeCharge}</p>
                        <p className="text-sm text-gray-500">Spots: {parking.availableBikeSpots}</p>
                    </div>
                )}

                {parking.isCarParkingAvailable && (
                    <div className="text-center">
                        <p className="text-lg font-bold text-red-500">Car</p>
                        <p className="text-gray-600">₹{parking.carCharge}</p>
                        <p className="text-sm text-gray-500">Spots: {parking.availableCarSpots}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParkingCard;
