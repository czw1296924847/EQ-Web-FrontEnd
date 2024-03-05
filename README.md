# EQ-Web-FrontEnd
**EQ-Web-FrontEnd** is a web frontend used for seismology including magnitude estimation and so on. <br>

Its backend framework is [EQ-Web-BackEnd](https://github.com/zw-Ch/EQ-Web-BackEnd)<br>

## Installation
**EQ-Web-FrontEnd**  is based on [React](https://react.dev/) and [Antd](https://ant-design.antgroup.com/index-cn). You can obtain relevant tutorials from [Using React with Django to create an app: Tutorial](https://blog.logrocket.com/using-react-django-create-app-tutorial/#building-react-app).<br> <br>
Firstly please confirm you have installed [Node.js](https://nodejs.p2hp.com/) and [npm](https://npm.p2hp.com/), here is an optional tutorial: [https://zhuanlan.zhihu.com/p/47977487](https://zhuanlan.zhihu.com/p/47977487). <br>
Then you can create a react app for yourself <br>
```
npx create-react-app EQ-Web-FrontEnd
```
There are some packages need to be installed<br>
```
npm install bootstrap reactstrap axios --save
npm install react-dom --save
npm install react-router-dom --save
npm install antd --save
npm install @ant-design/charts --save
npm install react-syntax-highlighter --save
npm install @antv/l7 --save
npm install @antv/l7-maps --save
```

## Program Description
### 1. Start Service
After completing all the configurations, you can enter the project and initiate it
```
cd EQ-Web-FrontEnd
npm run start
```
then go to the web page <br>
```
{ip}:{port}/inform/
```
where in our example, host = 127.0.0.1 and port = 8080. Then you will see <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/inform.png)<br>

### 2. Change Language
You can change the language including `English` and `Chinese` in **setting** >> **Language** <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/change_language.png)<br>

### 3. Magnitude Estimation
We provide some deep learning models for magnitude estimation, and the used dataset can be downloaded from [https://github.com/smousavi05/STEAD](https://github.com/smousavi05/STEAD).

#### 3.1. Model Training

#### 3.2. Model Testing

#### 3.3. Draw Results

#### 3.4. Operation Record
