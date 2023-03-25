import Dexie from "dexie";

export const indexedDb = new Dexie('toy_titans_cart')

indexedDb.version(1).stores({
    products: '++id, product_id, title, price, image'
})