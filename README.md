# eventSafe
video link:https://imgur.com/a/9bSuPfe

EventSafe is a web-based platform designed to enhance safety, registration, and event management. It features a Panic Button functionality for sending live location alerts, event registration integrated with a MySQL database, and an FAQ section for answering common queries.
Features
1. Panic Button with Live Location Tracking
- Sends an emergency alert via SMS with a Google Maps link to the sender's live location.
- Built using the Twilio API for SMS integration.
2. Event Registration
- Allows users to register for events.
- Stores registration details in a MySQL database.
- Checks for the existence of the event before allowing registration.
3. FAQ Section
- Provides answers to frequently asked questions about the events.
Tech Stack
  Backend: Python, Flask
  Database: MySQL
SMS API: Twilio
Environment Management: Python dotenv for securely managing environment variables
Cross-Origin Resource Sharing: Handled with Flask-CORS
Setup Instructions
 Prerequisites
- Python 3.8 or higher installed
- MySQL installed and configured
- Twilio account for SMS services
- A .env file with your Twilio credentials
Installation
Clone the Repository
   bash
   git clone https://github.com/your-username/eventsafe.git
   cd eventsafe
  Create a Virtual Environment
   bash
   python -m venv venv
   venv\Scripts\activate    
Install Required Python Packages
   bash
   pip install -r requirements.txt
   Set Up the Database
   - Create a MySQL database named event_safe:
     sql
     CREATE DATABASE event_safe;
     
   - Create required tables:
     sql
     USE event_safe;

     CREATE TABLE events (
         id INT AUTO_INCREMENT PRIMARY KEY,
         event_name VARCHAR(255) NOT NULL
     );

     CREATE TABLE registrations (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         phone VARCHAR(15) NOT NULL,
         event_name VARCHAR(255) NOT NULL
     );
     
Add Twilio Credentials in .env File
   Create a .env file in the root directory:
   
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   How to Run
Start the Flask Server
   bash
   python app.py
   

Test Endpoints
   - Use tools like Postman or curl to test the API.
Available API Endpoints

   | Endpoint             | Method | Description                                     |
   |----------------------|--------|-------------------------------------------------|
   | /live-location     | POST   | Sends an SMS with live location (Panic Button). |
   | /register-event    | POST   | Registers a user for an event.                  |
   | /event-faq         | GET    | Fetches FAQs for the event.                     |

 Register Event
     bash
     curl -X POST http://127.0.0.1:5000/register-event \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "johndoe@example.com", "phone": "1234567890", "event_name": "TechFest"}'
     
Fetch FAQs
     bash
     curl -X GET http://127.0.0.1:5000/event-faq
     Project Structure


event_safe/
│
├── app.py             # Main Flask application
├── requirements.txt   # Python dependencies
├── .env               # Environment variables (not included in repo)
├── README.md          # Project documentation
└── templates/         # HTML templates (if any)







