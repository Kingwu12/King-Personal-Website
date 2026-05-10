import Head from 'next/head';
import {memo} from 'react';

import MotherDayMuseum from '../components/MotherDay2026/MotherDayMuseum';

/**
 * Route: /motherday2026 — Mother’s Day museum (standalone; content lives in MotherDayMuseum + `public/motherday2026/`).
 */
const MotherDay2026Page = memo(() => {
  return (
    <>
      <Head>
        <title>给妈妈</title>
        <meta content="一些照片，一些回忆，还有一些平时没怎么说出口的话。" name="description" />
      </Head>
      <MotherDayMuseum />
    </>
  );
});

MotherDay2026Page.displayName = 'MotherDay2026Page';
export default MotherDay2026Page;
