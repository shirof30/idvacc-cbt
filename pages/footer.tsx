import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-lg font-semibold mb-2">About Us</h5>
            <p className="text-sm">
              IDVACC is a division of the VATSIM network. VATSIM Southeast Asia
              (IDVACC) is responsible for providing ATC services for all Indonesian
              Airspace.
            </p>
            <p className="text-sm mt-4">
              Copyright © 2024 <a href="https://www.vatsim.net" className="text-blue-400 hover:text-blue-500">IDVACC</a> | v2.8.1
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-lg font-semibold mb-2">Connect with Us</h5>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="text-blue-400 hover:text-blue-500">Discord</a></li>
              <li><a href="#" className="text-blue-400 hover:text-blue-500">Twitter</a></li>
              <li><a href="#" className="text-blue-400 hover:text-blue-500">Facebook</a></li>
              <li><a href="#" className="text-blue-400 hover:text-blue-500">YouTube</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="text-blue-400 hover:text-blue-500">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-400 hover:text-blue-500">Join IDVACC</a></li>
              <li><a href="#" className="text-blue-400 hover:text-blue-500">Bookings</a></li>
              <li><a href="#" className="text-blue-400 hover:text-blue-500">FAQ</a></li>
              <li><a href="#" className="text-blue-400 hover:text-blue-500">Membership Tickets</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
