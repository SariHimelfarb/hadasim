To open my Corona project you must connect to the sql-sever database, if you don't have one on your computer you can download it from the following link:
https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16
Then run the following commands on the server on the data layer:
add-migration [name]
update-database

When you run the client side written in React, a list of all members of the HMO will appear
And it will be possible to add a member to the health fund

![מראה החברים בקופת חולים](https://github.com/SariHimelfarb/hadasim/assets/149975170/f833ae7d-a9fd-47f1-acc8-0f1cf32c11bc)

Each member can be deleted by clicking the delete button
and updating its details by clicking the update button

Each member has the "corona" button, when you click on it, the corona data on that health fund member appears.
The list of vaccines will always appear with a button to add a vaccine, but there is a limit to adding up to four vaccines.
The corona sick dates will appear if the member is sick with corona.
![פרטי קורונה](https://github.com/SariHimelfarb/hadasim/assets/149975170/a2ae4166-9893-4025-a404-d239c2900db1)


A patient who is currently positive for Corona will appear in the list of friends in red
