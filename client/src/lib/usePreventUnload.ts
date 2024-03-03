import { useEffect } from "react";

function usePreventUnload(preventUnload = true) {
    useEffect(() => {
        console.log(preventUnload)
        // Only run if preventUnload is true
        if (!preventUnload) return

        // Create handler to prevent unload (This shows a confirm dialog)
        const handler = (event: BeforeUnloadEvent) => {
            event.preventDefault()
        }

        // Set handler to run on unload
        window.addEventListener('beforeunload', handler)

        // Remove handler before next effect run
        return () => window.removeEventListener('beforeunload', handler)
    }, [preventUnload]);
}

export { usePreventUnload }