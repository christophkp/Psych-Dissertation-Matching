# User Manual

This manual serves as a comprehensive guide to setting up and using our software as a standard user or admin.

## Standard User

To get started, simply visit the registration page to register your account. Fill in all of the required fields and click register to be redirected to the login page. Log in with your credentials to access the site. **If you are a faculty, contact the admin to change your account from a student account to a faculty account.** In order to submit your rankings, simply visit the ranking page by clicking on "Rank" in the navigation bar and filling out the form. If you are a student, you can schedule meetings with faculty by visiting the meetings page. Students and faculty can also update their profile (change password, profile picture, information, research, etc.) by clicking on their name in the top right corner and selecting "Profile" from the dropdown. To explore different sections of our site, utilize the navigation bar.

## Admin

To get started, simply visit the registration page to register your account. Fill in all of the required fields and click register to be redirected to the login page. Log in with your credentials to access the site. **In order to change your account from a student account (default) to an admin account, you must change your role within the database.** After following the installation instructions to properly setup MySQL database and Workbench, open Workbench.

1. Select the Users table with the following query:<br /> "SELECT \* FROM PDM.Users;"
1. Find your account on the Users table and locate the id (first column)
1. Execute the following query after replacing '<your_user_id>' with your actual user id:<br /> "UPDATE `PDM`.`Users` SET `role` = 'admin' WHERE (`id` = '<your_user_id>');"
1. You have successfully updated your account to an admin account

Upon accessing the site as an admin, you'll unlock the admin panel. To access the admin panel simply click on "Admin Panel" in the navigation bar. From the admin panel, you can manager users, view student and faculty rankings, and generate matches. **In order to change an account from student to faculty, from the admin panel navigate to the "User Managment" tab. Locate the account you want to change and click "edit". A modal will pop up and you can simply change the role from student to faculty in the dropdown, and save changes.**