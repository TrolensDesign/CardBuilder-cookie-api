# User Error Guide - Cookie Card Builder

## What are Error Codes?

If something goes wrong, you'll see an error message with a code like `[ERR_SAVE_002]` or `[ERR_COPY_004]`.

**These codes help us help you!** When you report a problem, include the error code so we can quickly identify and fix the issue.

## Common Errors & Solutions

### 🔴 **Cannot Save Template**

#### `[ERR_SAVE_002]` - Cannot save empty template
- **Problem:** No elements on canvas
- **Solution:** Add at least one element (text, image, etc.) before saving

#### `[ERR_SAVE_004_QUOTA]` - Storage full
- **Problem:** Browser storage is full
- **Solution:** 
  1. Delete old templates from "My Templates"
  2. Clear browser cache
  3. Free up storage space

#### `[ERR_SAVE_003]` - Preview generation failed
- **Problem:** Preview image couldn't be created
- **Solution:** Template will save without preview - this is OK! You can still use it.

---

### 📋 **Cannot Copy JSON**

#### `[ERR_COPY_002]` - Copy not supported
- **Problem:** Your browser doesn't support clipboard copying
- **Solution:** Use the **Download** button instead

#### `[ERR_COPY_004_PERM]` - Copy permission denied
- **Problem:** Browser blocked clipboard access
- **Solution:**
  1. Check browser permissions (click 🔒 in address bar)
  2. Allow clipboard access for this site
  3. Try again

---

### 💾 **Cannot Download JSON**

#### `[ERR_DOWNLOAD_001]` - No JSON data
- **Problem:** Nothing to download
- **Solution:** Add elements to your card first

#### `[ERR_DOWNLOAD_004]` - Download failed
- **Problem:** Browser couldn't start download
- **Solution:**
  1. Check browser download settings
  2. Try using **Copy** button instead
  3. Check if downloads are blocked

---

### 📂 **Cannot Load Template**

#### `[ERR_LOAD_002]` - Template not found
- **Problem:** Template was deleted or doesn't exist
- **Solution:** Check your "My Templates" list - template may have been removed

#### `[ERR_LOAD_003]` or `[ERR_LOAD_004]` - Template corrupted
- **Problem:** Template data is damaged
- **Solution:**
  1. Delete the corrupted template
  2. Recreate your design
  3. Save as new template

#### `[ERR_LOAD_007]` - Some elements failed to load
- **Problem:** Parts of template are corrupted
- **Solution:** Template loaded partially - check which elements are missing and add them manually

---

## What Should I Do?

### ✅ **Quick Fixes You Can Try:**

1. **Refresh the page** (F5 or Ctrl+R)
2. **Clear browser cache** (Ctrl+Shift+Del)
3. **Try in different browser** (Chrome, Firefox, Edge)
4. **Check browser permissions** (clipboard, storage)
5. **Free up storage space** (delete old templates)

### 📧 **Reporting Errors:**

If error persists, contact us with:
1. **Error code** (e.g., `[ERR_SAVE_004]`)
2. **What you were doing** (e.g., "trying to save template with 5 elements")
3. **Browser name** (Chrome, Firefox, etc.)
4. **Screenshot** (if possible)

**Example report:**
> "I'm getting error `[ERR_SAVE_004_QUOTA]` when trying to save my template. I'm using Chrome and have about 10 templates saved already. The template has 3 text elements and 1 image."

---

## Error Categories

| Code Prefix | Category | What It Means |
|------------|----------|---------------|
| `ERR_SAVE_` | Save Template | Problem saving custom template |
| `ERR_COPY_` | Copy JSON | Problem copying to clipboard |
| `ERR_DOWNLOAD_` | Download JSON | Problem downloading JSON file |
| `ERR_LOAD_` | Load Template | Problem loading saved template |

---

## Prevention Tips

### 🛡️ **Avoid Common Issues:**

1. **Don't save empty templates** - Add elements first
2. **Keep storage clean** - Delete unused templates regularly
3. **Use modern browsers** - Chrome, Firefox, Edge (latest versions)
4. **Enable permissions** - Allow clipboard and storage access
5. **Save important templates** - Download JSON backup of critical templates

---

## Still Need Help?

**No error code shown?**
- Check browser console (F12 → Console tab)
- Look for red error messages
- Take screenshot and send to support

**App not responding?**
- Refresh page (F5)
- Check browser console for errors
- Try different browser

---

*Last updated: Version 1.0*

