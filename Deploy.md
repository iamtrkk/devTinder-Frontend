# 🚀 Deployment Guide

## ✅ Prerequisites
- Sign up on [AWS](https://aws.amazon.com/)
- Launch an EC2 instance (Ubuntu preferred)
- Download and securely store your `.pem` file (e.g., `devTinder-secret.pem`)

---

## 🔐 Set Permissions for PEM File
```bash
chmod 400 devTinder-secret.pem
```

---

## 🔌 Connect to Remote Server
```bash
ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-141-212.ap-south-1.compute.amazonaws.com
```

---

## ⚙️ Server Setup

### 1. Install Node.js
Make sure you install the **same version** of Node.js used in your local environment.

### 2. Clone Your Repository
```bash
git clone https://github.com/iamtrkk/devTinder-Frontend.git
cd devTinder-Frontend
```

---

## 🌐 Frontend Setup

### Install Dependencies & Build Project
```bash
npm install
npm run build
```

---

## 🧰 Install & Configure NGINX

### Update System Packages
```bash
sudo apt update
```

### Install NGINX
```bash
sudo apt install nginx
```

### Start & Enable NGINX
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 📂 Deploy Build Files to NGINX Web Root
```bash
sudo cp -r dist/* /var/www/html
```

> `dist` folder is the output from `npm run build`. NGINX serves static files from `/var/www/html`.

---

## 🔓 Enable Port 80 (HTTP)
- Go to AWS EC2 Dashboard
- Select your instance
- Under **Security Groups**, edit the **Inbound rules**
- Add a rule to allow **HTTP (port 80)** from **Anywhere (0.0.0.0/0)**

---