function generateEmailTemplate({ title, message, firstname, lastname, adminName, email }) {
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


    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
        <img src="https://res.cloudinary.com/dz8dpgrjf/image/upload/v1745575222/abstact-red-line-banner-overlap-layers-on-black-background-with-free-space-for-your-design-modern-header-vector_wkvolo.jpg" alt="Header Image" style="max-width: 100%; height: auto;" />
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #333;">${title}</h2>
       
        <p style="color: #555; font-size: 16px;">${adminName || ''}</p>
        <p style="color: #555; font-size: 16px;">${firstname} ${lastname},</p>
        <p style="color: #555; font-size: 16px;">${email || ''}</p>
        <p style="color: #555; font-size: 16px; ">
          ${message}
        </p>
        ${signature}
      </div>
    </div>
    `;
  }
  
  module.exports = generateEmailTemplate;
  