# ExB-Google-Widget
A widget to add to Experience Builder Dev ed that opens Google maps (or street view) to a point clicked on the associated map.

This widget is for use with Experience Builder Developers edition.  It was created in visual studio code using Javascript and Jimu-core. 

Copy the entire Google folder to Your ExB root folder\client\your_extensions\widgets. 

Stop the client (control C) and restart (npm start) and the widget should be available to add to an experience builder project.

To use the widget, drag it to your ExB project, and in the settings chose a map widget to associate with the widget.

When the "activate" button is clicked, a click on the map will open Google maps in a separate browser window.  

Use the checkbox to open in street view if a street view of the selected area is available.

Click the button to "deactivate" and normal mouse click function will resume.

