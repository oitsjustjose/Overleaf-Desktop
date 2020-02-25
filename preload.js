const bootstrapPDFButton = (ideToolbar) => {
    let openBtn = document.createElement("a");
    openBtn.addEventListener('click', () => {
        if (document.querySelector(".toolbar.toolbar-pdf .fa.fa-download") != null) {
            document.querySelector(".toolbar.toolbar-pdf .fa.fa-download").click();
        }
    });
    openBtn.style.cursor = "pointer";

    let openBtnIcn = document.createElement("i");
    openBtnIcn.className = "fa fa-fw fa-external-link";
    openBtn.appendChild(openBtnIcn);
    ideToolbar.appendChild(openBtn);
};

let intvl = setInterval(() => {
    if (document.querySelector(".toolbar.toolbar-editor.ng-scope .toolbar-right") != null) {
        let fullScrnBtn = document.querySelector(".toolbar.toolbar-editor.ng-scope .toolbar-right .fa.fa-expand").parentElement;
        let splitScrnBtn = document.querySelector(".toolbar.toolbar-editor.ng-scope .toolbar-right .fa.fa-compress").parentElement;

        let ideToolbar = document.querySelector(".toolbar.toolbar-editor.ng-scope .toolbar-right");
        let pdfToolbar = document.querySelector(".toolbar.toolbar-pdf");

        bootstrapPDFButton(ideToolbar);

        // Click twice to not affect the original setting, but propagate changes
        if (document.querySelector(".ui-layout-east.ui-layout-pane.ui-layout-pane-east").style.display == "none") {
            ideToolbar.appendChild(document.getElementById("recompile"));
            document.querySelector(".toolbar.toolbar-editor.ng-scope .toolbar-right .btn.btn-recompile.dropdown-toggle").style.display = "none";
            document.querySelector(".toolbar.toolbar-editor.ng-scope .toolbar-right .btn-group.btn-recompile-group").style.marginRight = "0px";
        }

        // Move the buttons to the ide toolbar
        fullScrnBtn.addEventListener('click', (e) => {
            ideToolbar.appendChild(document.getElementById("recompile"));
            document.querySelector(".toolbar.toolbar-editor.ng-scope .toolbar-right .btn.btn-recompile.dropdown-toggle").style.display = "none";
            document.querySelector(".toolbar.toolbar-editor.ng-scope .toolbar-right .btn-group.btn-recompile-group").style.marginRight = "0px";
        });

        // Move them back to the pdf toolbar
        splitScrnBtn.addEventListener('click', (e) => {
            pdfToolbar.appendChild(document.getElementById("recompile"));
        });

        let dlBtnPatchIntvl = setInterval(() => {
            if (document.querySelector(".toolbar.toolbar-pdf .fa.fa-download") != null) {
                document.querySelector(".toolbar.toolbar-pdf .fa.fa-download").style.display = "none";
                clearInterval(dlBtnPatchIntvl);
            }
        }, 200);

        clearInterval(intvl);
    }
}, 200);
