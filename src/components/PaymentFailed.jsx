
export const PaymentFailure = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Payment Failed</h1>
        <p className="mb-4">We're sorry, but your payment could not be processed.</p>
        <Link to="/bookings" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Try Again
        </Link>
      </div>
    );
  };