# Hướng dẫn chạy code

**Backend:** NodeJS, ExpressJS

**Frontend:** ReactJS

**Database:** MongoDB

**Recommender System:** Flask, Python

## 1. Khởi động Backend

- Chuyển đến thư mục HMart-Backend

```cmd
  cd HMart-Backend
```

- Cài thư viện bằng npm

```cmd
  npm install
```

- Khởi động Backend với port 8080

```cmd
  npm run dev
```

## 2. Khởi động Recommendation System

- Chuyển đến thư mục HMart-DeepLearning

```cmd
  cd HMart-DeepLearning
```

- Cài thư viện bằng pip

```cmd
  pip install -r requirements.txt
```

- Khởi động Recommendation System với port 8888

```cmd
  flask --app api run --port 8888
```

## 3. Khởi động Frontend của người dùng

- Chuyển đến thư mục HMart-Frontend

```cmd
  cd HMart-Frontend
```

- Cài thư viện bằng npm

```cmd
  npm install
```

- Khởi động Frontend với port 3000

```cmd
  npm start
```

Lúc này Frontend của người dùng sẽ được chạy ở http://localhost:3000

## 4. Khởi động Frontend của quản trị viên

- Chuyển đến thư mục HMart-Admin

```cmd
  cd HMart-Admin
```

- Cài thư viện bằng npm

```cmd
  npm install --force
```

- Khởi động Frontend với port 3001
  - Đối với Windows
    ```cmd
      npm run start-win
    ```
  - Đối với Linux, Ubuntu và MacOS
    ```cmd
      npm run start-linux
    ```

Lúc này Frontend của quản trị viên sẽ được chạy ở http://localhost:3001

## 5. Một vài user để test chức năng
  
  - user0001@gmail.com|123 (User Apple)

  - user1314@gmail.com|123 (User Samsung)

  - user2281@gmail.com|123 (User Xiaomi)
 
  - user3389@gmail.com|123 (User Sony)
 
  - user4280@gmail.com|123 (User JBL)

  - vogiaminh0802@gmail.com|123 (Admin)
