import { App } from "./App.tsx";
import React from "react";
import { createRoot } from 'react-dom/client';  // No need to import ReactDOM

export default defineContentScript({
  matches: ["https://*.linkedin.com/*"],
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "wxt-react-example",
      position: "inline",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        // Don't mount react app directly on <body>
        const wrapper = document.createElement("div");
        container.append(wrapper);

        const root = createRoot(wrapper);  // Using createRoot from react-dom/client
        root.render(<App />);  
        return { root, wrapper };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
        elements?.wrapper.remove();
      },
    });

    ui.mount();
  }
});


// export const getStyle = () => {
//   const style = document.createElement("style")
//   style.textContent = cssText
//   return style
// }

// const PlasmoOverlay = () => {
//   return (
//       <App />
//   )
// }

// export default PlasmoOverlay