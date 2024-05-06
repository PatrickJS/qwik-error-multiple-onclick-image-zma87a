import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';

import Header from '~/components/starter/header/header';
import Footer from '~/components/starter/footer/footer';

import styles from './styles.css?inline';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <p style="padding:30px; font-family: Helvetica">
        Here is an example showing how an onclick on a <span>{'<img />'}</span>{' '}
        vs imported <span>{'<ImageExample />'}</span> will cause the click to
        fire multiple times, specifically only when the function for the
        clicklistener adds an object to an array, and the array is mapped into
        the html with <span>{'array.map(()=>(<></>))'}</span>.
        <br />
        <br />
        If the function only adds html using{' '}
        <span>
          {'divToPopulate.innerHTML = divToPopulate.innerHTML + newText'}
        </span>{' '}
        the bug won't happen.
        <br />
        <br />
        Also, if the <span>{'<ImageExample />'}</span> is wrapped into a{' '}
        <span>{'<div>'}</span> and the div gets the onclick instead, the bug
        won't happen.
      </p>

      <main>
        <Slot />
      </main>
    </>
  );
});
