import {definePlugin} from 'sanity'

/**
 * Plugin to add RTL support to Sanity Studio
 * This ensures RTL layout works in standalone deployments
 */
export const rtlSupport = definePlugin({
  name: 'rtl-support',
  studio: {
    components: {
      layout: (props) => {
        // Apply RTL on client side
        if (typeof window !== 'undefined') {
          // Set HTML attributes
          document.documentElement.setAttribute('dir', 'rtl')
          document.documentElement.setAttribute('lang', 'ar')
          
          // Inject RTL styles if not already present
          if (!document.getElementById('rtl-studio-styles')) {
            const style = document.createElement('style')
            style.id = 'rtl-studio-styles'
            style.textContent = `
              html {
                direction: rtl !important;
                text-align: right !important;
              }
              body {
                direction: rtl !important;
              }
              [data-ui="Pane"],
              [data-ui="PaneContent"],
              [data-ui="PaneHeader"],
              [data-ui="PaneFooter"],
              [data-ui="Sidebar"],
              [data-ui="Navbar"] {
                direction: rtl !important;
              }
              [dir="ltr"] {
                direction: rtl !important;
              }
              [data-testid="studio-layout"],
              [data-testid="default-layout"] {
                direction: rtl !important;
              }
            `
            document.head.appendChild(style)
          }
        }
        
        return props.renderDefault(props)
      },
    },
  },
})

