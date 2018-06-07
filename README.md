# README

This is an application for creating new Tasks for a given signed up user. To start:

* clone the project
* go into the directory, make sure the correct gemset is created (```rvm gemset create shyftplan_test```)
* create the master.key file with the credentials I have sent you, copy the text over to ```vim config/master.key```
* setup the development database with ```rake db:create``` and then do ```rake db:migrate```
* now you can start the application as usual with ```rails s```
* you can also run API tests with ```rake test```