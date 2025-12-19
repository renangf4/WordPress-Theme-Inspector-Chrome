# 🚀 WordPress Theme Inspector for Developers  

A lightweight Chrome extension that helps developers quickly inspect the active WordPress theme, page type, and post information. It simplifies debugging and theme customization, making development faster and more efficient.  

## 🛠 Features  
✔️ Detects the **active theme folder** (even with CDN)  
✔️ Identifies if the page is a **single post, page, home, or archive**  
✔️ Retrieves the **template name** if available  
✔️ Shows the **post name** for single posts  
✔️ Displays **Page ID** when available  
✔️ Handles **multiple themes** and shows the most used one  
✔️ Works with **CDN-hosted assets**  

## 📦 Installation  
1. **Download or clone** this repository.  
2. Open **Chrome** and go to `chrome://extensions/`.  
3. Enable **Developer mode** (top-right corner).  
4. Click **Load unpacked** and select the folder.  
5. The extension is now ready to use!  

## 💻 How It Works  
This extension scans the page for WordPress-specific information and displays:  
- **Theme Folder:** Extracts the active theme name from CSS/JS links (supports CDN).  
- **Page Type:** Determines if the page is a **single post**, **page**, **home**, or **archive**.  
- **Template Name:** If a custom template is used, its name is displayed.  
- **Post Name:** Shows the post type when viewing a single post.  
- **Page ID:** Displays the WordPress page ID when available.  
- **Multiple Themes:** Shows total themes found and lists other themes with file counts.  

## 🔧 Code Overview  
The core logic is inside `content.js`, which listens for messages from the popup and extracts information from the page. The extension now intelligently counts theme files to determine the primary theme, even when multiple themes are present.  

### Example Output  
```
Theme Folder: mziq_orion_transmissao_hibrido
Page Type: Page
Template Name: Default
Page ID: 1431
```

### Example with Multiple Themes  
```
Theme Folder: custom-theme
Total Themes Found: 3
Other Themes: twenty-twentyfour (2 files), plugin-theme (1 file)
Page Type: Single
Post Name: hello-world
```

## 📜 License  
This project is **open-source** and available under the [MIT License](LICENSE).  

---
🚀 **Contributions are welcome!** If you have suggestions or improvements, feel free to submit a pull request.  
---
Chrome Store: https://chromewebstore.google.com/detail/wordpress-theme-inspector/lncfbdbfdkkndcbdmoembpcpadneikon
