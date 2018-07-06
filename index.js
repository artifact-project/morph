const dummy = document.createElement('div');

export function morph(dst, src) {
	if (typeof src === 'string') {
		dummy.innerHTML = src;
		src = document.createDocumentFragment();

		let el;
		while (el = dummy.firstChild) {
			src.appendChild(el)
		}
	}

	return patch(dst, src);
}

function patch(dst, src) {
	let newChild = src.firstChild;
	let oldChild = dst.firstChild;
	let newNext;
	let oldNext;
	let changed = false;

	while (oldChild != null && newChild != null) {
		newNext = newChild.nextSibling;
		oldNext = oldChild.nextSibling;

		if (
			oldChild.nodeType !== newChild.nodeType
			|| oldChild.nodeName !== newChild.nodeName
		) {
			changed = true;
			dst.replaceChild(newChild, oldChild);
		} else if (oldChild.nodeType === oldChild.TEXT_NODE) {
			if (oldChild.nodeValue !== newChild.nodeValue) {
				changed = true;
				oldChild.nodeValue = newChild.nodeValue;
			}
		} else {
			changed = patchAttributes(oldChild, newChild) || changed;
			changed = patch(oldChild, newChild) || changed;
		}

		newChild = newNext;
		oldChild = oldNext;
	}

	if (newChild) {
		do {
			changed = true;
			newNext = newChild.nextSibling
			dst.appendChild(newChild);
		} while (newChild = newNext);
	}

	if (oldChild) {
		do {
			changed = true;
			oldNext = oldChild.nextSibling;
			dst.removeChild(oldChild);
		} while (oldChild = oldNext);
	}

	return changed;
}

function patchAttributes(oldNode, newNode) {
	const exists = {};
	let changed = false;
	let i = oldNode.attributes.length;

	while (i--) {
		const oldAttr = oldNode.attributes[i];
		const newAttr = newNode.attributes[oldAttr.name];

		exists[oldAttr.name] = 1;

		if (newAttr == null) {
			changed = true;
			oldNode.removeAttribute(oldAttr.name);
		} else if (oldAttr.nodeValue !== newAttr.nodeValue) {
			changed = true;
			oldAttr.nodeValue = newAttr.nodeValue;
		}
	}

	i = newNode.attributes.length;
	while (i--) {
		const {name, nodeValue} = newNode.attributes[i];

		if (!exists.hasOwnProperty(name)) {
			const oldAttr = oldNode.attributes[name];

			if (oldAttr == null) {
				changed = true;
				oldNode.setAttribute(name, nodeValue);
			} else if (oldAttr.nodeValue !== nodeValue) {
				changed = true;
				oldAttr.nodeValue = nodeValue;
			}
		}
	}

	return changed;
}