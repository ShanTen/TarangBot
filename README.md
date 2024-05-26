# TarangBot 2021
<p align="center">
  <img height="400" src="https://raw.githubusercontent.com/ShanTen/staticHaver/master/tarangYikes.PNG">
</p>

[Tbot in action!](https://raw.githubusercontent.com/ShanTen/staticHaver/master/Tbot.png)

### *Experience Euphoria!*

The discord bot written to handle registrations 
for The PSBB Millennium's Annual Culturals Event Tarang

Written in JS and using discord.js 12 for discord client api.

## Features

### **Automatic google forms registration integration:**
The application polls a Google Sheets file that is linked to the registration form andreceives all participant metadata automatically.This means that hopefully when a participant joins the server, he/she should *automagically* get a role assigned from the bot.

### **Normalised Data Loading**
All runtime data loading is normalised through three json config files, namely
    
    googleSheetsConfig --> API keys and sheet meta data for Google Sheets
    
    serverConfig --> Channel and Role IDs of the server
    
    Config (Main)  --> Discord API and Event Statuses
    
    Additionally, 2 more json files exist to handle registration data.

  
### **Command Handler**
    All bot commands are handled by a command handler.
    
File art and RequestParser.js by [Vishal](https://github.com/VishalVSV/)

[Last Year's Bot](https://github.com/VishalVSV/TarangBot/blob/master/README.md)