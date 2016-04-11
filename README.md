Original Blog post has instructions >> http://mherman.org/blog/2015/10/22/node-postgres-sequelize/#.VijvshNViko
### Installation Instruction

* Check out this git repo: git clone https://github.com/shailpurohit/node-postgres-sequelize.git
* In the code directory, assuming you already have bower and npm set up, type: npm install
* Then: bower install
* Then: gulp
* That's it, you're set to go

### Database table creation
* Check out whether sequelize-cli is installed or not. If not run 
npm install sequelize-cli@2.1.0 --save
* Run node_modules/.bin/sequelize init
* Run this scipt for creating Todo table migration script
node_modules/.bin/sequelize model:create --name Todo --attributes "title:string, complete:boolean,UserId:integer"
* Run this scipt for creating User table migration script
node_modules/.bin/sequelize model:create --name User --attributes "email:string"
* Run the migration to create the tables
node_modules/.bin/sequelize db:migrate

