'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BotKayit extends Model {
        static get table() {
          return 'botKayit'
        }
        static get connection() {
          return 'mongodb'
        }
        static get primaryKey() {
          return 'uid'
        }
        static get createdAtColumn() {
          return 'created_at'
        }
        static get updatedAtColumn() {
          return 'updated_at'
        }
}

module.exports = BotKayit
