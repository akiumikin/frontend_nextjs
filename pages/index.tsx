import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';

// import { Amplify } from 'aws-amplify';
// import awsExports from './../aws-exports';
// Amplify.configure(awsExports);

const ProtectedRoute = ({ children }: { children: ReactNode}) => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        // ログイン状態の確認
        const res = await Auth.currentAuthenticatedUser();
      } catch (error) {
        // ログインしていない場合、ログイン画面にリダイレクト
        // router.replace('/signin');
      }
    })();
  }, []);

  return <>{children}</>;
};

import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
// import ProtectedRoute from './../components/ProtectedRoute';

type Props = InferGetStaticPropsType<any>;

const DashboardPage: React.FC<Props> = (props: Props) => {
  console.log(props)

  return (
    <div className={styles.container}>
      <ProtectedRoute>
        <h1>Welcome to Dashboard</h1>
        <>{props.user}</>
      </ProtectedRoute>
    </div>
  );
};

export default DashboardPage;

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const user = await Auth.currentAuthenticatedUser()

//   return {
//     props: {
//       user: user,
//       pageTitle: 'Dashboard',
//     },
//   };
// };

import { withSSRContext } from 'aws-amplify'

export async function getServerSideProps(context: any) {
  const { Auth } = withSSRContext(context)
  try {
    const user = await Auth.currentAuthenticatedUser()
    return {
      props: { user: user.username, message: {} }
    }
  } catch (error) {
    return {
      props: { user: null, message: error }
    }
  }
}
