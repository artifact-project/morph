morph
-----
It's a micro library for DOM patching.

```sh
npm i --save-dev @artifact-project/morph
```

---

### Usage

HTML: `<div id="root">Loading...</div>`

```ts
import { morph } from '@artifact-project/morph';

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

#### morph(root, content)

 - **root**: `HTMLElement`
 - **content**: `string | HTMLElement`