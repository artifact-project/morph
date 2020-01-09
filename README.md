🦠morph
-------
It's a micro library for DOM patching.

```sh
npm i --save-dev @artifact-project/morph
```

---

### Usage

HTML: `<div id="root">Loading...</div>`

```ts
import { morph } from '@artifact-project/morph';
// OR import { morph } from '/node_modules/@artifact-project/morph/index.js';

const root = document.getElementById('root');
const render = (name = '%username%') => {
	morph(root, `<h1>${name}</h1>`);
};

render(); // [replace node]: "Loading..." -> <h1/>
          // [create & append]: "%username%" (into <h1/>)

render("I'm is morph!"); // [update nodeValue]: "%username%" -> "I'm is morph!"
```

---

### API

#### morph(root, content): `boolean`
Returns `true`, if a DOM will be changed.

 - **root**: `HTMLElement`
 - **content**: `string | HTMLElement`

---

### Development

 - `npm publish --access public`
