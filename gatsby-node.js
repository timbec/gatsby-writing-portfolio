/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    const PostList = path.resolve('./src/templates/PostList.js')
    const PostTemplate = path.resolve("./src/templates/mainPage.js")

    return graphql(`
    {
      allWordpressPost {
        edges {
          node {
            wordpress_id
            slug
            title
            content
          }
        }
      }
      allWordpressPage {
          edges {
              node {
                  slug
                  wordpress_id
              }
          }
      }
    }
  `).then(result => {
        if (result.errors) {
            throw result.errors
        }

        const PostTemplate = result.data.allWordpressPost.edges
        PostTemplate.forEach(post => {
            createPage({
                path: `/post/${post.node.slug}`,
                component: PostTemplate,
                context: {
                    id: post.node.wordpress_id,
                },
            })

            const Pages = result.data.allWordpressPage.edges
            Pages.forEach(page => {
                createPage({
                    path: `/${page.node.slug}`,
                    component: PageTemplate,
                    context: {
                        id: page.node.wordpress_id,
                    },
                })
            })
        })
    })
}