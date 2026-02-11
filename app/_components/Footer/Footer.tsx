

export default function Footer() {
  return <>
    

    <footer className="bg-gray-100 mt-15">
  <div className=" max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* Brand */}
    <div>
      <h2 className="text-2xl font-bold text-green-600 mb-3">
        FRESH<span className="text-gray-800">Cart</span>
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        Fresh products, trusted quality, and fast delivery  
        right to your doorstep.
      </p>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="text-lg font-semibold text-green-600 mb-4">
        Contact Us
      </h3>

      <div className="space-y-3 text-sm text-gray-600">
        <p>
          📧 <span className="font-medium">Email:</span> support@greencart.com
        </p>
        <p>
          ☎️ <span className="font-medium">Hotline:</span> 19999
        </p>
        <p>
          📍 <span className="font-medium">Address:</span> Cairo, Egypt
        </p>
      </div>
    </div>

    {/* Payment  */}
    <div>
      <h3 className="text-lg font-semibold text-green-600 mb-4">
        Secure Payment
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        We support secure and trusted payment methods.
      </p>

      <div className="flex gap-3">
        {/* Visa */}
        <div className="bg-white shadow rounded-md px-3 py-2 text-sm font-semibold text-gray-700">
          VISA
        </div>
        {/* MasterCard */}
        <div className="bg-white shadow rounded-md px-3 py-2 text-sm font-semibold text-gray-700">
          MasterCard
        </div>
        {/* PayPal */}
        <div className="bg-white shadow rounded-md px-3 py-2 text-sm font-semibold text-gray-700">
          PayPal
        </div>
      </div>
    </div>

  </div>

  {/* Bottom */}
  <div className="border-t bg-gray-200 border-gray-300 py-4 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} GreenCart — All rights reserved
  </div>
</footer>


    </>
  
}
