# 🚀 WordPress Theme Inspector for Developers  

A lightweight Chrome extension that helps developers quickly inspect the active WordPress theme, page type, and post information. It simplifies debugging and theme customization, making development faster and more efficient.  

## 🛠 Features  
✔️ Detects the **active theme folder**  
✔️ Identifies if the page is a **single post or a template**  
✔️ Retrieves the **template name** if available  
✔️ Shows the **post name** for single posts  

## 📦 Installation  
1. **Download or clone** this repository.  
2. Open **Chrome** and go to `chrome://extensions/`.  
3. Enable **Developer mode** (top-right corner).  
4. Click **Load unpacked** and select the folder.  
5. The extension is now ready to use!  

## 💻 How It Works  
This extension scans the page for WordPress-specific information and displays:  
- **Theme Folder:** Extracts the active theme name from the `<link>` tag.  
- **Page Type:** Determines if the page is a **single post** or a **custom template**.  
- **Template Name:** If a template is used, its name is displayed.  
- **Post Name:** Shows the post type when viewing a single post.  

## 🔧 Code Overview  
The core logic is inside `content.js`, which listens for messages from the popup and extracts information from the page.  

### Example Output  
