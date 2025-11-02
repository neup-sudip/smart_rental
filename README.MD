# 🏠 Smart Rental Insight System

[![Python](https://img.shields.io/badge/Python-3.11-blue)](https://www.python.org/)  
[![Flask](https://img.shields.io/badge/Flask-3.1.2-green)](https://flask.palletsprojects.com/)  
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)

**SmartStay Pvt. Ltd.** – Rental Property Management & Analytics

A lightweight web application to manage rental properties, view trends, and make informed renting decisions across Nepal.

---

## 🚀 Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Setup & Run](#setup--run)
---

## 📝 Project Description
Smart Rental Insight System allows users to:
- Register and login securely with JWT authentication using Cookie
- Add, update, delete, and view rental properties
- Access analytics like average rent per location
- View dashboards with latest and top properties, property categories, and locations with properties count

Backend: **Python Flask**  
Frontend: **React.js**  
Database: **PostgreSQL**
---

## ✨ Features

### User Module
- User registration and login
- JWT-based authentication
- Access control for property management

### Property Module
- CRUD operations for properties
- Only allow author to modify the property data
- Sample Dashboard Response:
```json
{
  "responseCode": "0",
  "responseData": {
    "byCategories": [
      {
        "name": "Flat",
        "reference": "category",
        "value": 2
      },
      {
        "name": "House",
        "reference": "category",
        "value": 1
      }
    ],
    "byLocations": [
      {
        "name": "Bhaktapur",
        "reference": "location",
        "value": 1
      },
      {
        "name": "Lalitpur",
        "reference": "location",
        "value": 2
      }
    ],
    "categories": [
      {
        "name": "Land",
        "reference": "category",
        "value": "Land"
      },
      {
        "name": "House",
        "reference": "category",
        "value": "House"
      }
    ],
    "latestProperties": [
      {
        "address": "NewRoad Lalitpur, Near Pokhari",
        "available": true,
        "category": "House",
        "createdDate": "2025-11-02 21:00:31",
        "description": "Comfortable house in Lalitpur Area with 3BHK, including parking area, It is 2 floor house",
        "id": 3,
        "location": "Lalitpur",
        "ownerId": 1,
        "ownerName": "Admin User",
        "price": 150000,
        "title": "2 Floor, 3BHK Lalitpur"
      }
    ],
    "locations": [
      {
        "name": "Bhaktapur",
        "reference": "location",
        "value": "Bhaktapur"
      }
    ],
    "topProperties": [
      {
        "address": "NewRoad Lalitpur, Near Pokhari",
        "available": true,
        "category": "House",
        "createdDate": "2025-11-02 21:00:31",
        "description": "Comfortable house in Lalitpur Area with 3BHK, including parking area, It is 2 floor house",
        "id": 3,
        "location": "Lalitpur",
        "ownerId": 1,
        "ownerName": "Admin User",
        "price": 150000,
        "title": "2 Floor, 3BHK Lalitpur"
      }
    ]
  },
  "responseMessage": "Success",
  "responseStatus": true
}
```

---
## ⚡ Setup & Run

### Prerequisites
Ensure you have the following installed on your system:
* 🐍 **Python 3.10+** (with pip)
* 🟢 **Node.js 18+** (with npm)
* 🐘 **PostgreSQL 16+**

---

### 🔑 Configuration
You must configure the database connection before running the services.

#### 1. Create PostgreSQL Database
Open your PostgreSQL client (e.g., `psql`) and run:
```sql
CREATE DATABASE smart_rental;
```

#### 2. Clone the repository
```powershell
git clone https://github.com/neup-sudip/smart_rental.git
cd smart_rental
```

#### 3. Setup Backend (Server)
```powershell
cd smart_rental_backend
python -m venv venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
\venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Leave this running while you start the frontend in a new window

#### 4. Setup Frontend (Client) - open a new PowerShell window
```powershell
cd smart_rental_react
npm install
npm run dev
```

### 🌐 Access the Application

#### Frontend Access
Open your browser and navigate to the client application:
[http://localhost:5173/](http://localhost:5173/)

#### Default Credentials
Use the following credentials for initial login:

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `ADMIN` | `Admin@12345#` |

#### 📊 Reporting API
Public analytics endpoints are accessible directly via the backend server:

| Endpoint | Description |
| :--- | :--- |
| [http://127.0.0.1:5000/api/analytics/average-rent](http://127.0.0.1:5000/api/analytics/average-rent) | Returns the calculated average rent across all properties. |
