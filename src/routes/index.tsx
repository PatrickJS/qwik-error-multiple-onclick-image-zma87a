import { $, component$, useStore, useStyles$ } from '@builder.io/qwik';
import ImgThunder from '~/media/thunder.png?jsx';
import styles from './styles.css?inline';

export default component$(() => {
  useStyles$(styles);

  // Usestore with arrays in it, will be mapped in the html.
  // This error specifically happens with arrays in useStore.

  // But it is specifically the clicklistener that fires multiple times. See console.log

  const colVals = useStore({
    col1: [] as string[],
    col2: [] as string[],
  });

  // Both buttons use the same function.

  const appendBox = $((col: string) => {
    colVals[col as keyof typeof colVals].push('');
  });

  return (
    <>
      <div class="row">
        <div class="col">
          <p>{'<img />'}</p>
        </div>
        <div class="col">
          <p>{'<ImgThunder />'}</p>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <img
            src="https://cdn.jsdelivr.net/gh/mhevery/qwik-starter@main/src/media/thunder.png"
            style="width:40px; height:40px"
            onClick$={() => {
              appendBox('col1');
              console.log('Col1 clicked');
            }}
          />
        </div>
        <div class="col">
          <ImgThunder
            style="width:40px; height:40px"
            onClick$={() => {
              appendBox('col2');
              console.log('Col2 clicked');
            }}
          />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <p>{colVals.col1.length}</p>
        </div>
        <div class="col">
          <p>{colVals.col2.length}</p>
        </div>
      </div>

      <div class="row">
        <div class="col" id="col1" style="display:block">
          {colVals.col1.map(() => (
            <p>Click</p>
          ))}
        </div>
        <div class="col" id="col2" style="display:block">
          {colVals.col2.map(() => (
            <p>Click</p>
          ))}
        </div>
      </div>
    </>
  );
});
