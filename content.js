chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getInfos") {
    const regex = /\/wp-content\/themes\/([^\/]+)\//;
    const themeLink = document.querySelector('link[href*="' + window.location.host + '/wp-content/themes/"]');
    const messages = [];
    
    if (themeLink) {
      const match = themeLink.href.match(regex);
      if (match && match[1]) {
        messages.push("Theme Folder: " + match[1]);
        
        const bodyClasses = document.body.classList;
        let templateName = '';
        let singleName = '';
  
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
        
        if (bodyClasses.contains('single')) {
          messages.push("Page Type: Single");
          if (singleName) {
            messages.push("Post Name: " + singleName);
          } else {
            messages.push("Post Name: Unknown");
          }
        } else if (templateName) {
          messages.push("Page Type: Template");
          messages.push("Template Name: " + templateName);
        } else {
          messages.push("Page Type: Unknown");
        }
        
      } else {
        messages.push("Theme not found.");
      }
    } else {
      messages.push("Theme not found.");
    }
  
    const response = messages.join('<br><br>');

    sendResponse({ infos: response });
  }
  return true;
});
