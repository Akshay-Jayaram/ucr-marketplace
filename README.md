# UCR Marketplace

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Next.js](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![AWS](https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/socket.io-%23010101.svg?style=for-the-badge&logo=socketdotio&logoColor=white)
<br/>
![AWS](https://img.shields.io/badge/AWS-%23232F3E.svg?style=for-the-badge&logo=amazonwebservices&logoColor=white) :
![AWS](https://img.shields.io/badge/route53-%238C4FFF.svg?style=for-the-badge&logo=amazonroute53&logoColor=white)
![AWS](https://img.shields.io/badge/s3-%23569A31.svg?style=for-the-badge&logo=amazons3&logoColor=white)
![AWS](https://img.shields.io/badge/CLOUDFRONT-%237D4F9E.svg?style=for-the-badge&logo=&logoColor=white)
![AWS](https://img.shields.io/badge/ec2-%23FF9900.svg?style=for-the-badge&logo=amazonec2&logoColor=white)
![AWS](https://img.shields.io/badge/aSG-%238C4FFF.svg?style=for-the-badge&logo=awselasticloadbalancing&logoColor=white)

UCRMarketplace is a full-stack marketplace application designed for the University of California, Riverside (UCR) community. The platform connects over 26,000 students, providing a secure and responsive space to buy, sell, and trade goods. 

## Features

- **User Authentication**: Secure user accounts with JWT-based authentication.
- **Real-Time Chat**: Instant communication with buyers/sellers using `Socket.io`.
- **Scalable Backend**: RESTful APIs built with `Express.js`.
- **Responsive Design**: Optimized for desktop and mobile with SCSS.
- **High Availability**: Deployed on AWS with 99.9% uptime.

## Architecture Diagram

![UCRMarketplace-arch](https://github.com/user-attachments/assets/3e97f53d-5484-4f92-9bae-43d1f362aeda)

## Screenshots

#### Home Page
<img width="1710" alt="Screenshot 2025-01-06 at 1 58 55 PM" src="https://github.com/user-attachments/assets/2e02da1f-89c5-4a3b-ab2a-5b41f103173a" />

---
#### Profile Page
<img width="1710" alt="Screenshot 2025-01-06 at 2 08 12 PM" src="https://github.com/user-attachments/assets/7efd4280-c99e-48ad-90a1-8f8ab1ac349f" />

---

#### Item Listings Page
<img width="1710" alt="Screenshot 2025-01-06 at 2 10 09 PM" src="https://github.com/user-attachments/assets/7a81aa2c-2d06-4944-aad8-6b92b9db956d" />

---
#### Item Details Page
<img width="1710" alt="Screenshot 2025-01-06 at 2 05 25 PM" src="https://github.com/user-attachments/assets/e8312aa7-f3f6-4d77-83ca-b075148d25c9" />

---
#### Real-Time Chat
<div align="center">
<img width="325" alt="Screenshot 2025-01-06 at 2 08 57 PM" src="https://github.com/user-attachments/assets/71730467-1ccd-4424-a58d-d7a177d4f137" />
</div>


## Commands

### Dependencies

```bash
# Install dependencies
npm i

# Add dependency
npm i <dependency>

# Remove dependency
npm un <dependency>
```

### Running the Website Locally

```bash
# Open a browser at localhost
npm run dev
```
### Running the Servers Locally

```bash
# Navigate to the api folder
node app.js

# Navigate to the socket folder
node app.js
```


### Build the Website

```bash
npm run build
```
