import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

import styles from '../../styles/Home.module.css'

const GET_LIST = gql`
	query list($id: Int!) {
		list(where: { id: $id }) {
			id
			title
			description
			coverPhoto
			createdAt
			updatedAt
			items {
				id
				name
				description
				image
			}
			user {
				id
				avatar
				name
				username
			}
		}
	}
`

export default function List() {
	const listId = useRouter().query.id
  const { loading, error, data } = useQuery(GET_LIST, {
    variables: { id: Number(listId) },
  })

  if (loading) {
    console.log('loading')
    return <div>Loading ...</div>
  }
  if (error) {
    console.log('error')
    return <div>Error: {error.message}</div>
  }

  const {list: {title, description = '', items}} = data

  return (
    <div className={styles.container}>
      <Head>
        <title>{ title }</title>
        {description && <meta name="description" content={`${description}`} />}
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          { title }
        </h1>

        <div className={styles.grid}>
          <div className={styles.content}>
            {items.map(item => <li key={item.id}>{item.name}</li>)}
          </div>
        </div>

        <p className={styles.backToHome}>
          <Link href="/">
            <a>
              &lt; Back to home
            </a>
          </Link>
        </p>
      </main>
    </div>
  )
}

