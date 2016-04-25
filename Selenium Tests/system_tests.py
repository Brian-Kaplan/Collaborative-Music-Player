__author__ = 'Brian Kaplan'

#Test Suite for System Tests
#Covers all system tests outline in the Test Cases Document
#Python Version 2.7.10
#Selenium Web Driver Version 2.48.0

from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys

#Simple login test
#Tests the login feature of the application
def testLogin(email, password):
    page = driver.get("https://collabplayer.firebaseapp.com/#/")
    time.sleep(1)
    driver.find_element_by_xpath("//*[@id='txtEmail']").send_keys(email)
    driver.find_element_by_xpath("//*[@id='txtPass']").send_keys(password)
    time.sleep(1)
    driver.find_element_by_xpath("//*[@id='frmLogin']/button").click()
    time.sleep(2)

    #Assert the page was redirected to https://collabplayer.firebaseapp.com/main.html
    if(driver.current_url == "https://collabplayer.firebaseapp.com/main.html"):
        print("testLogin passed")
    else:
        print("testLogin failed")

#Simple user registration test
#Tests the registration feature of the application
#It is essential that an email must not be in use for this test to pass
def testRegister(name, email, password):
    page = driver.get("https://collabplayer.firebaseapp.com/index.html#/register")
    time.sleep(1)
    driver.find_element_by_xpath("//*[@id='txtName']").send_keys(name)
    driver.find_element_by_xpath("//input[@id='txtName']/following::input[1]").send_keys(email)
    driver.find_element_by_xpath("//input[@id='txtName']/following::input[2]").send_keys(password)
    time.sleep(1)
    driver.find_element_by_xpath("//*[@id='frmRegister']/button").click()
    time.sleep(2)

    #Assert the page was redirected to https://collabplayer.firebaseapp.com/main.html
    if(driver.current_url == "https://collabplayer.firebaseapp.com/main.html"):
        print("testRegister passed")
    else:
        print("testLogin failed")

#Tests the inaccessibility of authorized server resources
#If the use is not logged in they should not be able to access the application
def testUnauthorizedUser():
    page = driver.get("https://collabplayer.firebaseapp.com/main.html")
    time.sleep(2)
    if(driver.current_url == "https://collabplayer.firebaseapp.com/index.html#/"):
        print("testUnauthorizedUser passed")
    else:
        print("testUnauthorizedUser failed")


#Tests the mechanism for adding a song to the queue
#Must provide a valid sound cloud URL... i.e. (https://soundcloud.com/ukf/ukf-bass-house-afterdark-megamix)
def testAddingSongToQueue(songLink):
    page = driver.get("https://collabplayer.firebaseapp.com/main.html")
    driver.find_element_by_xpath("//*[@id='songinput']").send_keys(songLink)
    driver.find_element_by_xpath("//*[@id='submitbutton']/label").click()
    row_count = len(driver.find_elements_by_xpath("//table[@id='songqueue']/tbody/tr"))
    time.sleep(2)
    row_count = len(driver.find_elements_by_xpath("//table[@id='songqueue']/tbody/tr"))
    text = driver.find_element_by_xpath("//*[@id='songqueue']/tbody/tr["+str(row_count)+"]/td[2]").text
    if(text == songLink):
        print("testAddingSongToQueue passed")
    else:
        print("testAddingSongToQueue failed")

#Test Suite for System Tests

#Ask tester for arguments
name = raw_input("Name to test with: ")
email = raw_input("Email to test with (must be unused): ")
password = raw_input("Password to test with: ")

#Make an instance of a chrome driver
driver = webdriver.Chrome()


#Run the unauthorized test before logging in
testUnauthorizedUser()
time.sleep(2)


#Run the registration test
testRegister(name, email, password)
time.sleep(2)

#Run the login test with the credential just registered
testLogin(email, password)
time.sleep(2)

#Run the adding song to queue test with the registered user
#Also tests that the users session maintains validity via authorization cookie
testAddingSongToQueue("https://soundcloud.com/darnellwilliams/yungspikelee-south-central")

driver.close()
