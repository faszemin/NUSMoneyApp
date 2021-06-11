# NUSMoneyApp
Application will use postman to receive mock data - nodejs axios module is used to connect with postman end point. 

Creating a conflict to test merging conflict

![image](https://user-images.githubusercontent.com/76104855/121558162-fe210e00-ca47-11eb-8cb2-bc7b162b4dc0.png)

Populating a Dockerfile - Building Container
1) Use Ubutu Server to run node application
2) Update Ubutu Server
3) Install Nodejs and node package manager
4) Install Axios and Express Module from Node Package Manager
5) Create a user to run the bash command

docker build . -t nusmoneyappimage

Push Image to Docker Hub

![image](https://user-images.githubusercontent.com/76104855/121560200-e054a880-ca49-11eb-8e53-99ad97e66629.png)

Run Image From Docker Hub 
docker run -d -p 8082:8080 faszemin/nusmoneyapp

Backend running in VM
![image](https://user-images.githubusercontent.com/76104855/121564460-0da35580-ca4e-11eb-92fb-961152fe0f82.png)


<u>Next Step</u>
1) Containerize a Web Application and not just a backend function 
2) Containerize DB Access
3) Implement CI/CD using Cloud Run and Git Action. Trigger a build and deployment when a change is pushed in the source code. 

