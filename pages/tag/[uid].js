import React from 'react'
import { useRouter } from 'next/router'
import isEmpty from 'lodash/isEmpty'
import startCase from 'lodash/startCase'

import staticProps from 'lib/static-props/tag-uid'
import staticPaths from 'lib/static-paths/tag-uid'

import EcommerceLayout from 'layouts/ecommerce'
import Banner from 'components/banner'
import Breadcrumbs from 'components/breadcrumbs'
import HomeFeed from 'components/home/feed'
import SEO from 'components/seo'
import ProductGrid from 'components/product-grid'
import ProductFaq from 'components/products/faq'
import Testimonials from 'components/testimonials'

const TagPage = ({ banner, products, posts, testimonials, faqItems }) => {
  const router = useRouter()
  const title = `Tag: ${startCase(router.query.uid)}`
  const hero = banner ? <Banner {...banner} /> : null
  const emptyPage =
    [banner, products, posts, testimonials, faqItems].every(isEmpty) &&
    !router.isFallback
  return (
    <>
      <SEO title={title} />
      {hero}
      <div className="max-w-screen-xl p-10 m-auto">
        <div className="max-w-screen-lg m-auto text-center">
          <Breadcrumbs>{title}</Breadcrumbs>
        </div>
        {(router.isFallback || !isEmpty(posts)) && (
          <>
            <h3 className="m-8 text-3xl font-semibold tracking-tight text-center">
              Posts no blog
            </h3>
            {posts?.length && <HomeFeed posts={posts} />}
          </>
        )}
      </div>
      <div className="max-w-screen-xl px-6 py-10 m-auto border-t-8 border-white">
        {isEmpty(products) || (
          <>
            <h3 className="m-8 text-3xl font-semibold tracking-tight text-center">
              Produtos relacionados
            </h3>
            <ProductGrid products={products} />
          </>
        )}
        {emptyPage && (
          <h2 className="mx-4 mb-4 text-4xl font-bold tracking-tight text-center">
            Nenhum conteúdo para a {title}
          </h2>
        )}
      </div>
      <ProductFaq items={faqItems} />
      <Testimonials testimonials={testimonials} />
    </>
  )
}

TagPage.getLayout = EcommerceLayout
export const getStaticPaths = staticPaths
export const getStaticProps = staticProps
export default TagPage
