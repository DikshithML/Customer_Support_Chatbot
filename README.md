Sure! Here's the **complete `README.md` file** in **one single block** for your Dockerized Customer Support Chatbot project — you can copy and paste it directly:

---

```markdown
# 🤖 Customer Support Chatbot – Full Stack Dockerized App

This is a fully containerized AI-powered customer support chatbot built with:

- **Frontend**: React + Redux (Vite)
- **Backend**: FastAPI
- **Database**: MySQL
- **Orchestration**: Docker & Docker Compose

---

## 📁 Folder Structure

```

Customer\_Support\_Chatbot/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── db/
│   │   └── models/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md

````

---

## ⚙️ Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 How to Run the Full Stack App

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/Customer_Support_Chatbot.git
cd Customer_Support_Chatbot
````

### Step 2: Build & Launch with Docker Compose

```bash
docker-compose up --build
```

This will:

* Launch the MySQL database
* Start the FastAPI backend at port `8000`
* Start the React frontend at port `3000`

---

## 🌐 Access the App

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **Backend (API Docs)**: [http://localhost:8000/docs](http://localhost:8000/docs)
* **Database (MySQL)**: Host `db`, Port `3306`, User `root`, Password `password`

---

## 🐳 Docker Setup

### ✅ Backend: `backend/Dockerfile`

```Dockerfile
FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /app/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

### ✅ Frontend: `frontend/Dockerfile`

```Dockerfile
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]
```

### ✅ Docker Compose: `docker-compose.yml`

```yaml
version: '3.9'

services:
  db:
    image: mysql:8
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: support_chat
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      DB_HOST: db
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: password
      DB_NAME: support_chat

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  db_data:
```

---

## 💡 Features

* 🔌 Connects React frontend to FastAPI backend
* 💬 Handles AI-based chat requests and user responses
* 📜 Saves and displays past conversation history
* 🔄 Hot reloading enabled in dev mode
* ✅ Fully Dockerized for one-step setup

---

## 📂 Backend Requirements

### `backend/requirements.txt`

```
fastapi
uvicorn
sqlalchemy
pymysql
python-dotenv
```

---

## 📦 Stopping the App

```bash
docker-compose down
```

> Note: Database data is preserved using Docker volumes (`db_data`)

---

## 🧪 Testing Chat Features

1. Visit [http://localhost:3000](http://localhost:3000)
2. Send a message
3. Get AI response from backend
4. View full chat history
5. Check backend logs for debug info

---

## 🛠 Troubleshooting

* ❌ `port already in use`: stop existing services or change ports in `docker-compose.yml`
* ❌ database connection issues: ensure `db` service is up and MySQL credentials are correct
* ❌ frontend can't reach backend: verify CORS is enabled and `localhost:8000` is reachable

---

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes (`git commit -m 'add feature'`)
4. Push to the branch (`git push origin feat/your-feature`)
5. Create a pull request

---

## 📞 Contact

Maintained by Dikshith M L(https://github.com/DikshithML)
For queries, contact: `dikshi007ml@gmail.com`

---

```

