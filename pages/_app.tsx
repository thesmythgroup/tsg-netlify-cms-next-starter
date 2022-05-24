import '../styles/index.css';
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { asPath } = useRouter();
  pageProps.path = asPath;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
