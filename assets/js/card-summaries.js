/* Separate navigation from summary disclosure: no nested interactive elements. */
(() => {
    document.querySelectorAll('#grid a.card:not([data-category="notes-and-news"])').forEach((link, index) => {
        const heading = link.querySelector('h2');
        const summary = link.querySelector('.tldr');
        if (!heading || !summary) return;
        const card = document.createElement('article');
        for (const attribute of link.attributes) {
            if (attribute.name !== 'href' && attribute.name !== 'target' && attribute.name !== 'rel') card.setAttribute(attribute.name, attribute.value);
        }
        const articleLink = document.createElement('a');
        articleLink.className = 'article-link';
        articleLink.href = link.getAttribute('href');
        if (link.target) articleLink.target = link.target;
        if (link.rel) articleLink.rel = link.rel;
        while (heading.firstChild) articleLink.append(heading.firstChild);
        heading.append(articleLink);
        while (link.firstChild) card.append(link.firstChild);
        summary.id = `card-summary-${index}`;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'card-summary-toggle';
        button.textContent = 'Expand TL;DR';
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', summary.id);
        button.setAttribute('aria-label', `Expand TL;DR: ${heading.textContent}`);
        button.addEventListener('click', () => {
            const open = card.classList.toggle('is-summary-open');
            button.setAttribute('aria-expanded', String(open));
            button.textContent = open ? 'Show less' : 'Expand TL;DR';
            button.setAttribute('aria-label', `${open ? 'Show less' : 'Expand TL;DR'}: ${heading.textContent}`);
        });
        summary.after(button);
        link.replaceWith(card);
    });
})();
