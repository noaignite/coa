import { sleep } from '@noaignite/utils'
import { filter, products } from '~/api/__mock__'

export * from './_centra'
export * from './_cms'
export * from './_global'
export * from './_i18n'

export async function fetchProducts(query) {
  await sleep(500)
  console.log('fetchProducts', query) // eslint-disable-line no-console

  return { filter, products, productCount: products.length }
}
