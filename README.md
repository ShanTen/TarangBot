# TarangBot 2021
<p align="center">
  <img width="671" height="671" src="https://media.discordapp.net/attachments/853167765400322086/855063676843196416/Screenshot_20210616-222910_Adobe_Acrobat.jpg?width=671&height=671">
</p>

### *Experience Euphoria!*

The discord bot written for The PSBB Millennium's Annual Culturals Event - Tarang

Written in JS and using discord.js for discord client api.

## Features
+ **Automatic google forms registration integration**
    The application polls a Google Sheets file that is linked to the registration form and receives all participant metadata automatically.
    This means there is no painful secondary role handling when a participant joins the server.

+ **Normalised Data Loading**
    All data loading is normalised through three json config files, namely
    
    *gConfig --> Google Sheets Config*
    
    *serverConfig --> Channel and Role IDs of the server*
    
    *Config (Main)  --> Discord API and Event Statuses*

  
+ **Command Handler**
    All bot commands are handled by a command handler.


      
Checkout Last Year's Bot: <https://github.com/VishalVSV/TarangBot/blob/master/README.md>