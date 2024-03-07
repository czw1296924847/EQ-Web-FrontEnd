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

#### 3.1. Python Environment
You can show the libraries of current Python Environment in **setting** >> **Environment** >> **{your_env_name}** <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/python_env.png)<br><br>

#### 3.2. Model Training
Click $\text{\color{hotpink}{Train}}$ button, go to the `Param` page and you can set paramter values <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/train_param.png) <br><br>

Then click $\text{\color{lightgrey}{Run}}$ button, the model start training. You can monitor the training process in `Process` <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/train_run.png) <br><br>

and see the training metrics including `coefficient of determination (R2)` and `root mean square error (RMSE)`

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/train_output.png) <br><br>

#### 3.3. Model Testing
After model training on given paramters, you can click $\text{\color{hotpink}{Training}}$ content in **Title** and for model testing <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/go_test.png) <br><br>

then ensure the parameters are consistent with **Model Training** and click $\text{\color{lightgrey}{Run}}$ button

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/test_run.png) <br><br>

#### 3.4. Draw Results
You can go to the `Result` page to show results. Click $\text{\color{lightskyblue}{Result}}$ button to show the estimated results and true magnitudes. <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/test_result.png) <br><br>

#### 3.5. Operation Record
You can go to the `Record` page to view the training and testing records of given model under different parameters. <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/test_record.png) <br><br>

### 4. Run Custom Codes for Deep Learning
**EQ-Web-FrontEnd** also provides the function for online editing, uploading, and running Python codes. By selecting `TestNet` as an example, click $\text{\color{darkgrey}{Detail}}$ button 

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/TestNet_detail.png) <br><br>

The parts that can be modified through $\text{\color{lightseagreen}{Edit}}$ and $\text{\color{darkorange}{Upload}}$ are as follows
```
Model Name:     the name of deep learning model
Description:    the description of code
Version:        the version of code
Owner:          the author of code
Data Path:      the path to store dataset
Library:        the dependent libraries required for 
Data Code:      the code for processing data
Model Code:     the code for defining model structure
Training Code:  the code for training model
Testing Code:   the code for testing model
Running Code:   the code for running program
```
TestNet codes are from [https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html](https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html). <br>

In `Data_code` and `Running_code`, you can click $\text{\color{lightgrey}{Run}}$ button and get results. <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/TestNet_code_data.png) <br>

![image](https://github.com/zw-Ch/EQ-Web-FrontEnd/blob/main/image/TestNet_code_run.png) <br>

## Project Structure
```
App.css
App.js              # root component, routing management
App.test.js
components/
    Alert.css           # style of Alert Box
    EnvContext.js       # Global, Python Environment
    LanguageContext.js  # Global, Language Style
    func.js             # Public Function
    home/
        detail/                     # 'Detail' page, show detail information of model
            EditModal.js                # Edit and update content
            ModelDetailForm.css
            ModelDetailForm.js          # Table of detail information
            ModelDetail.js
            RunModal.js                 # Run Pyton code
            UploadModal.js              # Upload .py and update content
        dist/
            FeatureDist.js
        Home.css
        Home.js
        func.js                     # Public Function
        information/                # 'Information' page
            Information.css
            Information.js              # Model Information and Dataset Feature
        list/                       # Show Model information and DataSet Feature
            DistModal.js                # Draw value distribution of dataset feature
            FeatureList.js              # Dataset feature
            LocateModal.js              # Draw location of source or station
            ModelList.css
            ModelList.js                # Model information
        locate/
            SourceLocate.js             # Draw source distribution
        login/                      # 'Login' page
            Login.css
            LoginForm.js                # Login submission form, including username and password
            Login.js
            ReLogin.js                  # If not logged in, redirect to 'Login' page
        new/                        # Create new model
            ModelNewForm.js             # New model submission form
            ModelNew.js
        remove/                     # Delete model
            ModelRemove.js
    operation/
        func.js                     # Public Function
        module.js                   # Public Module
        Opt.css
        Opt.js                      # Common components for operation
        OptParam.js                 # 'Param' page
        record/                     # 'Record' page
            OptRecord.css
            OptRecordForm.js
            OptRecord.js
            OptRecordRemove.js
        result/                     # 'Result' page
            CompTruePred.js             # Draw estimated results and true magnitudes
            LossHistory.js              # Draw the loss values during iteration process
            OptResult.css
            OptResult.js                # Show results of training or testing
        test/
            Test.js
            TestParam.js                # Model testing
        train/
            Train.js
            TrainParam.js               # Model training
    share/
        error/                      # when the web page does not exist
            NotFound.js
        func.js                     # Public Function
        Header.css
        Header.js
        menu/
            NavMenu.js                  # Navigation bar menu
            SubNavMenu.js               # Sidebar menu
        MyLayout.css
        MyLayout.js                 # Displaying the menu and side bar
        utils.js
index.css
index.js
logo.svg
reportWebVitals.js
setupTests.js
```

## Problems and Solutions

## Extension

## API Reference
