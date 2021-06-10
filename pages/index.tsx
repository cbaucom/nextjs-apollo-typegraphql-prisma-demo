import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { initializeApolloAsync } from '../apollo/client';
import styles from '../styles/Home.module.css';

const GET_ALL_LISTS = gql`
  query GET_ALL_LISTS {
    lists(orderBy: { createdAt: desc }) {
      id
      title
      description
      coverPhoto
      items {
        id
        name
        description
        image
      }
      user {
        id
        username
        avatar
      }
      createdAt
      updatedAt
    }
  }
`;

//Todo: Caching needs to be fixed here
export async function getStaticProps() {
  const apolloClient = await initializeApolloAsync();

  await apolloClient.query({
    query: GET_ALL_LISTS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

const Index = () => {
  const { loading, error, data } = useQuery(GET_ALL_LISTS);
  let lists;

  if (data) {
    lists = data.lists;
  }

  return (
    <div>
      <p>Go to "api/graphql" for the playground!</p>
      <ul>
        {lists &&
          lists.length > 0 &&
          lists.map((list) => {
            return (
              <li key={list.id} className={styles.card}>
                  <Link href={`/lists/${list.id}`}>
                  <a>
                    <img alt={list.title} src={list.coverPhoto} />
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: list.title,
                      }}
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: list.user.username,
                      }}
                    />
                  </a></Link>
              </li>
            );
          })}

        {!lists ||
          (lists.length === 0 && (
            <li>
              <p>Oops, no lists found!</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Index;
