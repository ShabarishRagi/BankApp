# BankApp - Frontend Development (Glansa Solutions Internship Project)

This repository contains the frontend codebase for the **BankApp** project, which I developed during my internship at **Glansa Solutions**. My primary responsibility was building the user interface, specifically the application forms, and ensuring their integration with a PHP backend for data storage.

---

## Project Overview

The BankApp project aims to provide a user-friendly interface for various banking operations, with a strong focus on application forms. My role involved translating design requirements into interactive web forms and ensuring they could successfully submit data.

---

## Features

* **User-friendly Application Forms:** Intuitive and easy-to-navigate forms for common banking applications (e.g., account opening, loan applications).
* **Efficient Data Capture:** Designed to accurately capture user input through well-structured form fields.
* **PHP Integration:** Forms are configured to send data to a PHP backend for server-side processing and storage.

---

## Technologies Used

* **HTML5:** For structuring the web content and forms.
* **CSS3:** For styling and layout, ensuring a clean and modern look.
* **JavaScript:** (If applicable) For any client-side interactivity or form validation.
* **PHP:** Used as the backend language to handle form submissions and interact with the database.
* **MySQL:** (Presumed) The database used for storing the submitted application data.

---

## Installation and Setup

To get this project running on your local machine, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/ShabarishRagi/BankApp.git](https://github.com/ShabarishRagi/BankApp.git)
    cd BankApp
    ```

2.  **Web Server Environment:** Make sure you have a local web server environment installed, such as **XAMPP, WAMP, MAMP, or a LAMP stack**. This environment should include **PHP** and **MySQL**.

3.  **Database Setup:**
    * Access your MySQL database (e.g., via phpMyAdmin).
    * Create a new database for the project (e.g., `bankapp_db`).
    * Import any provided database schema or create the necessary tables manually if you were responsible for the backend database structure. *You'll need to add specifics here if you have a `.sql` file or table creation commands.*

4.  **Place Project Files:** Copy the entire `BankApp` directory into your web server's document root (e.g., `htdocs` for XAMPP, `www` for WAMP).

5.  **Configure PHP Connection:**
    * Locate the PHP files that handle form submissions (e.g., `process_form.php` or similar).
    * Update the **database connection details** (database name, username, password, host) within these PHP files to match your local MySQL configuration.

6.  **Access in Browser:** Open your web browser and navigate to the project's URL, typically something like:
    ```
    http://localhost/BankApp/
    ```
    or
    ```
    http://localhost/BankApp/index.html
    ```

---

## Usage

Interact with the application forms provided in the frontend. When you submit a form, the data will be sent to the configured PHP scripts, which are designed to process and store this information in the MySQL database.

---

## Contributing

This project was developed as an internship assignment. For any further development or contributions, please contact the repository owner.

---

## Contact

For questions or further information, feel free to reach out:
Ragi Naga Shabarish
nagashabarsh.ragi@gmail.com
