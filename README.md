# HumanChainAi
⚙️ Setup Instructions
##1. Clone the repo

git clone https://github.com/yourusername/incident-management-api.git .
cd incident-management-api .
##2. Install dependencies

npm install .
##3. Create a .env file

touch .env
Inside .env, add:
MONGO_URI=your_mongodb_connection_string
PORT=8080
Example MongoDB URI:

"mongodb://localhost:27017/incidentsdb"

4. Run the server

npm run dev
(assuming you're using nodemon, otherwise use npm start)

📡 API Endpoints
1. Create a New Incident
POST /incidents

json format

{
  "title": "Server Outage",
  "description": "The main server is down.",
  "severity": "High"
}
2. List All Incidents
GET /incidents

##3. Get Specific Incident by ID
GET /incidents/:id

Example: /incidents/1

4. Delete an Incident
DELETE /incidents/:id

Example: /incidents/1

🔥 Example Response
json

{
  "id": 1,
  "title": "Server Outage",
  "description": "The main server is down.",
  "severity": "High",
  "reported_at": "2025-04-25T13:40:00.000Z"
}
