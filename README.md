# Project Name: Glucose Tracker
### How to run this app?
- Build and run on IOS: react-native run-ios
- Build and run on Android: react-native run-android

### What library is utilized for the beautiful view?
https://reactnativepaper.com

# Project Owner: Kawsar Project
# Description:  
Patients submit their food intake, blood glucose level and exercise information from their phone applications and doctors can view those information graphically from a phone application or web app


# Aaron's Discussion Notes with Dr. Kawsar:
Two views:
- Doctor
- Patient

DIABETIC, DOCTORS interested in carbohydrates, water, vitamins, protein, how much carbohydrates int that food, minerals, monitoring diabetic, HOW MUCH CARBOHYDRATES IN FOOD. When entering food, page called food / meal, enter data for breakfast, enter plus sign, add a food like apple, bread, banana. Food API from government that has ingredients of food. Apple would show ingredients and calculate carbohydrates. Doctor sees carbohydrates. Need food / meal menu for patient. Use free version of API. Patient should also have the data stored on them to help them see what works for them and what does not.

Doctor will see this graphically. Patient doesn’t get that information, just for doctor. Doctor can see a list of all patients and can select 1 and get all the information for that patient.

Glucose:
Before breakfast, after lunch, after dinner enter glucose level. Glucose level higher after meal. Need to say before or after meal. Dropdown menu: before / after & breakfast, lunch, and dinner. Date is current date and time. But, should have an option to change date. Default is current date. Submit. Doctor will be able to see a longitudinal data. IF HAVE TIME: see all before and after food records.

In settings for doctor:
Doctor will be able to setup a threshold. If glucose is too low or too high, send an alarm. Have the option to setup and get a notification somehow.

In settings for patient:
- Have a reminder to enter blood glucose level every day. Two alarms for two meals a day maybe.

Excersie information: how many steps, how active you are. If cannot do this, must do it manually: have four actives such as biking, walking, running, elliptical.

We should have both the web application and the mobile application. Doctor would prefer web application. Pretty similar to what we discussed about web application.

If everything works and have time: would like to compare two patients.

Graphs:
- Example: Line chart, with time by glucose level



# Josiah's Discussion Notes with Dr. Kawsar:
We need to have a Project created for us.

Food intake

Doctors are interested in carbohydrates in the food
	• Six types of things in food

When the food is being entered
	• Breakfast
		○ Like a plus sign for the different food
	• Lunch
		○ Like a plus sign for the different food
	• Food
		○ Like a plus sign for the different food

The daily values and monthly carbohydrates should be shown in a graphical way

USD free API for the inherent of the food to select and calculate carbohydrate of the food selected

A doctor will see a list of patients that are theirs

Blood Glucose Level
	* Before and after each meal
	* By default, the Glucose level is higher after a meal
	* So if a record is not recorded with a before or after meal identification it will be useless
Dropdown menu for the selection of the meal for the patient
	* The date and time are automatic]
	* But the option to change it should be changeable by the patient
A doctor should be able to see the
	* The doctor will set up a threshold for the patient's levels
	* The range from 80 to 150
		○ If the levels are
		○ Split it from the patina

Exercise Data
	• Step collection
		○ Apple watch
			§ Health app apple?
	• Automatically collect the active data.
		○ If not manually enter the exercise data
	• Four Activities
	• History of activities contrasted against the food eaten
	• Reminders for Entering the Glucose Data
		○ Notification before and after each meal

Possible use of a smartwatch to monitor patient reactions to different foods against the patient's ecosystem


# Extended notes for Sprint 2

## Main Menus for patients:
1. Exercise
2. Nutrition / meal entering / gets carbohydrates
3. Blood Glucose
4. View your data
    1. Then give three options to see those
### Also: show settings
- Name
- Address
- Email address
- Phone number
- allow to set proper unit of data


## Main Menus for doctors:
Doctor login

1. Patients list
    1. Doctors can’t see any patients unless admin has added patient
    2. Click user
        1. Dr kawsar: 3 tabs
            1. Click one tab
            2. See a patients chart
                1. Direct comparison against another patient

### Also: show settings
- Name
- Address
- Email address
- Phone number
- Glucose level: allow to set unit they want to see data


### Admin can change who a patient’s doctor is
    - Potentially, doctor and patient could transfer
    - Verification process - a flag, only admin can accept them

### How to run
		- Pre-Conditions: Must have node.js install and have the expo app on your phone
		- https://facebook.github.io/react-native/docs/getting-started.html
		- https://nodejs.org/en/download/

		- Mobile
		- 1) Download the glucose tracker zip file and extract it
		- 2) In file explorer inside of the GlucoseTracker file and type cmd in the top bar
		- 3) Install react by running the command “npm install react-native"
		- 4) Once installed run the command “npm start”
		- 5) After a short while, there should be a QR code. Scan the code with the expo app for Android or with the camera app for iPhone
		- 6) Allow the application to build and it will start automatically

		- Web
		- 1) Download the glucose tracker zip file and extract it
		- 2) In file explorer inside of the GlucoseTracker\web and type cmd in the top bar
		- 3) Install react by running the command “npm install react-native"
		- 4) Once installed run the command “npm start”
		- 5) The application will build and then open up in your web browser
