Vyapar Saathi

Vyapar Saathi is a smart, lightweight, and user-friendly inventory & sales management system designed for small businesses and kirana stores in India.

Built to simplify daily operations like product tracking, billing, and stock management — all in one place.

🌟 Key Features
📦 Product Management
Add products manually or via barcode scanning
Auto-fetch product details using API
Delete and manage inventory easily
🛒 Smart Selling (Cart Mode)
Scan products to add into cart
Real-time quantity tracking
Quick checkout system
📊 Dashboard Analytics
Total Products
Total Items
Total Revenue
⚠️ Insights & Alerts
Low stock detection
Expiry alerts
Demand prediction (demo feature)
Smart suggestions for inventory
🔐 Authentication System
Firebase Email/Password login & signup
Secure session handling
Logout functionality
Protected UI (access only after login)
🌐 Multi-language Support
English ✅
Hindi ✅
Other Indian languages (Coming Soon)
📸 Barcode Scanner
Mobile camera-based scanning
Continuous scan for selling mode
Optimized for real devices (HTTPS required)
📱 Mobile First Design
Fully responsive UI
Optimized for smartphones
Smooth and touch-friendly experience
🧠 Smart Capabilities
Auto product detection via barcode
Real-time inventory updates
Clean UI with dynamic rendering
Designed for small shop owners with minimal tech knowledge
🛠️ Tech Stack
Frontend: HTML, CSS, JavaScript (Vanilla JS)
Authentication: Firebase Auth
API: OpenFoodFacts
Library: html5-qrcode
Hosting: Netlify (for HTTPS support)
📂 Project Structure
📦 Vyapar Saathi
├── 📁 modules
│   ├── inventory/
│   ├── product/
│   ├── barcode/
├── 📁 styles
├── 📁 utils
├── app.js
├── firebase.js
├── index.html
└── README.md
🔐 Authentication Flow
User opens app → Login screen दिखाई देता है
Login/Signup → Firebase authenticate करता है
Success → Dashboard खुलता है
Logout → वापस Login screen
📸 Scanner Notes
Camera works only on HTTPS (Netlify)
Localhost may block camera access
Dynamic scan box ensures proper mobile display
⚡ How to Run
🖥️ Local
Open index.html in browser
🌐 For Scanner (Recommended)

Deploy on Netlify or any HTTPS hosting platform

🔥 Future Scope
🎤 Voice Commands
☁️ Cloud Database (Firestore)
📈 Advanced analytics
🌍 Full multi-language support
🤖 AI-based demand prediction
🤝 Contributing

Contributions are welcome. Fork the repo and improve it.

👨‍💻 Author

Aditya

Tech enthusiast
Focused on building real-world solutions
Passionate about scalable products
💡 Vision

To empower small businesses in India with simple, digital tools that improve efficiency and growth.
