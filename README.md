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

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/inform.png)<br><br>

### 2. Change Language
You can change the language including `English` and `Chinese` in **setting** >> **Language** <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/change_language.png)<br><br>

### 3. Magnitude Estimation
We provide some deep learning models for magnitude estimation, and the used dataset can be downloaded from [https://github.com/smousavi05/STEAD](https://github.com/smousavi05/STEAD). <br>

Select one of `MagInfoNet`, `EQGraphNet`, `MagNet`, `CREIME`, `ConvNetQuakeINGV`, and click the button to perform some operation of Magnitude Estimation Task.

#### 3.1. Model Training
Click $\text{\color{pink}{Train}}$ button, go to the `Param` page and you can set paramter values <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/train_param.png) <br><br>

Then click $\text{\color{grey}{Run}}$ button, the model start training. You can monitor the training process in `Process` <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/train_run.png) <br><br>

and see the training metrics including `coefficient of determination (R2)` and `root mean square error (RMSE)`

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/train_output.png) <br><br>

#### 3.2. Model Testing
After model training on given paramters, you can click $\text{\color{pink}{Training}}$ content in **Title** and for model testing <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/go_test.png) <br><br>

then ensure the parameters are consistent with **Model Training** and click $\text{\color{grey}{Run}}$ button

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/test_run.png) <br><br>

#### 3.3. Draw Results
You can go to the `Result` page to show results. Click $\text{\color{blue}{Result}}$ button to show the estimated results and true magnitudes. <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/test_result.png) <br><br>

### 4. Run Custom Codes for Deep Learning
**EQ-Web-FrontEnd** also provides the function for online editing, uploading, and running Python codes. By selecting `TestNet` as an example, click $\text{\color{grey}{Detail}}$ button 

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/TestNet_detail.png) <br><br>

The parts that can be modified through $\text{\color{green}{Edit}}$ and $\text{\color{orange}{Upload}}$ are as follows
```
Model Name:
Description:
Version:
Owner:
Data Path:
Library:
Data Code:
Model Code:
Training Code:
Testing Code:
Running Code:

```

#### 3.4. Operation Record
You can go to the `Record` page to view the training and testing records of given model under different parameters. <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/test_record.png) <br><br>
