# Collaborative-Music-Player
Online Music Player for CS3704

This application is hosted using firebase
Firebase dashboard link: https://collabplayer.firebaseio.com/
Firebase app link: https://collabplayer.firebaseapp.com/

The folder firebase inside of this repo is where the firebase app is initialized.
See this tutorial for more information. You do not have to run 'firebase init' since that has already been done.

#Workflow
---------

All of the static files will be inside firebase/public.
Make changes to those files.
When you wanna to redeploy the app to test or see your changes on the app just type 'firebase deploy' in the firebase directory

When you start to make changes always pull. People will be making changes all of the time so pull as often as you want.
If git yells at you saying you have unstaged changes just type 'git stash'. This will temporarily remove all of your changes so you can pull the changes other people pushed. Once you finished the full type 'git stash apply' and it will reapply the changes. You can now push your changes

When you are making changes please checkout your own branch to push to. Open merge requests on github. This workflow will keep problems to a minimum.

#Testing
--------
The system tests are implemented using Selenium Webdriver for Python
- PyCharm Community Edition 4.5.4 (Python IDE)
- Python Version 2.7.10
- Selenium Web Driver Version 2.48.0

  - Set Up Instructions
    - Install Python 2.7.10 [(https://www.python.org/downloads/release/python-2710/)]
    - Install Selenium Web Driver 2.48.0 [(http://www.seleniumhq.org/download/)]
  - These tests and environments were set up by Brian Kaplan
    - If you run into issues please do not hessitate to contact me




