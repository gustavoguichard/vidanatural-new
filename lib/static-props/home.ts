import shuffle from 'lodash/shuffle'

import api from 'lib/api'
import parsePost from 'lib/parsers/blog-post'
import parseProduct from 'lib/parsers/product'

import { BlogPost } from 'types/cms'
import { ParsedProduct } from 'types/vnda'

export default async () => {
  const testimonialsData = await api.cms.getByTypeAndTags('testimonial', {
    fetch: ['name', 'picture', 'content', 'short_content'].map(
      (field) => `testimonial.${field}`,
    ),
  })
  const banners = await api.cms.getByTypeAndTags('home_banner', {
    orderings: '[my.home_banner.order]',
  })
  const postsResponse = await api.cms.getByTypeAndTags('blog_post', {
    orderings: '[my.blog_post.date desc]',
    fetch: ['title', 'body', 'author', 'date'].map(
      (tag) => `blog_post.${tag}.`,
    ),
    fetchLinks: ['team_member.name', 'team_member.picture'],
    pageSize: 4,
  })
  const serverData = await api.vnda.search()
  const products = serverData
    .map(parseProduct)
    .filter((p: ParsedProduct) => p.inStock)
  const posts = (postsResponse as BlogPost[]).map(parsePost)
  const testimonials = shuffle(testimonialsData)
  return {
    props: { banners, testimonials, posts, products },
    revalidate: 60 * 10,
  }
}
