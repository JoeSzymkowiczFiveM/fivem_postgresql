# fivem_postgresql

A FiveM resource to communicate with a PostreSQL database using [pg](https://www.npmjs.com/package/pg). Just another toy database wrapper for fivem.


## ✨ Features

- Several CRUD methods for records-related tasks, with more planned in future releases.
- Usage examples to be added later.

## 📚 Installation

- Clone this repository to `fivem_postgresql` in your FiveM `resources` folder.
- Copy `fivem_postgresql/database.cfg` to your server root directory.
- Add the following lines to your server config:
```
exec "database.cfg"
start fivem_postgresql
```
- Change `postgresql_host`, `postgresql_port`, `postgresql_username`, `postgresql_password` `postgresql_database`, and `postgresql_schema` in `database.cfg`.
- Run `npm install` in `resources/fivem_postgresql` directory.


## 👀 Usage

- Add the following line to the fxmanifest of the resource you want to use fivem_postgresql in:
```
server_script '@fivem_postgresql/lib/PostgreSQL.lua'
```


## 👐 Credit

Just another toy database wrapper for fivem. I used knowledge, code and patterns from the [fivem-mongodb](https://github.com/nbredikhin/fivem-mongodb) resource to develop this. Huge shoutout to the [Overextended](https://github.com/overextended) and [Qbox](https://github.com/Qbox-project) groups for technical discussions and support.


# Discord

[Joe Szymkowicz FiveM Development](https://discord.gg/5vPGxyCB4z)
