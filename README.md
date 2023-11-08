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
- Change `pocketbase_url`, `pocketbase_useremail`, and `pocketbase_password` in `database.cfg`.
- Run `npm install` in `resources/fivem_pocketbase` directory.


## 👀 Usage

- Add the following line to the fxmanifest of the resource you want to use fivem_pocketbase in:
```
server_script '@fivem_postgresql/lib/PostgreSQL.lua'
```


## 👐 Credit

Just another toy database wrapper for fivem. I used knowledge, code and patterns from the [fivem-mongodb](https://github.com/nbredikhin/fivem-mongodb) resource to develop this. Huge shoutout to the [Overextended](https://github.com/overextended) group for technical discussions and support.


# Discord

[Joe Szymkowicz FiveM Development](https://discord.gg/5vPGxyCB4z)
