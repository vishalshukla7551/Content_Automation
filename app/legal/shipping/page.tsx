export default function ShippingPolicy() {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Shipping Policy</h1>
        <p className="text-gray-700 mb-4">
          This website offers <strong>digital subscription plans and virtual credits</strong> for accessing premium features. Since our products are <strong>intangible and delivered electronically</strong>, no physical shipping is required.
        </p>
        <p className="text-gray-700">
          If you have any questions regarding your purchase, please refer to our{" "}
          <a href="/refund-policy" className="text-blue-500 underline">
            Refund & Cancellation Policy
          </a>{" "}
          or contact our support team.
        </p>
      </div>
    );
  }
  