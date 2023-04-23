# InsuredMineAssessment

1) Create API to upload the attached XLSX/CSV data into MongoDB.
2) CRUD operation for User, Account, and Policy
3) Consider each info as a different collection in MongoDB (Agent, User, User's Account, LOB, Carrier, Policy).

Created an API to insert CSV data to mongoDB where each info is a different collection. Added endpoints for performing CRUD operations on Users, Accounts and Policy.

Steps to run:
1. create a database "insuredmine" in mongoDb using mongo compass/robo3t.
2. run the project by using command "node upload.js" in terminal.
3. Test your API using Postman or any other HTTP client. 
*POSTMAN configuration*
headers: content-type as "text/csv"
body: select key as "file" and upload the csv file.
4. make a POST call with URL "http://localhost:5000/upload" to upload CSV data to mongodb.
5. perform CRUD operations by using GET, PUT, POST methods on postman with the api endpoints mentioned in uploads.js


