# Samudai_backend_task

link to the hosted platform -> https://frozen-caverns-73598.herokuapp.com/

I created a News platform with an integrated signup and login page in which users can enlist to see top trending news of various countries depending of the selected country. on their dashboard. The Platform involves three level of access hierarchy viz Admin, Editor and User dashboards. Admin have the permission to select who gets to edit text and which users have only view access i.e. admin grants access types. Editors will have the access to change a text.

I have used Node.js as my backend language and Postgressql database as per the rules of assignment.

Functionalities :
  1. SignUp & Login -> Anyone can signup to the platform chosing their role to get a suitable dashboard (Admin, Editor, User).
  2. Dashboard Creation -> Upon Sign-up every user gets a specific dashboard generated for them. EJS (Embedded JavaScript Templating) is employed for            creation of dashboards.
  2. News -> Every user can view the trending news of any available country. I have used India News API (External API) as a third party widget to fetch the      News and display it on our platform. 
  3. Access Management -> All three type of users will get a specific dashboard suitable for their requirement. Admin dashboard has a section in which          admin can manage the access of other users and can change their respective access. Admin and Editor dashboards comes with an input form to change the      text section which a simple useris denied access to change i.e. can only view/read
 
 Database Schema -> I need to create three tables for storing the data.
   1. User Table -> This table will give a unique id to the users and will store all the data of user such as name, email, phonenumber, 
      hash created using password, roll of the user (Admin, Editor or User).
      
      Schema or the query of the table ->
      <img width="400" alt="Screenshot 2022-11-12 at 8 10 08 PM" src="https://user-images.githubusercontent.com/47215824/201479347-366b9c56-fcf4-4e7a-98a0-21ed19203f06.png">
      
      Example Table of User Table ->
      ![WhatsApp Image 2022-11-12 at 20 23 11](https://user-images.githubusercontent.com/47215824/201480053-8f76f4a7-e9c5-4606-a9a4-1fac75e39394.jpeg)

   2. Dashboard Table -> This table will give a unique id to all the generated dashboards and store data related to them like user_id which refers to             user's id for whom the dashboard is generated and dash_type which is the type of dashboard as selected by the user (Admin, Editor or User).
      
      Schema or the query of the table ->
      <img width="393" alt="Screenshot 2022-11-12 at 8 14 49 PM" src="https://user-images.githubusercontent.com/47215824/201479562-bb10e0cc-22c5-491a-8ee4-a72851af61cc.png">

      Example Table of Dashboard Table ->
      ![WhatsApp Image 2022-11-12 at 20 24 13](https://user-images.githubusercontent.com/47215824/201480102-874451f5-adff-49d4-b931-84bd56015ec6.jpeg)

   3. Static Data Table -> This table just includes some text, one heading and little description as added/edited by user.
   
      Schema or the query of the table ->
      <img width="393" alt="Screenshot 2022-11-12 at 8 19 29 PM" src="https://user-images.githubusercontent.com/47215824/201479756-f8c5c903-8c5c-4b23-b2fa-f9d4e557fb3d.png">
               
      Example Table of Static Data Table ->
      ![WhatsApp Image 2022-11-12 at 20 25 04](https://user-images.githubusercontent.com/47215824/201480128-83296250-3b16-4db2-970a-9292c7a9fb40.jpeg)
      
 APIs -->
  1. "/" -> start point
  2. "/signup" -> POST API to signup the user.
  3. "/login" -> POST API to login the user.
  4. "/dashboard/:id -> GET API to create dashboards followed by dashboard id. "dashboard/1"
  5. "/change" -> POST API through which Admin can change the access of different users.
  6. "/textchange -> POST API through which Editor and admin can change the text.
  
  
