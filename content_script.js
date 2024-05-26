// Script executed after page load.
//
// Clicks on all buttons which contain "Load more..." or "Load diff"

const find_buttons =
    (text) => Array.from(document.getElementsByTagName("button")).filter((e) => e.textContent.includes(text));

async function expandAllLoads(mutations) {
    // If a text or button node was added
    if (!mutations.some((m) => Array.from(m.addedNodes).some((n) => n.nodeName === "#button" || n.nodeName === "#text"))) {
        return
    }

    // Click on all "Load more…" and "Load diff" buttons
    let loads = find_buttons("Load more…").concat(find_buttons("Load diff"));
    loads.forEach((b) => b.click());
}

let observer = new MutationObserver(expandAllLoads);
observer.observe(document.body, { childList: true, subtree: true });
