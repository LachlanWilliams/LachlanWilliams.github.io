// Component Loader
class ComponentLoader {
    constructor() {
        this.components = {
            'navigation': 'components/navigation.html',
            'hero': 'components/hero.html',
            'about': 'components/about.html',
            'skills': 'components/skills.html',
            'projects': 'components/projects.html',
            'contact': 'components/contact.html',
            'footer': 'components/footer.html'
        };
    }

    async loadComponent(componentName, targetElement) {
        try {
            const response = await fetch(this.components[componentName]);
            if (!response.ok) {
                throw new Error(`Failed to load ${componentName}: ${response.status}`);
            }
            const html = await response.text();
            targetElement.innerHTML = html;
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            targetElement.innerHTML = `<p>Error loading ${componentName} component</p>`;
        }
    }

    async loadAllComponents() {
        const componentElements = document.querySelectorAll('[data-component]');
        
        for (const element of componentElements) {
            const componentName = element.getAttribute('data-component');
            await this.loadComponent(componentName, element);
        }
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    loader.loadAllComponents().then(() => {
        // Re-initialize any scripts that depend on the loaded components
        if (typeof initializeScripts === 'function') {
            initializeScripts();
        }
    });
}); 