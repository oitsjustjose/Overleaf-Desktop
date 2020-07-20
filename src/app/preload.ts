const bootstrapPDFButton = (ideToolbar: HTMLElement) => {
    const openBtn = document.createElement('a')
    openBtn.addEventListener('click', () => {
        const el: HTMLElement | null = document.querySelector(".toolbar.toolbar-pdf .fa.fa-download")
        el?.click()
    })
    openBtn.style.cursor = 'pointer'

    const openBtnIcn = document.createElement('i')
    openBtnIcn.className = 'fa fa-fw fa-external-link'
    openBtn.append(openBtnIcn)
    ideToolbar.appendChild(openBtn)
}

let loop = setInterval(() => {
    const ideToolbar = document.querySelector('.toolbar.toolbar-editor.ng-scope .toolbar-right') as HTMLElement

    if (ideToolbar) {
        const fullScrnBtn = ideToolbar.querySelector('.fa.fa-expand')?.parentElement
        const splitScrnBtn = ideToolbar.querySelector('.fa.fa-compress')?.parentElement
        const pdfToolbar = document.querySelector('.toolbar.toolbar-pdf')
        const recompToggle = ideToolbar.querySelector('.btn.btn-recompile.dropdown-toggle') as HTMLElement
        const recompGroup = ideToolbar.querySelector('.btn-group.btn-recompile-group') as HTMLElement

        bootstrapPDFButton(ideToolbar)

        const eastPane = document.querySelector('.ui-layout-east.ui-layout-pane.ui-layout-pane-east') as HTMLElement
        if (eastPane && eastPane.style.display == 'none') {
            ideToolbar.appendChild(document.getElementById('recompile')!)
            recompToggle.style.display = 'none'
            recompGroup.style.marginRight = '0px'
        }

        fullScrnBtn?.addEventListener('click', () => {
            ideToolbar.appendChild(document.getElementById('recompile')!)
            recompToggle.style.display = 'none'
            recompGroup.style.marginRight = '0px'
        })

        splitScrnBtn?.addEventListener('click', () => {
            pdfToolbar?.append(document.getElementById('recompile')!)
        })

        let delBtnLoop = setInterval(() => {
            const dlBtn = document.querySelector('.toolbar.toolbar-pdf .fa.fa-download') as HTMLElement
            if (dlBtn) {
                dlBtn.style.display = 'none'
                clearInterval(delBtnLoop)
            }
        }, 200)

        clearInterval(loop)
    }
}, 200)