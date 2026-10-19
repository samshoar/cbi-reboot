'use strict';
// Reading aids only. No accounts, wallet access, analytics, or network requests.
const amount = document.getElementById('send-amount');
if (amount) {
    const money = value => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
    amount.addEventListener('input', () => {
        const value = Number(amount.value);
        document.getElementById('send-value').textContent = money(value);
        document.getElementById('legacy-cost').textContent = money(value * 0.065);
        document.getElementById('chain-cost').textContent = money(value * 0.01);
        document.getElementById('send-saving').textContent = money(value * 0.055);
    });
}
const countries = {
    india: ['India', 'UPI and digital public infrastructure provide a strong domestic base.', 'Remittances, agentic commerce, and programmable working-capital finance.', 'No enabling issuer framework and tax frictions at conversion points.', 'A regulated rupee coin and a capped stablecoin-to-UPI remittance pilot.', '6.1, pp. 31–32'],
    brazil: ['Brazil', 'PIX, Open Finance, and the redirected Drex infrastructure.', 'Cross-border B2B flows, freelancers, and tokenized real-world assets.', 'An unresolved issuer regime, tax uncertainty, and fragmented rules across systems.', 'A dedicated issuer category, tax clarity, and regulated cross-border access to tokenized assets.', '6.2, pp. 33–35'],
    indonesia: ['Indonesia', 'QRIS, BI-FAST, and the SNAP open-API standard.', 'Migrant remittances, commodity trade, and programmable escrow.', 'Stablecoin payments are not permitted under the framework described in the paper; integration also remains less mature.', 'Authorize regulated payments and pilot stablecoin cross-border legs connected to domestic rails.', '6.3, pp. 35–36']
};
function paragraph(label, text) {
    const p = document.createElement('p');
    const strong = document.createElement('strong'); strong.textContent = label + ': ';
    p.append(strong, text); return p;
}
document.querySelectorAll('[data-country]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-country]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const [name, rails, opportunity, constraint, next, source] = countries[button.dataset.country];
    const heading = document.createElement('h3'); heading.textContent = name;
    const citation = document.createElement('p'); citation.className = 'source'; citation.textContent = 'Paper section ' + source + '.';
    document.getElementById('country-result').replaceChildren(heading, paragraph('Existing rails', rails), paragraph('Opportunity', opportunity), paragraph('Constraint', constraint), paragraph('Proposed next step', next), citation);
}));
const steps = [
    ['1 · Request a resource', 'The agent requests data from a server it may never have used before.', 'Agent → resource server\nGET /v1/market-data'],
    ['2 · Receive the price', 'The server responds with a machine-readable price and accepted payment requirements. The agent can decline if the price exceeds its mandate.', 'Resource server → agent\n402 Payment Required\nPrice, supported scheme, asset, and network'],
    ['3 · Authorize within a mandate', 'The agent signs a payment authorization within the principal’s permitted budget. Signing is not the same as settlement.', 'Agent wallet\nCheck mandate → sign bounded payment authorization'],
    ['4 · Retry with authorization', 'The agent repeats the request with the signed authorization attached.', 'Agent → resource server\nGET /v1/market-data + payment authorization'],
    ['5 · Verify and settle', 'The server verifies and settles directly or uses an optional facilitator. The settlement scheme determines the actual rail and timing.', 'Resource server → optional facilitator / settlement network\nVerify authorization → submit payment'],
    ['6 · Deliver the resource', 'The server returns the requested resource with payment response information. Network confirmation does not itself guarantee delivery, redemption, or legal finality.', 'Resource server → agent\n200 OK + resource + payment response']
];
document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-step]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    const [title, text, code] = steps[Number(button.dataset.step)];
    const h = document.createElement('h3'); h.textContent = title;
    const p = document.createElement('p'); p.textContent = text;
    const pre = document.createElement('pre'); pre.textContent = code;
    document.getElementById('step-result').replaceChildren(h, p, pre);
}));
const payment = document.getElementById('payment-size');
if (payment) {
    payment.addEventListener('change', () => {
        const value = Number(payment.value), cardFee = 0.30 + 0.029 * value;
        const percent = value => new Intl.NumberFormat('en-US', {maximumFractionDigits: 3}).format(value) + '%';
        document.getElementById('card-share').textContent = percent(cardFee / value * 100);
        document.getElementById('card-fee').textContent = '$' + cardFee.toFixed(6) + ' processing cost';
        document.getElementById('network-share').textContent = percent(0.0001 / value * 100) + '–' + percent(0.001 / value * 100);
    });
}
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.getElementById('primaryNav');
if (menuToggle && primaryNav) {
    const closeMenu = () => { primaryNav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); };
    menuToggle.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', String(primaryNav.classList.toggle('is-open')));
    });
    primaryNav.addEventListener('click', closeMenu);
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) { closeMenu(); menuToggle.focus(); }
    });
    window.matchMedia('(max-width: 768px)').addEventListener('change', closeMenu);
}
