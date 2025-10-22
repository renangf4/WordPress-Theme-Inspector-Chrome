chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getInfos") {
    const regex = /\/wp-content\/themes\/([^\/]+)\//;
    const messages = [];
    
    // Procura por qualquer link que contenha wp-content/themes (incluindo CDNs)
    const themeLinks = document.querySelectorAll('link[href*="/wp-content/themes/"], script[src*="/wp-content/themes/"]');
    const themeCounts = {};
    
    // Conta quantos arquivos cada tema tem
    for (let element of themeLinks) {
      const href = element.href || element.src;
      const match = href.match(regex);
      if (match && match[1]) {
        const themeName = match[1];
        themeCounts[themeName] = (themeCounts[themeName] || 0) + 1;
      }
    }
    
    // Encontra o tema com mais arquivos
    let mainTheme = '';
    let maxCount = 0;
    let totalThemes = 0;
    
    for (const [themeName, count] of Object.entries(themeCounts)) {
      totalThemes++;
      if (count > maxCount) {
        maxCount = count;
        mainTheme = themeName;
      }
    }
    
    if (mainTheme) {
      messages.push("Theme Folder: " + mainTheme);
      
      // Mostra informações sobre outros temas se houver
      if (totalThemes > 1) {
        messages.push("Total Themes Found: " + totalThemes);
        const otherThemes = Object.entries(themeCounts)
          .filter(([name]) => name !== mainTheme)
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => `${name} (${count} files)`)
          .join(', ');
        
        if (otherThemes) {
          messages.push("Other Themes: " + otherThemes);
        }
      }
      
      const bodyClasses = document.body.classList;
      let templateName = '';
      let singleName = '';
      let pageType = '';

      bodyClasses.forEach(className => {
        if (className.startsWith('page-template-')) {
          templateName = className.replace('page-template-', '').replace(/-php$/, '').replace('page-templates', '');
          templateName = templateName.replace(/^templates-/, '');
          templateName = templateName.replace(/^-+|-+$/g, '');
        }

        if (className.startsWith('single-')) {
          singleName = className.replace('single-', '');
          singleName = singleName.replace(/-+$/, '');
        }
      });
      
      // Determina o tipo de página
      if (bodyClasses.contains('single')) {
        pageType = "Single";
        messages.push("Page Type: " + pageType);
        if (singleName) {
          messages.push("Post Name: " + singleName);
        } else {
          messages.push("Post Name: Unknown");
        }
      } else if (bodyClasses.contains('page')) {
        pageType = "Page";
        messages.push("Page Type: " + pageType);
        if (templateName) {
          messages.push("Template Name: " + templateName);
        } else {
          messages.push("Template Name: Default");
        }
      } else if (bodyClasses.contains('home')) {
        pageType = "Home";
        messages.push("Page Type: " + pageType);
      } else if (bodyClasses.contains('archive')) {
        pageType = "Archive";
        messages.push("Page Type: " + pageType);
      } else {
        messages.push("Page Type: Unknown");
      }
      
      // Extrai Page ID se existir
      const pageIdMatch = Array.from(bodyClasses).find(cls => cls.startsWith('page-id-'));
      if (pageIdMatch) {
        const pageId = pageIdMatch.replace('page-id-', '');
        messages.push("Page ID: " + pageId);
      }
      
    } else {
      messages.push("Theme not found.");
    }
  
    const response = messages.join('<br><br>');

    sendResponse({ infos: response });
  }
  return true;
});
