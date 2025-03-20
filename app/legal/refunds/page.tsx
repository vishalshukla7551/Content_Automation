export default function RefundPolicy() {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">Cancellation & Refund Policy</h1>
        <p>Last Updated: March 20, 2025</p>
  
        <h2 className="text-xl font-semibold mt-4">1. Subscription Payments</h2>
        <p>
          We offer subscription-based services where users can purchase extra credits to access 
          premium features on our platform. Payments are securely processed through 
          <strong> Razorpay</strong>.
        </p>
  
        <h2 className="text-xl font-semibold mt-4">2. Cancellation Policy</h2>
        <p>
          - Users can cancel their subscription at any time from their account settings.<br />
          - Cancellation will **prevent future renewals** but will **not refund** past payments.<br />
          - Once a subscription is canceled, you will retain access until the end of the billing cycle.<br />
          - To cancel, go to <strong>Dashboard → Billing → Cancel Subscription</strong>.<br />
        </p>
  
        <h2 className="text-xl font-semibold mt-4">3. Refund Policy</h2>
        <p>All payments made for subscriptions are <strong>non-refundable</strong>. However, refunds may be considered under the following circumstances:</p>
        <ul className="list-disc pl-6">
          <li>Duplicate payment was made for the same subscription.</li>
          <li>Technical issues prevented access to paid features after payment.</li>
          <li>Unauthorized payment or fraud (subject to verification).</li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-4">4. Refund Process</h2>
        <p>If you qualify for a refund:</p>
        <ul className="list-disc pl-6">
          <li>Email us at <strong>support@yourwebsite.com</strong> with your order details.</li>
          <li>Refunds will be processed within <strong>5-7 business days</strong>.</li>
          <li>Refunds will be credited to the original payment method via <strong>Razorpay</strong>.</li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-4">5. Contact Us</h2>
        <p>If you have any questions about our Cancellation & Refund Policy, please contact:</p>
        <p>Email: <a href="mailto:support@yourwebsite.com" className="text-blue-600 underline">support@yourwebsite.com</a></p>
        <p>Phone: +91 9876543210</p>
  
        <p className="mt-6">By subscribing to our service, you agree to this Cancellation & Refund Policy.</p>
      </div>
    );
  }
  