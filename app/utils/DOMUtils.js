const handler = (selector, cb) => document.querySelectorAll(selector).forEach(cb);

export const removeClass = (selector, classNameArray) => {
    handler(selector, e => e.classList.remove(...classNameArray));
};

export const elemClick = (elem, cb) => {
    handler(elem, e => e.addEventListener('click', () => cb(e)));
};