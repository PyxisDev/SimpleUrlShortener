# SimpleUrlShortener
1st Personal Project 'Url Shortener with Custom alias'

## Usages
* Node.js
* Express
* Mongodb
* and more..?

## Date
* Starting: 2017. 03. 08.
* Ending(Plan): 2017. 03. 25.

## Datebase Scheme (Plan)

### urls
* _id type:String, index: true
* origUrl: String
* createdAt: DATE

### counters
**As i know correct knowledge, mongo don't support automatically increase id**

*but, if we use alias url?*

* _id: type:String, required:true
* seq: type:Number, default:0

## License
MIT
