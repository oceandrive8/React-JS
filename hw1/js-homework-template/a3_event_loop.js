function runA3(){
    console.clear();
    console.log("Running A3 — Event Loop (homework)");

    const EXPECTED = [
        "1 sync start",
        "2 sync end",
        "3 microtask: promise.then",
        "4 microtask: queueMicrotask",
        "5 microtask: nested",
        "6 timeout",
    ];

    const seen = [];
    const log = (msg) => { console.log(msg); seen.push(msg); };

    // ─────────────────────────────────────────────────────────────
    log("1 sync start");

    // Macrotask (runs last)
    setTimeout(() => log("6 timeout"), 0);

    // Microtask via Promise.then
    Promise.resolve().then(() => {
        log("3 microtask: promise.then");
        // Inside, enqueue another microtask
        queueMicrotask(() => log("5 microtask: nested"));
    });

    // Microtask directly via queueMicrotask
    queueMicrotask(() => log("4 microtask: queueMicrotask"));

    // End of synchronous section
    log("2 sync end");
    // ─────────────────────────────────────────────────────────────

    // Tiny checker (non-blocking)
    setTimeout(() => {
        const pass = EXPECTED.length === seen.length && EXPECTED.every((v, i) => v === seen[i]);
        console.log("---");
        console.log(pass ? " Order matches EXACTLY" : " Order does not match");
        if (!pass) {
            console.log("Expected:", EXPECTED);
            console.log("Got     :", seen);
        }
    }, 1);
}

window.runA3 = runA3;
