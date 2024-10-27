// Script executed after page load.
//
// Clicks on all buttons which contain "Load more..." or "Load diff"

const find_buttons =
    (f) => Array.from(document.getElementsByTagName("button")).filter((e) =>
        // HACK: "new" github UI doesn't remove the button once clicked.
        // `.ariaDisabled` is the only way I found to check if the button was already clicked.
        // (otherwise clicking would cause updates, which would cause clicking... -> infinite loop)
        e.ariaDisabled !== "true"
        && f(e.textContent)
    );

async function expandAllLoads(mutations) {
    // If a text or button node was added
    if (!mutations.some((m) => Array.from(m.addedNodes).some((n) => n.nodeName === "#button" || n.nodeName === "#text"))) {
        return
    }

    // Click on all the "Load more…" and its variations buttons
    let loads = find_buttons((text) =>
        text.includes("Load more…")
        || text.includes("Load diff")
        || text.includes("Load all")
        || (text.includes("Load ") && text.includes(" more")) // "Load 150 more"
    );
    loads.forEach((b) => b.click());
}

let observer = new MutationObserver(expandAllLoads);
observer.observe(document.body, { childList: true, subtree: true });
