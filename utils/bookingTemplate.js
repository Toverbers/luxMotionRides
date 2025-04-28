function generateBookingEmailTemplate({ title, email, name, date, time, serviceType, firstname, lastname, phone, pickup, dropoff, noOfPeople, note }) {
    const signature = `
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #555;">
    <p style="margin: 0 0 8px;">Best regards,<br/><strong>LuxMotion</strong></p>
    <p style="margin: 0;">Contact: <a href="mailto:support@luxmotion.com" style="color: #555;">support@luxmotion.com</a></p>
    <p style="margin: 8px 0;">Follow us:</p>
    <div style="margin-top: 8px;">
      <a href="https://facebook.com/yourcompany" target="_blank" style="margin-right: 10px;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" style="vertical-align: middle;" />
      </a>
      <a href="https://instagram.com/yourcompany" target="_blank" style="margin-right: 10px;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733558.png" alt="Instagram" style="vertical-align: middle;" />
      </a>
      <a href="https://twitter.com/yourcompany" target="_blank" style="margin-right: 10px;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733579.png" alt="Twitter" style="vertical-align: middle;" />
      </a>
      <a href="https://linkedin.com/company/yourcompany" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733561.png" alt="LinkedIn" style="vertical-align: middle;" />
      </a>
    </div>
  </div>
    `;


    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
        <img src="https://res.cloudinary.com/dz8dpgrjf/image/upload/v1745575222/abstact-red-line-banner-overlap-layers-on-black-background-with-free-space-for-your-design-modern-header-vector_wkvolo.jpg" alt="Header Image" style="max-width: 100%; height: auto;" />
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #333;">${title}</h2>
        <h2>We have received your Quote Request form and will get back to you shortly.</h3>
        <p>Below are the details you requested.</p>
       
        <p style="color: #555; font-size: 16px;"><strong>Service Type:</strong> ${serviceType}</p>
        <p style="color: #555; font-size: 16px;"><strong>Firstname:</strong> ${firstname}</p>
        <p style="color: #555; font-size: 16px;"><strong>Lastname:</strong> ${lastname}</p>
        <p style="color: #555; font-size: 16px;"><strong>Email:</strong> ${email}</p>
        <p style="color: #555; font-size: 16px;"><strong>Phone Number:</strong> ${phone}</p>
        <p style="color: #555; font-size: 16px;"><strong>Pickup Address:</strong> ${pickup}</p>
        <p style="color: #555; font-size: 16px;"><strong>Drop Off Address:</strong> ${dropoff}</p>
        <p style="color: #555; font-size: 16px;"><strong>Number of Persons:</strong> ${noOfPeople}</p>
        <p style="color: #555; font-size: 16px;"><strong>Note:</strong> ${note}</p>
        <hr/>
        <br/><br/>

        ${signature}
      </div>
    </div>
    `;
  }


function generateAdminBookingEmailTemplate({ title, email, name, date, time, serviceType, airline, flightNo, checkedBag, carryOn, travelPet,  phone, pickup, dropoff, noOfPeople, note, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude}) {
    const signature = `
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #555;">
    <p style="margin: 0 0 8px;">Best regards,<br/><strong>Lux Motion Rides</strong></p>
    <p style="margin: 0;">Contact: <a href="mailto:support@luxmotionrides.com" style="color: #555;">support@luxmotionrides.com</a></p>
    <p style="margin: 8px 0;">Follow us:</p>
    <div style="margin-top: 8px;">
      <a href="https://facebook.com/yourcompany" target="_blank" style="margin-right: 10px;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" style="vertical-align: middle;" />
      </a>
      <a href="https://instagram.com/yourcompany" target="_blank" style="margin-right: 10px;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733558.png" alt="Instagram" style="vertical-align: middle;" />
      </a>
      <a href="https://twitter.com/yourcompany" target="_blank" style="margin-right: 10px;">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733579.png" alt="Twitter" style="vertical-align: middle;" />
      </a>
      <a href="https://linkedin.com/company/yourcompany" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/24/733/733561.png" alt="LinkedIn" style="vertical-align: middle;" />
      </a>
    </div>
  </div>
    `;

    const createMapsLink = (lat, lng) => {
      return `https://maps.google.com/?q=${lat},${lng}`;
    };
    
    const createDirectionsLink = (pickupLat, pickupLng, destLat, destLng) => {
      return `https://maps.google.com/maps/dir/?api=1&origin=${pickupLat},${pickupLng}&destination=${destLat},${destLng}&travelmode=driving`;
    };


    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
        <img src="https://res.cloudinary.com/dz8dpgrjf/image/upload/v1745575222/abstact-red-line-banner-overlap-layers-on-black-background-with-free-space-for-your-design-modern-header-vector_wkvolo.jpg" alt="Header Image" style="max-width: 100%; height: auto;" />
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #333;">${title}</h2>
        
       
        <p style="color: #555; font-size: 16px;">Hello Admin, there's a new quote request. below are the details</p>
        <p style="color: #555; font-size: 16px;"><Strong>Service Type:</strong> ${serviceType}</p>
        <p style="color: #555; font-size: 16px;"><Strong>Name:</strong> ${name}</p>
        <p style="color: #555; font-size: 16px;"><Strong>Email:</strong> ${email}</p>
        <p style="color: #555; font-size: 16px;"><Strong>Phone Number:</strong> ${phone}</p>
        <p style="color: #555; font-size: 16px;"><Strong>Date:</strong> on ${date} by ${time}</p>
        <p style="color: #555; font-size: 16px;"><Strong>Pickup Address:</strong> ${pickup}</p>
    
        <p><a href="https://www.google.com/maps?q=${pickupLatitude},${pickupLongitude}" target="_blank">View pickup on Google Maps</a></p>
        <p style="color: #555; font-size: 16px;"><Strong>Drop Off Address:</strong> ${dropoff}</p>
        <p><a href="https://www.google.com/maps?q=${dropoffLatitude},${dropoffLongitude}" target="_blank">View Drop off on Google Maps</a></p>
        <p style="color: #555; font-size: 16px;"><Strong>Number of Persons:</strong> ${noOfPeople}</p>
        <p style="color: #555; font-size: 16px;"><Strong>Note:</strong> ${note}</p>
        <p style="color: #555; font-size: 16px;"><strong>Airline Name:</strong> ${airline || 'None'}</p>
           <p style="color: #555; font-size: 16px;"><strong>Flight Number:</strong> ${flightNo || 'None'}</p>
           <p style="color: #555; font-size: 16px;"><strong>Checked Bag:</strong> ${checkedBag || 'None'}</p>
           <p style="color: #555; font-size: 16px;"><strong>Carry On:</strong> ${carryOn || 'None'}</p>
           <p style="color: #555; font-size: 16px;"><strong>Have Pet:</strong> ${travelPet || 'None'}</p>
        <br/>
        <h2>View the Directions on map</h2>
      <p style="text-align: center;"><a style="background-color: #c0392b; padding: 10px; padding-left: 12px; padding-right: 12px; font-size: 16px; color: #fff; text-decoration: none; border-radius: 5px" href="${createDirectionsLink(pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude)}" target="_blank">Get Directions</a></p>
        <hr/>
        ${signature}
      </div>
    </div>
    `;
  }
  
  //module.exports = generateQuoteEmailTemplate;
  module.exports = { generateBookingEmailTemplate, generateAdminBookingEmailTemplate };
  