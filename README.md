# Notes App Project

A full-stack notes management application with React (Frontend), Spring Boot (Backend), and MySQL (Database).

## Technologies Used

### **Frontend**  
- **React**: 19.0.0  
- **Vite**: 6.2.0  
- **React Router DOM**: 7.2.0  
- **Axios**: 1.8.1  
- **Material-UI (MUI)**: 6.4.6  
- **IDE**: Visual Studio Code (Recommended)  

### **Backend**  
- **Spring Boot**: 3.4.3  
- **Java**: 17  
- **Spring Data JPA**  
- **Spring Security**  
- **JWT Authentication**: 0.11.5  
- **Lombok**: 1.18.36  
- **IDE**: IntelliJ IDEA (Recommended)  

### **Database**  
- **MySQL**: 8.x  
- **MySQL Workbench** (Recommended GUI)  
- **Port**: 3306  

---

## Prerequisites  
1. **Node.js** (v18+ recommended) - [Download](https://nodejs.org/).  
2. **Java 17 JDK** - [Download](https://www.oracle.com/java/technologies/downloads/).  
3. **MySQL Server & Workbench** - [Download MySQL](https://dev.mysql.com/downloads/mysql/), [Download Workbench](https://dev.mysql.com/downloads/workbench/).  
4. **Lombok Plugin** (Install in IntelliJ IDEA for Backend).  

---

## Database Setup

### **Create Schema**  
1. Open MySQL Workbench and connect to your MySQL server.  
2. Run the following SQL query to create the database:  
   ```sql
   CREATE SCHEMA notes_app;
   ```

### **Import Data (Optional)**
If you download the SQL dump file (`notes_app.sql`), import it via MySQL Workbench:

1. Navigate to **Server > Data Import**.
2. Select "Import from Self-Contained File" and choose your `.sql` file.
3. Select the `notes_app` schema as the target.

---

## **Backend Setup**

### **Open Project in IntelliJ IDEA**
1. Import the Backend as a Maven project.

### **Configure Database**
Update credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.username=root  
spring.datasource.password=root  
```

### **Install Dependencies**
Run:

```bash
mvn clean install  
```

---

## **Frontend Setup**

### **Open Project in VS Code**
1. Navigate to the frontend directory.

### **Install Dependencies**
Run:

```bash
npm install  
```

---

## **Running the Project**

### **Backend**
Start the Spring Boot application:

```bash
mvn spring-boot:run  
```
- **URL**: [http://localhost:8080](http://localhost:8080)
- **Port**: `8080`

### **Frontend**
Start the development server:

```bash
npm run dev  
```
- **URL**: [http://localhost:5173](http://localhost:5173) (Vite default port).
- If port `5173` is busy, Vite will auto-select `5174` or `3000`.

---

## **Important Notes**

### **Port Configuration:**
- **Backend**: `8080` (change in `application.properties`).
- **Frontend**: `5173` (change in `vite.config.js` if needed).
- **MySQL**: `3306` (default).

### **Database Auto-Creation:**
- Tables are created automatically via `spring.jpa.hibernate.ddl-auto=update`.

### **Security:**
- The backend uses **JWT tokens**. Include tokens in API requests for authenticated routes.

---

## **Troubleshooting**

### **Backend Issues**
#### "Failed to Start":
- Verify **MySQL is running** on port `3306`.
- Check credentials in `application.properties`.

#### **Lombok Errors**:
Enable Lombok in IntelliJ:
- Go to **File > Settings > Build > Compiler > Annotation Processors**.
- Enable **annotation processing**.

### **Frontend Issues**
#### "Cannot Connect to Backend":
- Ensure the **backend is running** on port `8080`.
- Add **CORS configuration** to the backend if needed.

#### **Dependency Errors**:
- Delete `node_modules` and run `npm install` again.

### **Database Issues**
#### "Unknown Database `notes_app`":
- Create the schema manually in MySQL Workbench.

#### **Connection Refused**:
- Ensure **MySQL Server is running** and accessible on port `3306`.  
